'use client';
import JobCardSkeleton from '@/features/user/components/common/job-card-skeleton';
import JobListing from '@/features/user/components/common/job-listing';
import { useGetPaginated } from '@/hooks';
import { JobSeeker, Recruiter, User } from '@/interfaces';
import { SavedJob } from '@/interfaces/job';
import { useSearchParams } from 'next/navigation';
import React from 'react';

interface AppliedJobsListingProps {
  user: User | JobSeeker | Recruiter;
}

export default function AppliedJobsListing({ user }: AppliedJobsListingProps) {
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get('page') || '1');
  const pageSize = Number(searchParams.get('limit') || '10');

  const jobSeekerId = user ? user.id : '';
  console.log(jobSeekerId);

  const { data, isLoading } = useGetPaginated<SavedJob>(
    'applications',
    currentPage,
    pageSize,
    ['applications', jobSeekerId],
    {
      params: {
        ...(jobSeekerId && { jobSeekerId })
      }
    }
  );
  return isLoading
    ? Array(3)
        .fill(0)
        .map((_, index) => <JobCardSkeleton key={index} />)
    : data && data.data && (
        <JobListing
          jobs={data.data}
          currentPage={currentPage}
          totalPages={data.meta.totalPages as number}
        />
      );
}
