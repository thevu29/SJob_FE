import { JobSeeker } from '@/interfaces';
import { Certification } from '@/interfaces/certification';
import { Education } from '@/interfaces/education';
import { Experience } from '@/interfaces/experience';
import { Resume } from '@/interfaces/resume';
import { Skill } from '@/interfaces/skill';
import { get } from '@/lib/api';
import { useQueries } from '@tanstack/react-query';
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
  jobSeekerId?: string
): UseJobSeekerProfileResult {
  // gọi nhiều API song song với useQueries
  const queries = useQueries({
    queries: [
      {
        queryKey: ['job-seekers', jobSeekerId],
        queryFn: () => get<JobSeeker>('job-seekers/' + jobSeekerId),
        enabled: !!jobSeekerId
      },
      {
        queryKey: ['educations/job-seeker', jobSeekerId],
        queryFn: () => get<Education[]>('educations/job-seeker/' + jobSeekerId),
        enabled: !!jobSeekerId
      },
      {
        queryKey: ['skills/job-seeker', jobSeekerId],
        queryFn: () => get<Skill[]>('skills/job-seeker/' + jobSeekerId),
        enabled: !!jobSeekerId
      },
      {
        queryKey: ['experiences/job-seeker', jobSeekerId],
        queryFn: () =>
          get<Experience[]>('experiences/job-seeker/' + jobSeekerId),
        enabled: !!jobSeekerId
      },
      {
        queryKey: ['certifications/job-seeker', jobSeekerId],
        queryFn: () =>
          get<Certification[]>('certifications/job-seeker/' + jobSeekerId),
        enabled: !!jobSeekerId
      },
      {
        queryKey: ['resumes/job-seeker', jobSeekerId],
        queryFn: () => get<Resume[]>('resumes/job-seeker/' + jobSeekerId),
        enabled: !!jobSeekerId
      }
    ]
  });

  const isLoading = queries.some((query) => query.isLoading);
  const isError = queries.some((query) => query.isError);
  const error = queries.find((query) => query.error)
    ?.error as AxiosError | null;

  const data: JobSeekerProfile = {
    jobSeeker: queries[0].data?.data,
    educations: queries[1].data?.data,
    skills: queries[2].data?.data,
    experiences: queries[3].data?.data,
    certifications: queries[4].data?.data,
    resumes: queries[5].data?.data
  };

  return { data, isLoading, isError, error };
}
