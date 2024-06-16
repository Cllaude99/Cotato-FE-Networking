'use client';

import { createComment, deleteComment } from '@/app/(tabs)/posts/[id]/actions';
import { formatToTimeAgo } from '@/lib/utils';
import { startTransition, use, useOptimistic } from 'react';
import CommentForm from './comment-form';
import { revalidateTag } from 'next/cache';

interface IComment {
  id: number;
  created_at: Date;
  user: {
    id: number;
    username: string;
    avatar: string | null;
  };
  payload: string;
}

interface ICommentListProps {
  postId: number;
  user: {
    id: number;
    username: string;
    avatar: string | null;
  };
  commentsData: IComment[];
}

const CommentList = ({ commentsData, postId, user }: ICommentListProps) => {
  const [comments, reducerFn] = useOptimistic(
    commentsData,
    (prevComments, payload: string) => {
      const id = (prevComments[0]?.id ?? 0) + 1;
      return [
        {
          id,
          created_at: new Date(),
          user: user!,
          payload,
        },
        ...prevComments,
      ];
    }
  );

  const handleSubmit = async (payload: string) => {
    startTransition(() => {
      reducerFn(payload);
    });
    await createComment(postId, payload, user.id);
  };

  const handleDeleteComment = async (id: number) => {
    await deleteComment(id, postId);
  };

  return (
    <>
      <CommentForm handleSubmit={handleSubmit} />
      <ul className="flex flex-col gap-5 mt-5 w-full">
        {comments.map((comment) => (
          <li key={comment.id} className="flex gap-5 w-full">
            <div className="flex flex-col gap-1 items-start">
              <h3>{comment.user.username}</h3>
            </div>
            <div className="flex flex-col justify-center gap-1 items-start">
              <h2 className="text-lg -mt-[2px]">{comment.payload}</h2>
              <h3 className="text-sm text-neutral-400">
                {formatToTimeAgo(comment.created_at.toString())}
              </h3>
            </div>
            <div>
              {user.id === comment.user.id && (
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  className="bg-red-500 hover:bg-red-400 transition-colors rounded-lg px-2"
                >
                  삭제
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CommentList;
