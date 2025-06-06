'use client';

import { useParams } from 'next/navigation';

import { useGetPublic } from '@/hooks';
import type { FieldDetail, Job } from '@/interfaces';
import JobInfo from '@/features/user/pages/job-detail/components/job-info';
import CompanyInfo from '@/features/user/pages/job-detail/components/company-info';
import SimilarJobs from '@/features/user/pages/job-detail/components/similar-jobs';

export default function JobDetailPage() {
  const params = useParams();
  const jobId = params.jobId as string;

  const { data: job } = useGetPublic<Job>('jobs/' + jobId, ['jobs', jobId]);

  const { data: fieldDetails } = useGetPublic<FieldDetail[]>(
    'field-details/jobs/' + jobId,
    ['field-details/jobs/', jobId]
  );

  return (
    <div className='bg-background min-h-screen pb-32'>
      <div className='container mx-auto px-4 py-6 md:py-8 lg:max-w-6xl'>
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
          <div className='space-y-6 lg:col-span-2'>
            {job && job.data && fieldDetails && fieldDetails.data && (
              <JobInfo job={job.data} fieldDetails={fieldDetails.data} />
            )}
          </div>
          <div className='lg:col-span-1'>
            <div className='space-y-6'>
              {job && job.data && <CompanyInfo job={job.data} />}
              {fieldDetails && fieldDetails.data && (
                <SimilarJobs
                  currentJobId={jobId}
                  fieldDetails={fieldDetails.data}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
