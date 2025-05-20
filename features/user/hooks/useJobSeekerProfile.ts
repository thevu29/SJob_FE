import { JobSeeker } from '@/interfaces';
import { Certification } from '@/interfaces/certification';
import { Education } from '@/interfaces/education';
import { Experience } from '@/interfaces/experience';
import { Resume } from '@/interfaces/resume';
import { Skill } from '@/interfaces/skill';
import { get } from '@/lib/api';
import { useQueries, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface JobSeekerProfile {
  jobSeeker?: JobSeeker;
  educations?: Education[];
  skills?: Skill[];
  experiences?: Experience[];
  certifications?: Certification[];
  resumes?: Resume[];
}

export interface UseJobSeekerProfileResult {
  data: JobSeekerProfile;
  isLoading: boolean;
  isError: boolean;
  error: AxiosError | null;
}

export function useJobSeekerProfile(
  jobSeekerId: string
): UseJobSeekerProfileResult {
  // gọi nhiều API song song với useQueries
  const queries = useQueries({
    queries: [
      {
        queryKey: ['job-seekers', jobSeekerId],
        queryFn: () => get<JobSeeker>('job-seekers/' + jobSeekerId),
        staleTime: 5 * 60 * 1000
      },
      {
        queryKey: ['educations/job-seeker', jobSeekerId],
        queryFn: () => get<Education>('educations/job-seeker/' + jobSeekerId),
        staleTime: 5 * 60 * 1000
      },
      {
        queryKey: ['skills/job-seeker', jobSeekerId],
        queryFn: () => get<Skill>('skills/job-seeker/' + jobSeekerId),
        staleTime: 5 * 60 * 1000
      },
      {
        queryKey: ['experiences/job-seeker', jobSeekerId],
        queryFn: () => get<Experience>('experiences/job-seeker/' + jobSeekerId),
        staleTime: 5 * 60 * 1000
      },
      {
        queryKey: ['certifications/job-seeker', jobSeekerId],
        queryFn: () =>
          get<Certification>('certifications/job-seeker/' + jobSeekerId),
        staleTime: 5 * 60 * 1000
      },
      {
        queryKey: ['resumes/job-seeker', jobSeekerId],
        queryFn: () => get<Resume>('resumes/job-seeker/' + jobSeekerId),
        staleTime: 5 * 60 * 1000
      }
    ]
  });

  const isLoading = queries.some((query) => query.isLoading);
  const isError = queries.some((query) => query.isError);
  const error = queries.find((query) => query.error)
    ?.error as AxiosError | null;

  const data: JobSeekerProfile = {
    jobSeeker: queries[0].data?.data as unknown as JobSeeker,
    educations: queries[1].data?.data as unknown as Education[],
    skills: queries[2].data?.data as unknown as Skill[],
    experiences: queries[3].data?.data as unknown as Experience[],
    certifications: queries[4].data?.data as unknown as Certification[],
    resumes: queries[5].data?.data as unknown as Resume[]
  };

  return { data, isLoading, isError, error };
}
