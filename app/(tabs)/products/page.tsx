import ProductList from '@/components/product-list';
import db from '@/lib/db';
import Link from 'next/link';

async function getInitialProducts() {
  const products = await db.product.findMany({
    select: {
      title: true,
      created_at: true,
      photo: true,
      id: true,
    },
    take: 5,
    orderBy: {
      created_at: 'desc',
    },
  });
  return products;
}
export default async function Product() {
  const initialProducts = await getInitialProducts();
  return (
    <div>
      <ProductList initialProducts={initialProducts} />
      <Link
        href="/products/add"
        className="bg-blue-500 font-semibold flex items-center justify-center fixed bottom-4 right-4 sm:right-64 text-white transition-colors hover:bg-blue-400 p-2 rounded-md"
      >
        <span>글 쓰러 가기</span>
      </Link>
    </div>
  );
}
