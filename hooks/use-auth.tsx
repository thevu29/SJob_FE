import { useRouter } from 'nextjs-toploader/app';
import { useQueryClient } from '@tanstack/react-query';
import { deleteCookie, getCookie, setCookie } from 'cookies-next/client';

import { QueryKeys } from '@/constants/enums';
import { ACCESS_TOKEN_COOKIE_KEY, REFRESH_TOKEN_COOKIE_KEY } from '@/constants';

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

  const logout = () => {
    deleteCookie(ACCESS_TOKEN_COOKIE_KEY);
    deleteCookie(REFRESH_TOKEN_COOKIE_KEY);

    queryClient.removeQueries({ queryKey: [QueryKeys.CURRENT_USER] });
    router.push('/');
  };

  return logout;
}
