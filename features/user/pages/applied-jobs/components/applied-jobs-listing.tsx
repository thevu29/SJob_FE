'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';

import { useGetPaginated } from '@/hooks';
import type { Application, JobSeeker, Recruiter, User } from '@/interfaces';
import JobListing from '@/features/user/components/common/job-listing';
import JobCardSkeleton from '@/features/user/components/common/job-card-skeleton';

interface AppliedJobsListingProps {
  user: User | JobSeeker | Recruiter;
}

export default function AppliedJobsListing({ user }: AppliedJobsListingProps) {
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get('page') || '1');
  const pageSize = Number(searchParams.get('limit') || '10');

  const jobSeekerId = user ? user.id : '';

  const { data: applications, isLoading } = useGetPaginated<Application>(
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
    : applications && applications.data && (
        <JobListing
          data={applications.data}
          currentPage={currentPage}
          totalPages={applications.meta.totalPages}
        />
      );
}
