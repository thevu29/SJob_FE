'use client';

import CompanyInfo from '@/features/user/pages/job-detail/components/company-info';
import SimilarJobs from '@/features/user/pages/job-detail/components/similar-jobs';
import { useParams } from 'next/navigation';
import { Job } from '@/interfaces/job';
import { useGetPublic } from '@/hooks/use-queries';
import JobInfo from '@/features/user/pages/job-detail/components/job-info';
import { Recruiter } from '@/interfaces';

export default function JobDetailPage() {
  const params = useParams();
  const jobId = params.jobId as string;

  const { data: jobData } = useGetPublic<Job>('jobs/' + jobId, ['jobs', jobId]);
  const job = (jobData?.data as Job) || {};

  const { data: recruiterData } = useGetPublic<Recruiter>(
    'recruiters/' + job?.recruiterId,
    ['recruiters', job?.recruiterId],
    undefined,
    {
      enabled: !!job.recruiterId
    }
  );
  const recruiter = (recruiterData?.data as Recruiter) || {};
  return (
    <div className='bg-background min-h-screen pb-32'>
      <div className='container mx-auto px-4 py-6 md:py-8 lg:max-w-6xl'>
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
          <div className='space-y-6 lg:col-span-2'>
            <JobInfo job={job} />
          </div>
          <div className='lg:col-span-1'>
            <div className='space-y-6'>
              <CompanyInfo recruiter={recruiter} />
              <SimilarJobs />
            </div>
          </div>
        </div>
      </div>

      {/* Sticky footer for job application */}
      {/* <div className='bg-background border-border fixed right-0 bottom-0 left-0 z-10 border-t'>
        <div className='container mx-auto px-4 py-4 lg:max-w-6xl'>
          <JobHeader showActions={true} showTitle={false} />
        </div>
      </div> */}
    </div>
  );
}
