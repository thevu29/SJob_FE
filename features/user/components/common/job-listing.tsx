import type { Application, Job, SavedJob } from '@/interfaces';
import { JobCard } from '@/features/user/components/common/job-card';
import Pagination from '@/features/user/components/common/pagination';

interface JobListingProps {
  data: Job[] | SavedJob[] | Application[];
  currentPage: number;
  totalPages: number;
}

const isApplication = (
  item: Job | SavedJob | Application
): item is Application => {
  return 'status' in item && 'resumeUrl' in item && 'message' in item;
};

export default function JobListing({
  data,
  currentPage,
  totalPages
}: JobListingProps) {
  return (
    <div className='space-y-4 lg:col-span-3'>
      {data && data.length > 0 ? (
        data.map((item) => {
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
      {data && data.length > 0 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
}
