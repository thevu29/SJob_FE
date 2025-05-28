import { QueryKeys } from '@/constants/enums';
import type { JobSeeker, Recruiter, User } from '@/interfaces';

import { useGet } from './use-queries';

export function useGetCurrentUser() {
  return useGet<User | JobSeeker | Recruiter>('auth/me', [
    QueryKeys.CURRENT_USER
  ]);
}
