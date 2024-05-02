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
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const checkPassword = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

// 유저이름 중복확인하는 함수
const checkUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      // user정보에서 id값만을 받아오기 위한 코드
      id: true,
    },
  });

  // 해당 유저이름을 가진 유저가 존재하는 경우 false, 아닌 경우 true 리턴한다
  return !Boolean(user);
};

// 유저이메일 중복확인하는 함수
const checkUserEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  return !Boolean(user);
};

const formSchema = z
  .object({
    username: z
      .string({
        required_error: USERNAME_REQUIRED_ERROR,
      })
      .trim()
      .max(USERNAME_MAX_LENGTH, USERNAME_MAX_LENGTH_ERROR)
      .regex(USERNAME_REGEX, USERNAME_REGEX_ERROR)
      .refine(checkUsername, '이미 존재하는 이름입니다 😅'),
    email: z
      .string({
        required_error: EMAIL_REQUIRED_ERROR,
      })
      .toLowerCase()
      .email()
      .regex(EMAIL_REGEX, EMAIL_REGEX_ERROR)
      .refine(checkUserEmail, '이미 존재하는 이메일 입니다 😅'),
    password: z
      .string({ required_error: PASSWORD_REQUIRED_ERROR })
      .min(PASSWORD_MIN_LENGTH, PASSWORD_MIN_LENGTH_ERROR)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z.string({
      required_error: PASSWORD_CONFIRM_REQUIRED_ERROR,
    }),
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

    // 사용자 로그인 시켜주는 과정
    const cookie = await getIronSession(cookies(), {
      cookieName: 'cotato-fe-networking',
      password: process.env.COOKIE_PASSWORD!,
    });
    //@ts-ignore
    cookie.id = user.id;
    await cookie.save();

    redirect('/profile');
  }
}