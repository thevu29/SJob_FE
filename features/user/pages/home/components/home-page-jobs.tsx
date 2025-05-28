import { ROUTES } from '@/constants/routes';
import JobListings from '@/features/user/pages/home/components/job-listing';
import JobListingSkeleton from '@/features/user/pages/home/components/job-listing-skeleton';
import { useGetPaginatedPublic } from '@/hooks';
import { Job } from '@/interfaces/job';
import React from 'react';

export default function HomePageJobs() {
  const currentPage = 1;
  const pageSize = 50;

  const { data, isLoading } = useGetPaginatedPublic<Job>(
    'jobs',
    currentPage,
    pageSize,
    ['home-page-jobs']
  );
  if (isLoading) {
    return <JobListingSkeleton />;
  }

  return (
    data &&
    data.data &&
    data.data.length > 0 && (
      <JobListings
        title='Việc làm mới nhất'
        jobs={data.data}
        viewAllLink={ROUTES.JOBSEEKER.JOBS.SEARCH}
      />
    )
  );
}
