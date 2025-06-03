import { toast } from 'sonner';
import { useRouter } from 'nextjs-toploader/app';
import { useQueryClient } from '@tanstack/react-query';
import { deleteCookie, getCookie, setCookie } from 'cookies-next/client';

import type { IRefreshTokenData } from '@/interfaces';
import { ACCESS_TOKEN_COOKIE_KEY, REFRESH_TOKEN_COOKIE_KEY } from '@/constants';

import { usePost } from './use-queries';
import { useLogoutState } from './use-logout-state';

export function useAuthToken() {
  const setTokens = (accessToken: string, refreshToken: string) => {
    setCookie(ACCESS_TOKEN_COOKIE_KEY, accessToken, {
      sameSite: true,
      secure: process.env.NODE_ENV === 'production'
    });

    setCookie(REFRESH_TOKEN_COOKIE_KEY, refreshToken, {
      sameSite: true,
      secure: process.env.NODE_ENV === 'production'
    });
  };

  const getAccessToken = () => getCookie(ACCESS_TOKEN_COOKIE_KEY);

  const getRefreshToken = () => getCookie(REFRESH_TOKEN_COOKIE_KEY);

  const clearTokens = () => {
    deleteCookie(ACCESS_TOKEN_COOKIE_KEY);
    deleteCookie(REFRESH_TOKEN_COOKIE_KEY);
  };

  return {
    setTokens,
    getAccessToken,
    getRefreshToken,
    clearTokens
  };
}

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setLoggingOut } = useLogoutState();

  const handleLogoutSuccess = () => {
    queryClient.clear();
    deleteCookie(ACCESS_TOKEN_COOKIE_KEY);
    deleteCookie(REFRESH_TOKEN_COOKIE_KEY);
    setLoggingOut(false);
    router.push('/');
  };

  const { mutate, isPending } = usePost<void, IRefreshTokenData>('/auth/logout', {
    onSuccess: handleLogoutSuccess,
    onError: (_error) => {
      handleLogoutSuccess();
      toast.error('Đăng xuất không thành công. Vui lòng thử lại');
    }
  });

  const logout = () => {
    const refreshToken = getCookie(REFRESH_TOKEN_COOKIE_KEY);

    setLoggingOut(true);

    if (refreshToken) {
      deleteCookie(ACCESS_TOKEN_COOKIE_KEY);
      deleteCookie(REFRESH_TOKEN_COOKIE_KEY);
      queryClient.clear();

      mutate({ refreshToken });
    } else {
      handleLogoutSuccess();
    }
  };

  return { logout, isLoading: isPending };
}
