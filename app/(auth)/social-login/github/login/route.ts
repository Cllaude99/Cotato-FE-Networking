import { redirect } from 'next/navigation';

export async function GET() {
  const baseURL = 'https://github.com/login/oauth/authorize';
  const params = {
    client_id: process.env.GITHUB_CLIENT_ID!,
    redirect_uri: process.env.GITHUB_REDIRECT_URI!,
    scope: 'read:user, user:email',
  };
  const formattedParams = new URLSearchParams(params).toString();
  const finalUrl = `${baseURL}?${formattedParams}`;

  return redirect(finalUrl);
}
