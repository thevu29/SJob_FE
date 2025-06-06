'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useGetPaginated } from '@/hooks/use-queries';
import { DataTable as ApplicationTable } from '@/components/ui/table/data-table';
import { columns } from './components/tables/columns';
import { Application } from '@/interfaces/application';

export default function ApplicationListingPage() {
  const searchParams = useSearchParams();
  const params = useParams();

  const jobId = params.jobId as string;

  const currentPage = Number(searchParams.get('page') || '1');
  const pageSize = Number(searchParams.get('limit') || '10');
  const sortBy = searchParams.get('sortBy') || 'date';
  const direction = searchParams.get('direction') || 'DESC';

  const { data } = useGetPaginated<Application>(
    'applications',
    currentPage,
    pageSize,
    ['applications', jobId, sortBy, direction],
    {
      params: {
        ...(jobId && { jobId }),
        ...(sortBy && { sortBy }),
        ...(direction && { direction })
      }
    }
  );

  const formattedData =
    data?.data.map((application) => ({
      ...application
    })) || [];

  return (
    <ApplicationTable
      columns={columns}
      data={formattedData || []}
      totalItems={data?.meta.totalElements || 0}
    />
  );
}
