'use client';
import Button from '@/components/button';
import Input from '@/components/input';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { getUploadUrl, uploadProduct } from './actions';
import { useFormState } from 'react-dom';

export default function AddProduct() {
  const [thumbNail, setThumbNail] = useState('');
  const [uploadUrl, setUploadUrl] = useState('');
  const [imageId, setImageId] = useState('');
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

    const { success, result } = await getUploadUrl();
    if (success) {
      console.log('result', result);
      const { id, uploadURL } = result;
      await setUploadUrl(uploadURL);
      await setImageId(id);
    }
  };
  const interceptAction = async (_: any, formData: FormData) => {
    // cloudflare에 이미지를 업로드
    console.log('intercept start', formData);
    const file = formData.get('photo');
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
    const photoUrl = `https://imagedelivery.net/JsWAF1DPVngv4_1a1jAgfw/${imageId}`;
    await formData.set('photo', photoUrl);

    console.log('intercept done', formData);

    // uploadProduct함수 호출
    return uploadProduct(_, formData);
  };
  const [state, dispatch] = useFormState(interceptAction, null);

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
