import db from '@/lib/db';
import getSession from '@/lib/session';
import { formatToTimeAgo } from '@/lib/utils';
import { EyeIcon } from '@heroicons/react/24/solid';
import { unstable_cache as nextCache, revalidateTag } from 'next/cache';
import LikeButton from '@/components/like-button';
import { notFound } from 'next/navigation';
import CommentList from '@/components/comment-list';

async function getPost(id: number) {
  try {
    const post = await db.post.update({
      where: {
        id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
    return post;
  } catch (e) {
    return null;
  }
}

const getCachedPost = nextCache(getPost, ['post-detail'], {
  tags: ['post-detail'],
  revalidate: 60,
});

async function getLikeStatus(postId: number, userId: number) {
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        postId,
        userId: userId,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      postId,
    },
  });
  return {
    likeCount,
    isLiked: Boolean(isLiked),
  };
}

async function getCachedLikeStatus(postId: number) {
  const session = await getSession();
  const userId = session.id;
  const cachedOperation = nextCache(getLikeStatus, ['product-like-status'], {
    tags: [`like-status-${postId}`],
  });
  return cachedOperation(postId, userId!);
}

const getUser = async (userId: number) => {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      username: true,
      avatar: true,
    },
  });
  return user;
};

const getCachedUser = (userId: number) => {
  const cachedOperation = nextCache(getUser, [`user-info-${userId}`], {
    tags: [`user-info-${userId}`],
  });
  return cachedOperation(userId);
};

const getComments = async (postId: number) => {
  const comments = await db.comment.findMany({
    where: {
      postId,
    },
    select: {
      payload: true,
      created_at: true,
      id: true,
      user: {
        select: {
          id: true,
          avatar: true,
          username: true,
        },
      },
    },
    orderBy: {
      created_at: 'desc',
    },
  });
  return comments;
};

const getCachedComments = (postId: number) => {
  const cachedOperation = nextCache(getComments, [`post-comment-${postId}`], {
    tags: [`comments-${postId}`],
  });
  return cachedOperation(postId);
};

export default async function PostDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const post = await getCachedPost(id);
  const session = await getSession();
  if (!post) {
    return notFound();
  }
  const comments = await getCachedComments(id);
  const user = await getCachedUser(session.id!);

  const { likeCount, isLiked } = await getCachedLikeStatus(id);
  return (
    <div className="p-5 text-white">
      <div className="flex items-center gap-2 mb-2">
        <div>
          <span className="text-sm font-semibold">{post.user.username}</span>
          <div className="text-xs">
            <span>{formatToTimeAgo(post.created_at.toString())}</span>
          </div>
        </div>
      </div>
      <h2 className="text-lg font-semibold">{post.title}</h2>
      <p className="mb-5">{post.description}</p>
      <div className="flex flex-col gap-5 items-start mb-10">
        <div className="flex items-center gap-2 text-neutral-400 text-sm">
          <EyeIcon className="size-5" />
          <span>조회 {post.views}</span>
          <LikeButton isLiked={isLiked} likeCount={likeCount} postId={id} />
        </div>
        <CommentList postId={id} commentsData={comments} user={user!} />
      </div>
    </div>
  );
}
