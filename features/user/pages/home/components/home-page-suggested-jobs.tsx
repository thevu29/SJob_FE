import { ROUTES } from '@/constants/routes';
import JobListings from '@/features/user/pages/home/components/job-listing';
import JobListingSkeleton from '@/features/user/pages/home/components/job-listing-skeleton';
import { useGet, useGetCurrentUser } from '@/hooks';
import { Job } from '@/interfaces/job';
import React from 'react';

export default function HomePageSuggestedJobs() {
  const { data: user } = useGetCurrentUser();
  const jobSeekerId = user?.data?.id;

  const { data, isLoading } = useGet<Job[]>(
    `jobs/suggest-jobs/${jobSeekerId}`,
    ['jobs/suggest-jobs', jobSeekerId ?? ''],
    undefined,
    {
      enabled: !!jobSeekerId
    }
  );

  if (isLoading) {
    return <JobListingSkeleton />;
  }

  return (
    data &&
    data.data &&
    data.data.length > 0 && (
      <JobListings title='Việc làm gợi ý' jobs={data.data} />
    )
  );
}
