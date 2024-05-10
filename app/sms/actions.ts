'use server';

import crypto from 'crypto';
import { z } from 'zod';
import validator from 'validator';
import { redirect } from 'next/navigation';
import { PHONE_MAX_LENGTH } from '@/lib/constants';
import db from '@/lib/db';
import getSession, { updateSession } from '@/lib/session';

interface IActionState {
  token: boolean;
}

async function getToken() {
  const token = crypto.randomInt(100000, 999999).toString();
  const exists = await db.sMSToken.findUnique({
    where: {
      token,
    },
    select: {
      id: true,
    },
  });
  if (exists) {
    return getToken();
  } else {
    return token;
  }
}

const phoneSchema = z
  .string()
  .trim()
  .max(PHONE_MAX_LENGTH)
  .refine(
    (phone) => validator.isMobilePhone(phone, 'ko-KR'),
    '올바른 형식의 전화번호를 입력해주세요'
  );

async function tokenExists(token: number) {
  const exists = await db.sMSToken.findUnique({
    where: {
      token: token.toString(),
    },
    select: {
      id: true,
    },
  });
  return Boolean(exists);
}
const tokenSchema = z.coerce
  .number()
  .min(100000)
  .max(999999)
  .refine(tokenExists, '유효하지 않은 번호입니다'); // 기본적으로 form에서 받아온 값은 자료형이 string이기 때문에 number로 변환해주는 과정

export async function smsLogin(prevState: IActionState, formData: FormData) {
  const phone = formData.get('phone');
  const token = formData.get('token');

  if (!prevState.token) {
    // 처음 인증번호 요청을 누른 경우
    const result = await phoneSchema.safeParseAsync(phone);
    if (!result.success) {
      return {
        token: false,
        error: result.error.flatten(),
      };
    } else {
      await db.sMSToken.deleteMany({
        where: {
          user: {
            phone: result.data,
          },
        },
      });
      const token = await getToken();
      await db.sMSToken.create({
        data: {
          token,
          user: {
            connectOrCreate: {
              where: {
                phone: result.data,
              },
              create: {
                username: crypto.randomBytes(10).toString('hex'),
                phone: result.data,
              },
            },
          },
        },
      });
      return {
        token: true,
      };
    }
  } else {
    // 인증번호 확인하는 과정
    const result = tokenSchema.safeParse(token);
    if (!result.success) {
      return {
        token: true,
        error: result.error.flatten(),
      };
    } else {
      const token = await db.sMSToken.findUnique({
        where: {
          token: result.data.toString(),
        },
        select: {
          id: true,
          userId: true,
        },
      });
      if (token) {
        updateSession(token.userId);
        await db.sMSToken.delete({
          where: {
            id: token.id,
          },
        });
      }
      redirect('/');
    }
  }
}
