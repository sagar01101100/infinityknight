// src/app/products/page.tsx
import prisma from '@/lib/prisma';
import { Product } from '@prisma/client';

export default async function ProductPage() {
  const products: Product[] = await prisma.product.findMany();
  
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.productId}>
            {product.productName} - {product.productType}
          </li>
        ))}
      </ul>
    </div>
  );
}
