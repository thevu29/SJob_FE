'use client';

import { useSearchParams } from 'next/navigation';

import type { User } from '@/interfaces';
import { useGetPaginated } from '@/hooks/use-queries';
import { DataTable as AdminTable } from '@/components/ui/table/data-table';

import { columns } from './tables/columns';

export default function AdminListingPage() {
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get('page') || '1');
  const pageSize = Number(searchParams.get('limit') || '10');
  const query = searchParams.get('query') || '';
  const active = searchParams.get('active') || '';
  const sortBy = searchParams.get('sortBy') || 'createdAt';
  const direction = searchParams.get('direction') || 'DESC';

  const { data } = useGetPaginated<User>(
    'users',
    currentPage,
    pageSize,
    ['admins', query, active, sortBy, direction],
    {
      params: {
        ...(query && { query }),
        ...(active && { active }),
        ...(sortBy && { sortBy }),
        ...(direction && { direction })
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
