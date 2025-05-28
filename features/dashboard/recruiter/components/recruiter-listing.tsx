'use client';

import { useSearchParams } from 'next/navigation';

import type { Recruiter } from '@/interfaces';
import { useGetPaginated } from '@/hooks/use-queries';
import { DataTable as RecruiterTable } from '@/components/ui/table/data-table';

import { columns } from './tables/columns';

export default function RecruiterListingPage() {
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get('page') || '1');
  const pageSize = Number(searchParams.get('limit') || '10');
  const query = searchParams.get('query') || '';
  const active = searchParams.get('active') || '';
  const sortBy = searchParams.get('sortBy') || 'createdAt';
  const direction = searchParams.get('direction') || 'DESC';

  const { data } = useGetPaginated<Recruiter>(
    'recruiters',
    currentPage,
    pageSize,
    ['recruiters', query, active, sortBy, direction],
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
    data?.data.map((recruiter) => ({
      ...recruiter
      //   gender: formatGender(jobSeeker.gender)
    })) || [];

  return (
    <RecruiterTable
      columns={columns}
      data={formattedData || []}
      totalItems={data?.meta.totalElements || 0}
    />
  );
}
