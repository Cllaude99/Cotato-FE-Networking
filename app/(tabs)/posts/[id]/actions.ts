'use server';

import db from '@/lib/db';
import getSession from '@/lib/session';
import { revalidateTag } from 'next/cache';

export async function likePost(postId: number) {
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        postId,
        userId: session.id!,
      },
    });
    revalidateTag(`like-status-${postId}`);
    revalidateTag('posts');
    revalidateTag(`faqs`);
  } catch (e) {}
}

export async function dislikePost(postId: number) {
  try {
    const session = await getSession();
    await db.like.delete({
      where: {
        id: {
          postId,
          userId: session.id!,
        },
      },
    });
    revalidateTag(`like-status-${postId}`);
    revalidateTag('posts');
    revalidateTag(`faqs`);
  } catch (e) {}
}

export const createComment = async (
  postId: number,
  payload: string,
  userId: number
) => {
  await db.comment.create({
    data: {
      payload,
      userId,
      postId,
    },
  });

  revalidateTag(`comments-${postId}`);
  revalidateTag('posts');
  revalidateTag(`faqs`);
};

export const deleteComment = async (commentId: number, postId: number) => {
  await db.comment.delete({
    where: {
      id: commentId,
    },
  });

  revalidateTag(`comments-${postId}`);
  revalidateTag('posts');
  revalidateTag(`faqs`);
};
