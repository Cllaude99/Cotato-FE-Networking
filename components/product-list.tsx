'use client';
import { useEffect, useRef, useState } from 'react';
import ListProducts from './list-product';
import getMoreProducts from '@/app/(tabs)/products/actions';

interface IProductList {
  initialProducts: {
    id: number;
    title: string;
    photo: string;
    created_at: Date;
  }[];
}
export default function ProductList({ initialProducts }: IProductList) {
  const [products, setProducts] = useState(initialProducts);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const trigger = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        const element = entries[0];
        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          setIsLoading(true);
          const newProducts = await getMoreProducts(page + 1);
          if (newProducts.length !== 0) {
            setPage((prev) => prev + 1);
            setProducts((prev) => [...prev, ...newProducts]);
          } else {
            setIsLastPage(true);
          }
          setIsLoading(false);
        }
      },
      {
        threshold: 1.0,
      }
    );

    if (trigger.current) {
      observer.observe(trigger.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [page]);

  return (
    <div className="p-5 flex flex-col gap-5">
      {products.map((product) => (
        <ListProducts key={product.id} {...product} />
      ))}
      {!isLastPage && (
        <span
          ref={trigger}
          className="text-sm font-semibold bg-neutral-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
        >
          {isLoading ? '불러오는중...' : '더보기'}
        </span>
      )}
    </div>
  );
}
