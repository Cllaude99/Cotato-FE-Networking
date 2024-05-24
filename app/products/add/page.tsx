'use client';
import Button from '@/components/button';
import Input from '@/components/input';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { uploadProduct } from './actions';
import { useFormState } from 'react-dom';

export default function AddProduct() {
  const [thumbNail, setThumbNail] = useState('');
  const [state, dispatch] = useFormState(uploadProduct, null);
  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) return;
    const file = files[0];
    if (file.size > 1024 * 1024 * 4) {
      alert('이미지의 크기는 4MB를 초과할 수 없습니다!');
    }
    const url = URL.createObjectURL(file);
    setThumbNail(url);
  };

  return (
    <div>
      <form action={dispatch} className="flex flex-col gap-5 p-5">
        <label
          htmlFor="photo"
          className=" max-h-[300px] border-2 cursor-pointer border-neutral-300 rounded-md aspect-square flex items-center justify-center flex-col text-neutral-300 bg-center bg-cover object-cover"
          style={{ backgroundImage: `url(${thumbNail})` }}
        >
          {!thumbNail && (
            <>
              <PhotoIcon className="w-20" />
              <div className="text-neutral-400 text-sm">
                썸네일을 업로드 해주세요
              </div>
            </>
          )}
        </label>
        <input
          type="file"
          id="photo"
          name="photo"
          className="hidden"
          onChange={onImageChange}
          accept="image/*"
        />
        <Input
          name="title"
          required
          placeholder="제목을 적어주세요"
          type="text"
          errors={state?.fieldErrors.title}
        />
        <textarea
          name="description"
          required
          placeholder="설명을 적어주세요"
          className="resize-none overflow-y-auto h-[300px] bg-transparent rounded-md focus:outline-none ring-2 focus:ring-4 ring-neutral-200 focus:ring-blue-400 border-none placeholder:text-neutral-400 transition"
        />
        <Button text="작성완료" />
      </form>
    </div>
  );
}
