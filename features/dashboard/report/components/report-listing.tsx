'use client';

import { useSearchParams } from 'next/navigation';

import { useGetPaginated } from '@/hooks';
import type { Report } from '@/interfaces';
import { DataTable as ReportTable } from '@/components/ui/table/data-table';

import { columns } from './tables/columns';
import { ReportModal } from './report-modal';

export function ReportListingPage() {
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get('page') || '1');
  const pageSize = Number(searchParams.get('limit') || '10');
  const query = searchParams.get('query') || '';
  const status = searchParams.get('status') || '';

  const { data: reports } = useGetPaginated<Report>(
    'reports',
    currentPage,
    pageSize,
    ['reports', query, status],
    {
      params: {
        ...(query && { query }),
        ...(status && { status })
      }
    }
  );

  return (
    <>
      {reports && reports.data && (
        <ReportTable
          columns={columns}
          data={reports.data}
          totalItems={reports.meta.totalElements ?? 0}
        />
      )}

      <ReportModal />
    </>
  );
}
