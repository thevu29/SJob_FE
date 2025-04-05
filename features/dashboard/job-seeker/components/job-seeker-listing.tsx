'use client';

import { useSearchParams } from 'next/navigation';

import { formatGender } from '@/lib/utils';
import type { JobSeeker } from '@/interfaces';
import { useGetPaginated } from '@/hooks/useQueries';
import { DataTable as JobSeekerTable } from '@/components/ui/table/data-table';

import { columns } from './tables/columns';

export default function JobSeekerListingPage() {
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get('page') || '1');
  const pageSize = Number(searchParams.get('limit') || '10');
  const query = searchParams.get('query') || '';
  const active = searchParams.get('active') || '';
  const sortBy = searchParams.get('sortBy') || 'createdAt';
  const direction = searchParams.get('direction') || 'DESC';

  const { data } = useGetPaginated<JobSeeker>(
    'job-seekers',
    currentPage,
    pageSize,
    ['job-seekers', query, active, sortBy, direction],
    {
      params: {
        ...(query && { query }),
        ...(active && { active }),
        ...(sortBy && { sortBy }),
        ...(direction && { direction })
      }
    }
  );

  const formattedData =
    data?.data.map((jobSeeker) => ({
      ...jobSeeker,
      gender: formatGender(jobSeeker.gender)
    })) || [];

  return (
    <JobSeekerTable
      columns={columns}
      data={formattedData || []}
      totalItems={data?.meta.totalElements || 0}
    />
  );
}
