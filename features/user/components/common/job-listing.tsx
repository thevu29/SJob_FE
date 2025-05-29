import { JobCard } from '@/features/user/components/common/job-card';
import JobCardSkeleton from '@/features/user/components/common/job-card-skeleton';
import Pagination from '@/features/user/components/common/pagination';

import { Job } from '@/interfaces/job';
import React from 'react';

interface JobListingProps {
  jobs: Job[];
  currentPage: number;
  totalPages: number;
}

export default function JobListing({
  jobs,
  currentPage,
  totalPages
}: JobListingProps) {
  return (
    <div className='space-y-4 lg:col-span-3'>
      {jobs && jobs.length > 0 ? (
        jobs.map((job) => <JobCard key={job.id} job={job} />)
      ) : (
        <p className='py-16 text-center text-gray-500'>
          Không có công việc nào được tìm thấy.
        </p>
      )}
      {jobs && jobs.length > 0 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
}
