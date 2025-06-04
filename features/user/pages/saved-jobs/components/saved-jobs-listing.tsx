'use client';
import JobCardSkeleton from '@/features/user/components/common/job-card-skeleton';
import JobListing from '@/features/user/components/common/job-listing';
import { useGetPaginated } from '@/hooks';
import { JobSeeker, Recruiter, User } from '@/interfaces';
import { SavedJob } from '@/interfaces/job';
import { useSearchParams } from 'next/navigation';
import React from 'react';

interface SavedJobsListingProps {
  user: User | JobSeeker | Recruiter;
}

export default function SavedJobsListing({ user }: SavedJobsListingProps) {
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get('page') || '1');
  const pageSize = Number(searchParams.get('limit') || '10');

  const jobSeekerId = user ? user.id : '';

  const { data, isLoading } = useGetPaginated<SavedJob>(
    'saved-jobs',
    currentPage,
    pageSize,
    ['saved-jobs', jobSeekerId],
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
