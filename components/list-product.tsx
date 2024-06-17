import { formatToTimeAgo } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

interface IListProduct {
  title: string;
  created_at: Date;
  photo: string;
  id: number;
}
export default function ListProducts({
  title,
  created_at,
  photo,
  id,
}: IListProduct) {
  return (
    <Link
      href={`/products/${id}`}
      className="flex gap-5 rounded-md transition-all"
    >
      <div className="relative h-36 w-40 rounded-md overflow-hidden">
        <Image
          fill
          src={`${photo}/avatar`}
          alt={title}
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 *:text-white">
        <span className="text-3xl font-semibold mt-3">{title}</span>
        <span className="text-base text-neutral-500">
          {formatToTimeAgo(created_at.toString())}
        </span>
      </div>
    </Link>
  );
}
