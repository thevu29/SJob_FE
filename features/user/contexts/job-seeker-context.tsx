'use client';

import {
  useJobSeekerProfile,
  UseJobSeekerProfileResult
} from '@/features/user/hooks/useJobSeekerProfile';
import { createContext, useContext } from 'react';

interface JobSeekerContextType extends UseJobSeekerProfileResult {}

const JobSeekerContext = createContext<JobSeekerContextType | undefined>(
  undefined
);

export function JobSeekerProvider({
  jobSeekerId,
  children
}: {
  jobSeekerId: string;
  children: React.ReactNode;
}) {
  const result = useJobSeekerProfile(jobSeekerId);

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
