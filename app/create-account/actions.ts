'use server';

import bcrypt from 'bcrypt';
import {
  EMAIL_REGEX,
  EMAIL_REGEX_ERROR,
  EMAIL_REQUIRED_ERROR,
  PASSWORD_CONFIRM_REQUIRED_ERROR,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MIN_LENGTH_ERROR,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
  PASSWORD_REQUIRED_ERROR,
  USERNAME_MAX_LENGTH,
  USERNAME_MAX_LENGTH_ERROR,
  USERNAME_REGEX,
  USERNAME_REGEX_ERROR,
  USERNAME_REQUIRED_ERROR,
} from '@/lib/constants';
import db from '@/lib/db';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { updateSession } from '@/lib/session';

const checkPassword = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const formSchema = z
  .object({
    username: z
      .string({
        required_error: USERNAME_REQUIRED_ERROR,
      })
      .trim()
      .max(USERNAME_MAX_LENGTH, USERNAME_MAX_LENGTH_ERROR)
      .regex(USERNAME_REGEX, USERNAME_REGEX_ERROR),
    email: z
      .string({
        required_error: EMAIL_REQUIRED_ERROR,
      })
      .toLowerCase()
      .email()
      .regex(EMAIL_REGEX, EMAIL_REGEX_ERROR),
    password: z
      .string({ required_error: PASSWORD_REQUIRED_ERROR })
      .min(PASSWORD_MIN_LENGTH, PASSWORD_MIN_LENGTH_ERROR)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z.string({
      required_error: PASSWORD_CONFIRM_REQUIRED_ERROR,
    }),
  })
  .superRefine(async ({ username }, ctx) => {
    // 유저이름 중복확인하는 부분
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: 'custom',
        message: '이미 존재하는 이름입니다 😅',
        path: ['username'],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    // 유저이메일 중복확인하는 부분
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: 'custom',
        message: '이미 존재하는 이메일 입니다 😅',
        path: ['email'],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .refine(checkPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirm_password'],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirm_password: formData.get('confirm_password'),
  };

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    // 비밀번호를 해시하기
    const hashedPassword = await bcrypt.hash(result.data.password, 12);

    // 데이터베이스에 해당 사용자의 정보를 넣어준 후 로그인 화면으로 보내기
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });

    // 사용자 로그인 시켜주는 과정 (세션을 이용)
    await updateSession(user.id);

    redirect('/profile');
  }
}
