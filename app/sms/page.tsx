'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import { useFormState } from 'react-dom';
import { smsLogin } from './actions';
import Link from 'next/link';

const initialState = {
  token: false,
  error: undefined,
};

export default function SMSLogin() {
  const [state, dispatch] = useFormState(smsLogin, initialState);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-4xl">
          <Link href={`/`}>Cotato</Link>
        </h1>
        <h2 className="text-xl">문자로 간편하게 로그인하기</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        {!state.token && (
          <Input
            name="phone"
            type="text"
            placeholder="-를 제외한 전화번호를 입력하세요"
            maxLength={11}
            errors={state.error?.formErrors}
            required
          />
        )}
        {state.token && (
          <Input
            name="token"
            type="number"
            placeholder="인증번호를 적어주세요"
            min={100000}
            max={999999}
            errors={state.error?.formErrors}
            required
          />
        )}
        <Button text={!state.token ? '인증번호 요청' : '인증하기'} />
      </form>
    </div>
  );
}
