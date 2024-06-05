import ProductList from '@/components/product-list';
import db from '@/lib/db';
import { unstable_cache as nextCache } from 'next/cache';
import Link from 'next/link';

export const metadata = {
  title: 'Networking',
};

const getCachedProducts = nextCache(getInitialProducts, ['products'], {
  revalidate: 60,
});

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

export const dynamic = 'force-dynamic';

export default async function Products() {
  const initialProducts = await getCachedProducts();
  return (
    <div>
      <ProductList initialProducts={initialProducts} />
      <Link
        href="/products/add"
        className="bg-blue-500 font-semibold flex items-center justify-center fixed bottom-4 right-4 sm:right-64 text-white transition-colors hover:bg-blue-400 p-2 rounded-md px-4"
      >
        <span>글 쓰러 가기</span>
      </Link>
    </div>
  );
}
