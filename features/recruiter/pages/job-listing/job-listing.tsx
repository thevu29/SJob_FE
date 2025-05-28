'use client';

import { useSearchParams } from 'next/navigation';

import { Job } from '@/interfaces/job';
import { useGetPaginated } from '@/hooks/use-queries';
import { DataTable as JobTable } from '@/components/ui/table/data-table';

import { columns } from './components/tables/columns';

export default function JobListingPage() {
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get('page') || '1');
  const pageSize = Number(searchParams.get('limit') || '10');
  const query = searchParams.get('query') || '';
  const type = searchParams.get('type') || '';
  const status = searchParams.get('status') || '';
  const sortBy = searchParams.get('sortBy') || 'date';
  const direction = searchParams.get('direction') || 'DESC';
  const recruiterId = searchParams.get('recruiterId') || '';

  const { data } = useGetPaginated<Job>(
    'jobs',
    currentPage,
    pageSize,
    ['jobs', query, recruiterId, type, status, sortBy, direction],
    {
      params: {
        ...(query && { query }),
        ...(recruiterId && { recruiterId }),
        ...(type && { type }),
        ...(status && { status }),
        ...(sortBy && { sortBy }),
        ...(direction && { direction })
      }
    }
  );

  const formattedData =
    data?.data.map((job) => ({
      ...job
    })) || [];

  return (
    <JobTable
      columns={columns}
      data={formattedData || []}
      totalItems={data?.meta.totalElements || 0}
    />
  );
}
