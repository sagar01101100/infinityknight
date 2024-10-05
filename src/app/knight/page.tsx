// src/app/knights/page.tsx
import prisma from '@/lib/prisma';
import { Knight } from '@prisma/client';

export default async function KnightPage() {
  const knights: Knight[] = await prisma.knight.findMany();
  
  return (
    <div>
      <h1>Admin Knights</h1>
      <ul>
        {knights.map((knight) => (
          <li key={knight.id}>
            {knight.username} - {knight.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
