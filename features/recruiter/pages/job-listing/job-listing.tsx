'use client';
import { useSearchParams } from 'next/navigation';
import { useGetPaginated } from '@/hooks/useQueries';
import { Job } from '@/interfaces/job';
import { DataTable as JobTable } from '@/components/ui/table/data-table';
import { columns } from './components/tables/columns';
export default function JobListingPage() {
  const id = '68144e36647b71355acf11d1';
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
  console.log('formattedData', formattedData);

  return (
    <JobTable
      columns={columns}
      data={formattedData || []}
      totalItems={data?.meta.totalElements || 0}
    />
  );
}
