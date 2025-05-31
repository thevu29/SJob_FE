'use client';

import { toast } from 'sonner';
import { useEffect, useRef } from 'react';
import { useRouter } from 'nextjs-toploader/app';
import { useSearchParams } from 'next/navigation';

import { QueryKeys } from '@/constants/enums';
import { useAuthToken, usePost } from '@/hooks';
import { LoadingPage } from '@/components/common/loading';
import type { IAuthResponse, IGoogleLoginData } from '@/interfaces';

export default function OAuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { getAccessToken, setTokens } = useAuthToken();
  const accessToken = getAccessToken();

  const hasCalled = useRef(false);

  const { mutate: login, isPending } = usePost<IAuthResponse, IGoogleLoginData>(
    '/auth/google/callback',
    {
      onSuccess: (response) => {
        const data = response.data;
        const { access_token, refresh_token } = data;

        setTokens(access_token, refresh_token);

        router.push('/');
        toast.success('Đăng nhập thành công');
      },
      onError: (error) => {
        toast.error(error?.message || 'Có lỗi xảy ra! Vui lòng thử lại!');
      }
    },
    [QueryKeys.CURRENT_USER],
    {
      isPublic: true
    }
  );

  useEffect(() => {
    if (hasCalled.current) return;

    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const storedState = sessionStorage.getItem('oauth_state');

    if (state !== storedState) {
      toast.error('State không hợp lệ');
      return;
    }

    if (!code) {
      toast.error('Không nhận được mã xác thực từ Google');
      return;
    }

    hasCalled.current = true;

    login({ code });
  }, [searchParams, login]);

  useEffect(() => {
    if (accessToken && !isPending) {
      router.push('/');
    }
  }, [accessToken, isPending, router]);

  return <LoadingPage text='Đang xác thực với Google...' />;
}
