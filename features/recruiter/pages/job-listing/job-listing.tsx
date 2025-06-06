'use client';

import { useSearchParams } from 'next/navigation';

import type { Job } from '@/interfaces';
import { useGetCurrentUser, useGetPaginated } from '@/hooks';
import { DataTable as JobTable } from '@/components/ui/table/data-table';

import { columns } from './components/tables/columns';

export default function JobListingPage() {
  const { data: user } = useGetCurrentUser();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get('page') || '1');
  const pageSize = Number(searchParams.get('limit') || '10');
  const query = searchParams.get('query') || '';
  const type = searchParams.get('type') || '';
  const status = searchParams.get('status') || '';
  const sortBy = searchParams.get('sortBy') || 'date';
  const direction = searchParams.get('direction') || 'DESC';
  const recruiterId = user?.data.id;

  const { data: jobs } = useGetPaginated<Job>(
    'jobs',
    currentPage,
    pageSize,
    ['recruiter-jobs', query, type, status, sortBy, direction],
    {
      params: {
        ...(query && { query }),
        ...(recruiterId && { recruiterId }),
        ...(type && { type }),
        ...(status && { status }),
        ...(sortBy && { sortBy }),
        ...(direction && { direction })
      }
    },
    {
      enabled: !!recruiterId
    }
  );

  return (
    jobs &&
    jobs.data && (
      <JobTable
        columns={columns}
        data={jobs.data}
        totalItems={jobs.meta.totalElements || 0}
      />
    )
  );
}
