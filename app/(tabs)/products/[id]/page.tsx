import db from '@/lib/db';
import getSession from '@/lib/session';
import { UserIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';

// 입력으로 주어진 id값을 바탕으로 product를 찾아 반환하는 함수
async function getProduct(id: number) {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
  return product;
}

// 글의 주인과 로그인한 사용자와 일치하는 지에 대한 여부 확인용 함수
async function getIsOwner(userId: number) {
  const session = await getSession();
  if (session.id) {
    return session.id === userId;
  }
  return false;
}

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  // id값이 정수인지 확인하는 과정
  if (isNaN(id)) {
    return notFound();
  }
  // id값에 해당하는 product를 얻어오는 과정
  const product = await getProduct(id);
  if (!product) {
    return notFound();
  }
  const isOwner = await getIsOwner(product.userId);

  // 글을 삭제하는 함수
  async function DeleteProduct() {
    'use server';
    await db.product.delete({
      where: {
        id,
      },
    });
    redirect('/products');
  }

  return (
    <div>
      <div className="relative aspect-square w-full h-96 bg-auto bg-center mx-auto object-cover">
        <Image
          fill
          src={product.photo}
          alt={product.title}
          className="rounded-md object-cover"
        />
      </div>
      <div className="p-5 flex items-center gap-3 border-b border-neutral-700">
        <div className="size-10 rounded-full">
          {product.user.avatar !== null ? (
            <Image
              src={product.user.avatar}
              width={40}
              height={40}
              alt={product.user.username}
            />
          ) : (
            <UserIcon className="size-8" />
          )}
        </div>
        <div>
          <h3>{product.user.username}</h3>
        </div>
      </div>
      <div className="p-5">
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        <p>{product.description}</p>
      </div>
      <div className="fixed w-full max-w-screen-lg mx-auto bottom-0  p-2.5 bg-neutral-800 flex justify-end items-center gap-3 rounded-md">
        {isOwner ? (
          <form action={DeleteProduct}>
            <button className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold">
              글 삭제하기
            </button>
          </form>
        ) : (
          <Link
            href={``}
            className="bg-blue-500 px-5 py-2.5 rounded-md text-white font-semibold"
          >
            <span className="font-semibold">질문하기</span>
          </Link>
        )}
      </div>
    </div>
  );
}
