'use client';

import { useSearchParams } from 'next/navigation';

import type { User } from '@/types';
import { useGetPaginated } from '@/hooks/useQueries';
import { DataTable as AdminTable } from '@/components/ui/table/data-table';

import { columns } from './tables/columns';

export default function AdminListingPage() {
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get('page') || '1');
  const pageSize = Number(searchParams.get('limit') || '10');
  const search = searchParams.get('q') || '';
  const status = searchParams.get('status') || '';

  const { data } = useGetPaginated<User>(
    'users',
    currentPage,
    pageSize,
    ['admins', search, status],
    {
      params: {
        ...(search && { q: search }),
        ...(status && { status })
      }
    }
  );

  return (
    <AdminTable
      columns={columns}
      data={data?.data || []}
      totalItems={data?.meta.totalElements || 0}
    />
  );
}
