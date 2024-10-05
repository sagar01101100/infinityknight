import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma"; // Use the "@" symbol to refer to the src directory


// POST /api/login
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { emailOrUsername, password } = req.body;

    try {
      // Find user by email or username
      const user = await prisma.user.findFirst({
        where: {
          OR: [
            { email: emailOrUsername },
            { username: emailOrUsername },
          ],
        },
      });

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      // Compare the password with the hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // For simplicity, return a success message. In real-world, generate a token (e.g. JWT)
      return res.status(200).json({ message: "Login successful", user });
    } catch (error) {
      return res.status(500).json({ message: "Login failed", error: "Error......" });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
