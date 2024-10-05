// src/app/api/auth/signup.ts

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { firstName, lastName, username, email, password, confirmPassword, mobileNumber } = req.body;

    // Basic validation
    if (!firstName || !lastName || !username || !email || !password || !mobileNumber) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      // Create user in the database
      const newUser = await prisma.user.create({
        data: {
          id,
          firstName,
          lastName,
          username,
          email,
          password: hashedPassword,
          mobileNumber,
        },
      });

      // Optionally, you can send back the created user details without the password
      return res.status(201).json({ message: 'User created successfully', user: { id: newUser.id, username: newUser.username, email: newUser.email } });
      
    } catch (error) {
      if (error.code === 'P2002') {
        return res.status(409).json({ message: 'Username or email already exists.' });
      }
      console.error(error);
      return res.status(500).json({ message: 'Error creating user.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
