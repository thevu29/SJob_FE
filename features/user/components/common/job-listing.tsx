import { JobCard } from '@/features/user/components/common/job-card';
import Pagination from '@/features/user/components/common/pagination';
import { Application } from '@/interfaces/application';

import { Job, SavedJob } from '@/interfaces/job';
import React from 'react';

interface JobListingProps {
  jobs: Job[] | SavedJob[] | Application[];
  currentPage: number;
  totalPages: number;
}

const isApplication = (
  item: Job | SavedJob | Application
): item is Application => {
  return 'status' in item && 'resumeUrl' in item && 'message' in item;
};

export default function JobListing({
  jobs,
  currentPage,
  totalPages
}: JobListingProps) {
  return (
    <div className='space-y-4 lg:col-span-3'>
      {jobs && jobs.length > 0 ? (
        jobs.map((item) => {
          const job = 'job' in item ? item.job : item;
          const status = isApplication(item) ? item.status : '';
          console.log('status', status);
          console.log('isApplication', isApplication(item));
          return <JobCard key={job.id} job={job} status={status} />;
        })
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
