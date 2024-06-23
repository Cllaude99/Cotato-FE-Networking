'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { useState, useCallback } from 'react';
import { getUploadUrl, uploadProduct } from './actions';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductFormType, productSchema } from './schema';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import '@/app/markdown.css';

export default function AddProduct() {
  const [thumbNail, setThumbNail] = useState('');
  const [uploadUrl, setUploadUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isWriteClick, setWriteClick] = useState(true);
  const [isPreviewClick, setPreviewClick] = useState(false);
  const [markdownContent, setMarkdownContent] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProductFormType>({
    resolver: zodResolver(productSchema),
  });

  const description = watch('description', '');

  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) return;
    const file = files[0];
    if (file.size > 1024 * 1024 * 2) {
      alert('이미지의 크기는 2MB를 초과할 수 없습니다!');
      return;
    }
    const url = URL.createObjectURL(file);
    setThumbNail(url);
    setFile(file);

    const { success, result } = await getUploadUrl();
    if (success) {
      const { id, uploadURL } = result;
      await setUploadUrl(uploadURL);
      await setValue(
        'photo',
        `https://imagedelivery.net/JsWAF1DPVngv4_1a1jAgfw/${id}`
      );
    }
  };

  const interceptAction = handleSubmit(async (data: ProductFormType) => {
    if (!file) return;
    const cloudflareForm = new FormData();
    cloudflareForm.append('file', file);
    const response = await fetch(uploadUrl, {
      method: 'post',
      body: cloudflareForm,
    });
    if (response.status !== 200) {
      return;
    }

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('photo', data.photo);

    const errors = await uploadProduct(formData);
    if (errors) {
      // setError("")
    }
  });

  const onValid = async () => {
    await interceptAction();
  };

  const handleWriteClick = () => {
    setPreviewClick(false);
    setWriteClick(true);
  };

  const handlePreviewClick = () => {
    setMarkdownContent(description);
    setWriteClick(false);
    setPreviewClick(true);
  };

  const handlePaste = useCallback(
    async (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
      const items = event.clipboardData.items;
      Array.from(items).forEach(async (item) => {
        if (item.kind === 'file') {
          const file = item.getAsFile();
          if (file) {
            if (file.size > 1024 * 1024 * 2) {
              alert('이미지의 크기는 2MB를 초과할 수 없습니다!');
              return;
            }

            const { success, result } = await getUploadUrl();
            if (success) {
              const { id, uploadURL } = result;
              const cloudflareForm = new FormData();
              cloudflareForm.append('file', file);
              const response = await fetch(uploadURL, {
                method: 'POST',
                body: cloudflareForm,
              });
              if (response.status === 200) {
                const url = `https://imagedelivery.net/JsWAF1DPVngv4_1a1jAgfw/${id}/public`;
                setValue('description', description + `\n![image](${url})\n`);
              }
            }
          }
        }
      });
    },
    [description, setValue]
  );

  return (
    <div>
      <form action={onValid} className="flex flex-col gap-5">
        <label
          htmlFor="photo"
          className="h-96 border-2 cursor-pointer border-neutral-300 rounded-md aspect-square flex items-center justify-center flex-col text-neutral-300 bg-center bg-cover object-cover"
          style={{ backgroundImage: `url(${thumbNail})` }}
        >
          {!thumbNail && (
            <>
              <PhotoIcon className="w-20" />
              <div className="text-neutral-400 text-sm">
                썸네일을 업로드 해주세요
                {errors.photo?.message}
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
        <div className="flex items-center gap-2">
          <span
            className={`${
              isWriteClick ? 'bg-blue-400' : ''
            } text-white px-3 rounded-lg ${
              isWriteClick ? 'hover:bg-blue-300' : ''
            } cursor-pointer font-semibold`}
            onClick={handleWriteClick}
          >
            작성
          </span>
          <span
            className={`${
              isPreviewClick ? 'bg-blue-400' : ''
            } text-white px-3 rounded-lg ${
              isPreviewClick ? 'hover:bg-blue-300' : ''
            } cursor-pointer font-semibold`}
            onClick={handlePreviewClick}
          >
            미리보기
          </span>
        </div>
        <Input
          required
          placeholder="제목을 적어주세요"
          type="text"
          errors={[errors.title?.message ?? '']}
          {...register('title')}
        />
        {errors.description?.message}
        {isWriteClick ? (
          <textarea
            {...register('description')}
            required
            placeholder="설명을 적어주세요"
            className="resize-none overflow-y-auto h-[300px] bg-transparent rounded-md focus:outline-none ring-2 focus:ring-4 ring-neutral-200 focus:ring-blue-400 border-none placeholder:text-neutral-400 transition"
            onPaste={handlePaste}
          />
        ) : (
          <div className="prose prose-white">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {markdownContent}
            </ReactMarkdown>
          </div>
        )}
        <Button text="작성완료" />
      </form>
    </div>
  );
}
