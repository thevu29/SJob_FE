import { QueryKeys } from '@/constants/enums';
import type { JobSeeker, Recruiter, User } from '@/interfaces';

import { useGet } from './use-queries';
import { useAuthToken } from './use-auth';

export function useGetCurrentUser() {
  const { getAccessToken } = useAuthToken();
  const accessToken = getAccessToken();

  return useGet<User | JobSeeker | Recruiter>(
    'auth/me',
    [QueryKeys.CURRENT_USER],
    {},
    {
      enabled: !!accessToken,
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 0,
      gcTime: 0,
      placeholderData: accessToken ? undefined : undefined
    }
  );
}
