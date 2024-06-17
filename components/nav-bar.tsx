'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const pathname = usePathname();
  return (
    <div className="w-full mx-auto max-w-screen-lg grid grid-cols-5 border-neutral-600 border-b px-5 py-3 *:text-white *:text-lg my-3 ">
      <Link href="/networking" className="flex flex-col items-center gap-px">
        <span className={pathname === '/networking' ? 'text-blue-400' : ''}>
          과제
        </span>
      </Link>
      <Link href="/questions" className="flex flex-col items-center gap-px">
        <span className={pathname === '/questions' ? 'text-blue-400' : ''}>
          질문방
        </span>
      </Link>
      <Link href="/products" className="flex flex-col items-center gap-px">
        <span className={pathname === '/products' ? 'text-blue-400' : ''}>
          Colog
        </span>
      </Link>
      <Link href="/faq" className="flex flex-col items-center gap-px">
        <span className={pathname === '/faq' ? 'text-blue-400' : ''}>
          과제 FAQ
        </span>
      </Link>
      <Link href="/profile" className="flex flex-col items-center gap-px">
        <span className={pathname === '/profile' ? 'text-blue-400' : ''}>
          프로필
        </span>
      </Link>
    </div>
  );
}
