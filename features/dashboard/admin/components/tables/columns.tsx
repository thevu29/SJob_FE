'use client';

import { ColumnDef } from '@tanstack/react-table';

import type { User } from '@/types';
import { formatDate } from '@/lib/utils';

import { CellAction } from './cell-action';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'status',
    header: 'Tình trạng',
    cell: ({ row }) =>
      row.original.active ? (
        <p className='w-fit rounded-md bg-blue-50 px-2 py-1 text-blue-500'>
          Active
        </p>
      ) : (
        <p className='w-fit rounded-md bg-red-50 px-2 py-1 text-red-500'>
          Blocked
        </p>
      )
  },
  {
    accessorKey: 'createdAt',
    header: 'Ngày tạo',
    cell: ({ row }) => formatDate(new Date(row.original.createdAt))
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
