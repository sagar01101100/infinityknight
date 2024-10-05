import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs"; // For password hashing

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Parse the JSON body
    const { username, email, password } = body;

    // Check if required fields are provided
    if (!username || !email || !password) {
      return new Response(JSON.stringify({ 
        error: "Username, email, and password are required" 
      }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400, // Bad Request
      });
    }

    // Hash the password for security before storing it
    const hashedPassword = await hash(password, 10); // 10 rounds of hashing (bcrypt)

    // Create a new user in the database
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword, // Store the hashed password
      },
    });

    // Respond with the created user (excluding password for security reasons)
    return new Response(JSON.stringify({ 
      message: "User created successfully", 
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      }
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 201, // 201 Created
    });

  } catch (error: unknown) { // Explicitly typing error as unknown
    console.error("Error creating user:", error);

    // Handle unique constraint errors (for example, duplicate email or username)
    if (error instanceof Error) {
      // If it's an instance of Error, we can access its properties
      if (error.message.includes("Unique constraint failed")) {
        // Additional checks could be done here if needed
        const field = error.message.split(" ")[2]; // Get the field that caused the error
        return new Response(JSON.stringify({ 
          error: `A user with this ${field} already exists` 
        }), {
          headers: { 'Content-Type': 'application/json' },
          status: 409, // Conflict
        });
      }
      
      return new Response(JSON.stringify({ 
        error: "Failed to create user",
        details: error.message
      }), {
        headers: { 'Content-Type': 'application/json' },
        status: 500, // Internal Server Error
      });
    }

    // Fallback for unknown error types
    return new Response(JSON.stringify({ 
      error: "Failed to create user",
      details: "Unknown error"
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500, // Internal Server Error
    });
  }
}
