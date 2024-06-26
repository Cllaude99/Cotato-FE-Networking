import db from '@/lib/db';
import getSession from '@/lib/session';
import { notFound, redirect } from 'next/navigation';

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

export default async function Profile() {
  const user = await getUser();

  const logOut = async () => {
    'use server';
    const session = await getSession();
    await session.destroy();
    redirect('/');
  };

  return (
    <div>
      <h1>{user?.username}님 안녕하세요!</h1>
      <h2>🛠️ 페이지를 준비중입니다...🛠️</h2>
      <form action={logOut}>
        &rarr; <button>Log out</button>
      </form>
    </div>
  );
}
