'use client';

import { ArrowUpDown } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { formatDate, shortenName } from '@/lib/utils';

import { CellAction } from './cell-action';
import { Job, JobStatus, JobType } from '@/interfaces/job';
import { Invitation, InvitationStatus } from '@/interfaces/invitation';

export const columns: ColumnDef<Invitation>[] = [
  {
    accessorKey: 'jobSeekerName',
    header: 'Ứng viên'
  },
  {
    accessorKey: 'jobName',
    header: 'Chức danh'
  },
  {
    accessorKey: 'status',
    header: 'Tình trạng',
    cell: ({ row }) => {
      const status =
        InvitationStatus[
          row.original.status as unknown as keyof typeof InvitationStatus
        ];
      switch (status) {
        case InvitationStatus.ACCEPTED:
          return (
            <p className='w-fit rounded-md bg-green-50 px-2 py-1 text-green-500'>
              {InvitationStatus.ACCEPTED}
            </p>
          );
        case InvitationStatus.REJECTED:
          return (
            <p className='w-fit rounded-md bg-red-50 px-2 py-1 text-red-500'>
              {InvitationStatus.REJECTED}
            </p>
          );
        case InvitationStatus.PENDING:
          return (
            <p className='w-fit rounded-md bg-yellow-50 px-2 py-1 text-yellow-500'>
              {InvitationStatus.PENDING}
            </p>
          );
        default:
          return null;
      }
    }
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='cursor-pointer'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Ngày tạo
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => formatDate(new Date(row.original.createdAt))
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
