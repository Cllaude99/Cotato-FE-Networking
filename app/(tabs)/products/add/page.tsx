'use client';
import Button from '@/components/button';
import Input from '@/components/input';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { getUploadUrl, uploadProduct } from './actions';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductFormType, productSchema } from './schema';

export default function AddProduct() {
  const [thumbNail, setThumbNail] = useState('');
  const [uploadUrl, setUploadUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProductFormType>({
    resolver: zodResolver(productSchema),
  });

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
    // cloudflare에 이미지를 업로드
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

    // formData의 photo를 교체
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('photo', data.photo);

    // uploadProduct함수 호출
    const errors = await uploadProduct(formData);
    if (errors) {
      // setError("")
    }
  });

  const onValid = async () => {
    await interceptAction();
  };

  return (
    <div>
      <form action={onValid} className="flex flex-col gap-5">
        <label
          htmlFor="photo"
          className=" h-96 border-2 cursor-pointer border-neutral-300 rounded-md aspect-square flex items-center justify-center flex-col text-neutral-300 bg-center bg-cover object-cover"
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
        <Input
          required
          placeholder="제목을 적어주세요"
          type="text"
          errors={[errors.title?.message ?? '']}
          {...register('title')}
        />
        {errors.description?.message}
        <textarea
          {...register('description')}
          required
          placeholder="설명을 적어주세요"
          className="resize-none overflow-y-auto h-[300px] bg-transparent rounded-md focus:outline-none ring-2 focus:ring-4 ring-neutral-200 focus:ring-blue-400 border-none placeholder:text-neutral-400 transition"
        />
        <Button text="작성완료" />
      </form>
    </div>
  );
}
