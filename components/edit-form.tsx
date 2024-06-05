'use client';
import {
  deletePhoto,
  editProduct,
} from '@/app/(tabs)/products/[id]/edit/actions';
import { getUploadUrl } from '@/app/(tabs)/products/add/actions';
import {
  ProductFormType,
  productSchema,
} from '@/app/(tabs)/products/add/schema';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from './input';
import Button from './button';

export default function EditForm({
  id,
  product,
  isOwner,
}: {
  id: number;
  product: ProductFormType;
  isOwner: boolean;
}) {
  const [preview, setPreview] = useState(`${product.photo}/public`);
  const [uploadUrl, setUploadUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<ProductFormType>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = handleSubmit(async (data: ProductFormType) => {
    if (!file && !preview) return;
    if (file) {
      const photoId = product.photo.split(
        `https://imagedelivery.net/JsWAF1DPVngv4_1a1jAgfw/`
      )[1];
      await deletePhoto(photoId);
      const cloudflareForm = new FormData();
      cloudflareForm.append('file', file);
      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: cloudflareForm,
      });
      if (response.status !== 200) {
        return alert('이미지 업로드에 실패했습니다.');
      }
    }
    const formData = new FormData();
    formData.append('id', id + '');
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('photo', data.photo);
    const errors = await editProduct(formData);
    if (errors) {
      if (errors.fieldErrors.photo) {
        setError('photo', { message: errors.fieldErrors.photo[0] });
      }
      if (errors.fieldErrors.title) {
        setError('title', { message: errors.fieldErrors.title[0] });
      }
      if (errors.fieldErrors.description) {
        setError('description', { message: errors.fieldErrors.description[0] });
      }
    }
  });

  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) return;
    if (files.length !== 1) return alert('파일은 한개만 업로드해야 합니다!');
    if (files[0].size > 2 * 1024 * 1024)
      return alert('파일은 최대 2MB 입니다!');
    const file = files[0];
    const url = URL.createObjectURL(file);
    setPreview(url);
    setFile(file);
    const { success, result } = await getUploadUrl();
    if (success) {
      const { id, uploadURL } = result;
      setUploadUrl(uploadURL);
      setValue(
        'photo',
        `https://imagedelivery.net/JsWAF1DPVngv4_1a1jAgfw/${id}`
      );
    }
  };

  const onValid = async () => {
    await onSubmit();
  };

  useEffect(() => {
    const photoId = product.photo.split(
      `https://imagedelivery.net/JsWAF1DPVngv4_1a1jAgfw/`
    )[1];
    setValue(
      'photo',
      `https://imagedelivery.net/JsWAF1DPVngv4_1a1jAgfw/${photoId}`
    );
  }, [product, setValue]);

  return (
    <form action={onValid} className="flex flex-col gap-5">
      <label
        htmlFor="photo"
        className=" h-96 border-2 cursor-pointer border-neutral-300 rounded-md aspect-square flex items-center justify-center flex-col text-neutral-300 bg-center bg-cover object-cover"
        style={{ backgroundImage: `url(${preview})` }}
      >
        {!preview && (
          <>
            <PhotoIcon className="w-20" />
            <div className="text-neutral-400 text-sm">
              썸네일을 업로드 해주세요
              {errors.photo?.message}
            </div>
          </>
        )}
      </label>
      {
        <span className="text-red-500 font-medium">
          {errors.photo?.message}
        </span>
      }
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
        defaultValue={product.title}
      />
      {errors.description?.message}
      <textarea
        {...register('description')}
        defaultValue={product.description}
        required
        placeholder="설명을 적어주세요"
        className="resize-none overflow-y-auto h-[300px] bg-transparent rounded-md focus:outline-none ring-2 focus:ring-4 ring-neutral-200 focus:ring-blue-400 border-none placeholder:text-neutral-400 transition"
      />
      <Button text="수정완료" />
    </form>
  );
}
