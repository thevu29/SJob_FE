'use client';
import { useSearchParams } from 'next/navigation';
import { useGetPaginated } from '@/hooks/use-queries';
import { Invitation } from '@/interfaces/invitation';
import { columns } from '@/features/recruiter/pages/invitation-listing/components/tables/columns';
import { DataTable as InvitationTable } from '@/components/ui/table/data-table';
import { useGetCurrentUser } from '@/hooks';

export default function InvitationListingPage() {
  const { data: user } = useGetCurrentUser();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get('page') || '1');
  const pageSize = Number(searchParams.get('limit') || '10');
  const query = searchParams.get('query') || '';
  const status = searchParams.get('status') || '';
  const sortBy = searchParams.get('sortBy') || 'date';
  const direction = searchParams.get('direction') || 'DESC';
  const recruiterId = user?.data?.id ?? '';

  const { data } = useGetPaginated<Invitation>(
    'invitations',
    currentPage,
    pageSize,
    ['invitations', query, recruiterId, status, sortBy, direction],
    {
      params: {
        ...(query && { query }),
        ...(recruiterId && { recruiterId }),
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
    <InvitationTable
      columns={columns}
      data={formattedData || []}
      totalItems={data?.meta.totalElements || 0}
    />
  );
}
