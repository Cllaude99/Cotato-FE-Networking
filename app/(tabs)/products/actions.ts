'use server';
import db from '@/lib/db';

export default async function getMoreProducts(page: number) {
  const products = await db.product.findMany({
    select: {
      title: true,
      created_at: true,
      photo: true,
      id: true,
    },
    skip: page * 5,
    take: 5,
    orderBy: {
      created_at: 'desc',
    },
  });
  return products;
}
