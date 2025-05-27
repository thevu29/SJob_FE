import { JobCard } from '@/features/user/components/common/job-card';
import JobCardSkeleton from '@/features/user/components/common/job-card-skeleton';
import Pagination from '@/features/user/components/common/pagination';
import { useGet, useGetPaginated } from '@/hooks/useQueries';
import { Recruiter } from '@/interfaces';
import { Job } from '@/interfaces/job';
import { useParams, useSearchParams } from 'next/navigation';
import React from 'react';

export default function JobListing() {
  const searchParams = useSearchParams();
  const params = useParams();

  const query = searchParams.get('query') || '';
  const currentPage = Number(searchParams.get('page') || '1');
  const pageSize = Number(searchParams.get('limit') || '10');

  const recruiterId = params.recruiterId as string;

  const { data: JobsData, isLoading: isJobsLoading } = useGetPaginated<Job>(
    'jobs',
    currentPage,
    pageSize,
    ['jobs', query, recruiterId],
    {
      params: {
        ...(query && { query }),
        ...(recruiterId && { recruiterId })
      }
    }
  );
  const { data: RecruiterData, isLoading: isRecruiterLoading } =
    useGet<Recruiter>(`recruiters/${recruiterId}`, [
      `recruiters/${recruiterId}`
    ]);
  const jobs = (JobsData?.data as Job[]) ?? [];
  const recruiter = (RecruiterData?.data as Recruiter) ?? {};

  const isLoading = isJobsLoading || isRecruiterLoading;
  if (isLoading) {
    return Array(3)
      .fill(0)
      .map((_, index) => <JobCardSkeleton key={index} />);
  }
  return (
    <div className='space-y-4 lg:col-span-3'>
      {jobs?.length === 0 ? (
        <p className='py-16 text-center text-gray-500'>
          Không có công việc nào được tìm thấy.
        </p>
      ) : (
        jobs.map((job) => (
          <JobCard key={job.id} job={job} recruiter={recruiter} />
        ))
      )}
      {jobs?.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={JobsData?.meta?.totalPages as number}
        />
      )}
    </div>
  );
}
