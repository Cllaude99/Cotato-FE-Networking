'use client';

import { FormEvent, useRef } from 'react';

interface ICommentFormProps {
  handleSubmit: (payload: string) => void;
}

const CommentForm = ({ handleSubmit }: ICommentFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = formData.get('payload') as string;
    if (payload === '') return;
    await handleSubmit(payload);

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex gap-3">
      <input
        ref={inputRef}
        name="payload"
        placeholder="댓글을 입력해주세요."
        autoComplete="off"
        className="text-white placeholder:text-white bg-neutral-600 outline-none border-none rounded-md w-72 ring-blue-400 ring-0 focus:ring-4"
      />
      <button className="py-2 px-3 bg-blue-500 rounded-md cursor-pointer">
        작성하기
      </button>
    </form>
  );
};

export default CommentForm;
