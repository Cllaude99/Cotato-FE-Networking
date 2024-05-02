'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import SocialLogin from '@/components/social-login';
import { useFormState } from 'react-dom';
import { createAccount } from './actions';
import { PASSWORD_MIN_LENGTH, USERNAME_MAX_LENGTH } from '@/lib/constants';

export default function CreateAccount() {
  const [state, dispatch] = useFormState(createAccount, null);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input
          name="username"
          type="text"
          placeholder="닉네임 (ex. 8기-김태윤)"
          errors={state?.fieldErrors.username}
          maxLength={USERNAME_MAX_LENGTH}
          required
        />
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
          errors={state?.fieldErrors.password}
          minLength={PASSWORD_MIN_LENGTH}
          required
        />
        <Input
          name="confirm_password"
          type="password"
          placeholder="비밀번호 확인을 입력해주세요"
          errors={state?.fieldErrors.confirm_password}
          required
        />
        <Button text="회원가입" />
      </form>
      <SocialLogin />
    </div>
  );
}
