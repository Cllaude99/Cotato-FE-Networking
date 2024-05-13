'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const pathname = usePathname();
  return (
    <div className="w-full mx-auto max-w-screen-lg grid grid-cols-5 border-neutral-600 border-b px-5 py-3 *:text-white *:text-lg my-3 ">
      <Link href="/products" className="flex flex-col items-center gap-px">
        <span className={pathname === '/products' ? 'text-blue-400' : ''}>
          홈
        </span>
      </Link>
      <Link href="/life" className="flex flex-col items-center gap-px">
        <span className={pathname === '/life' ? 'text-blue-400' : ''}>
          동네생활
        </span>
      </Link>
      <Link href="/chat" className="flex flex-col items-center gap-px">
        <span className={pathname === '/chat' ? 'text-blue-400' : ''}>
          채팅
        </span>
      </Link>
      <Link href="/live" className="flex flex-col items-center gap-px">
        <span className={pathname === '/live' ? 'text-blue-400' : ''}>
          쇼핑
        </span>
      </Link>
      <Link href="/profile" className="flex flex-col items-center gap-px">
        <span className={pathname === '/profile' ? 'text-blue-400' : ''}>
          나의 당근
        </span>
      </Link>
    </div>
  );
}