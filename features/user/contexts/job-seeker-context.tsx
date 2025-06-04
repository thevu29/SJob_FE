'use client';

import {
  useJobSeekerProfile,
  UseJobSeekerProfileResult
} from '@/features/user/hooks/useJobSeekerProfile';
import { useGetCurrentUser } from '@/hooks';
import { createContext, useContext } from 'react';

interface JobSeekerContextType extends UseJobSeekerProfileResult {}

const JobSeekerContext = createContext<JobSeekerContextType | undefined>(
  undefined
);

export function JobSeekerProvider({ children }: { children: React.ReactNode }) {
  const { data: user } = useGetCurrentUser();
  const result = useJobSeekerProfile(user?.data?.id);

  return <JobSeekerContext value={result}>{children}</JobSeekerContext>;
}

export function useJobSeekerContext() {
  const context = useContext(JobSeekerContext);
  if (!context) {
    throw new Error(
      'useJobSeekerContext must be used within a JobSeekerProvider'
    );
  }
  return context;
}
