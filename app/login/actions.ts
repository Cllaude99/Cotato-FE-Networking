'use server';

import {
  EMAIL_REGEX,
  EMAIL_REGEX_ERROR,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
  PASSWORD_REQUIRED_ERROR,
} from '@/lib/constants';
import db from '@/lib/db';
import { updateSession } from '@/lib/session';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';

import { z } from 'zod';

const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  return Boolean(user);
};
const formSchema = z.object({
  email: z
    .string()
    .toLowerCase()
    .email()
    .regex(EMAIL_REGEX, EMAIL_REGEX_ERROR)
    .refine(checkEmailExists, '해당 이메일을 가진 유저가 존재하지 않습니다 😅'),
  password: z
    .string({
      required_error: PASSWORD_REQUIRED_ERROR,
    })
    .min(PASSWORD_MIN_LENGTH)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export const handleLogin = async (prevState: any, formData: FormData) => {
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    // 입력한 email을 가진 사용자
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });

    // 입력한 비밀번호가 기존 비밀번호와 일치한지에 대한 여부 확인
    const ok = await bcrypt.compare(
      result.data.password,
      user!.password ?? 'xxx'
    );

    // 비밀번호가 일치하는 경우
    if (ok) {
      await updateSession(user!.id);

      redirect('/networking');
    } else {
      // 비밀번호가 일치하지 않는 경우
      return {
        fieldErrors: {
          email: [],
          password: ['잘못된 비밀번호 입니다 😅'],
        },
      };
    }
  }
};
