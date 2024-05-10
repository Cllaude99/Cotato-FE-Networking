import db from '@/lib/db';
import { updateSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');

  if (!code) {
    return new Response(null, {
      status: 400,
    });
  }

  const accessTokenParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  }).toString();

  const accessTokenURL = `https://github.com/login/oauth/access_token?${accessTokenParams}`;

  const accessTokenResponse = await fetch(accessTokenURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
  });
  const { error, access_token } = await accessTokenResponse.json();

  if (error) {
    return new Response(null, {
      status: 400,
    });
  }

  const userProfileResponse = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: 'no-cache',
  });
  const userProfileData = await userProfileResponse.json();

  const { id, avatar_url, login } = userProfileData;

  const user = await db.user.findUnique({
    where: {
      github_id: id + '',
    },
    select: {
      id: true,
    },
  });

  if (user) {
    await updateSession(user.id);
    return redirect('/networking');
  }

  const newUser = await db.user.create({
    data: {
      github_id: id + '',
      avatar: avatar_url,
      username: login,
    },
    select: {
      id: true,
    },
  });
  await updateSession(newUser.id);
  return redirect('/networking');
}
