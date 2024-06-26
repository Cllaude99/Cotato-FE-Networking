import db from '@/lib/db';
import { formatToTimeAgo } from '@/lib/utils';
import {
  ChatBubbleBottomCenterIcon,
  HandThumbUpIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { unstable_cache as nextCache, revalidateTag } from 'next/cache';
import { notFound } from 'next/navigation';

async function getPosts() {
  try {
    const posts = await db.post.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        views: true,
        created_at: true,
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
      orderBy: {
        created_at: 'asc',
      },
    });
    return posts;
  } catch (e) {
    return null;
  }
}

const getCachedPosts = nextCache(getPosts, ['faqs'], {
  tags: ['faqs'],
  revalidate: 60,
});

export default async function Faq() {
  const posts = await getCachedPosts();

  if (!posts) {
    return notFound();
  }

  return (
    <div className="p-5 flex flex-col">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/posts/${post.id}`}
          className="pb-5 mb-5 border-b border-neutral-500 text-neutral-400 flex flex-col last:pb-0 last:border-b-0 gap-2"
        >
          <h2 className="text-white text-lg font-semibold">{post.title}</h2>
          <p>{post.description}</p>
          <div className="flex items-center justify-between text-sm">
            <div className="flex gap-4 items-center">
              <span>{formatToTimeAgo(post.created_at.toString())}</span>
              <span>.</span>
              <span>조회 {post.views}</span>
            </div>
            <div className="flex gap-4 items-center *:flex *:gap-1 *:items-center">
              <span>
                <HandThumbUpIcon className="size-4" />
                {post._count.likes}
              </span>
              <span>
                <ChatBubbleBottomCenterIcon className="size-4" />
                {post._count.comments}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
