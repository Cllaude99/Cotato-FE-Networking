'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import SocialLogin from '@/components/social-login';
import { useFormState } from 'react-dom';
import { handleLogin } from './actions';
import { PASSWORD_MIN_LENGTH } from '@/lib/constants';
import Link from 'next/link';

export default function Login() {
  const [state, formAction] = useFormState(handleLogin, null);

  return (
    <div className="flex flex-col justify-center min-h-screen md:w-4/5 md:mx-auto">
      <div className="flex flex-col gap-10 py-8 px-9 -mt-36">
        <div className="flex flex-col gap-2 *:font-medium">
          <h1 className="text-6xl">
            <Link href={`/`}>Cotato</Link>
          </h1>
          <h2 className="text-xl">FE 네트워킹 참여를 위해 로그인 해주세요!</h2>
        </div>
        <form action={formAction} className="flex flex-col gap-3">
          <Input
            name="email"
            type="email"
            placeholder="이메일을 입력해주세요"
            errors={state?.fieldErrors.email}
            required
          />
          <Input
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            minLength={PASSWORD_MIN_LENGTH}
            errors={state?.fieldErrors.password}
            required
          />
          <Button text="로그인" />
        </form>
      </div>
    </div>
  );
}
