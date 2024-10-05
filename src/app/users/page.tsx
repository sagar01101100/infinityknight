// src/app/users/page.tsx
import prisma from '@/lib/prisma';
import { User } from '@prisma/client';

export default async function UserPage() {
  const users: User[] = await prisma.user.findMany();
  
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
