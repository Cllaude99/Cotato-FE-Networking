'use server';

import db from '@/lib/db';
import getSession from '@/lib/session';
import { revalidateTag } from 'next/cache';

export async function likePost(postId: number) {
  await new Promise((r) => setTimeout(r, 10000));
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
  } catch (e) {}
}

export async function dislikePost(postId: number) {
  await new Promise((r) => setTimeout(r, 10000));
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
};

export const deleteComment = async (commentId: number, postId: number) => {
  await db.comment.delete({
    where: {
      id: commentId,
    },
  });

  revalidateTag(`comments-${postId}`);
  revalidateTag('posts');
};
