'use client';

import { ArrowUpDown } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';

import type { Recruiter } from '@/interfaces';
import { Button } from '@/components/ui/button';
import { formatDate, shortenName } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { CellAction } from './cell-action';

export const columns: ColumnDef<Recruiter>[] = [
  {
    accessorKey: 'image',
    header: '',
    cell: ({ row }) => {
      return (
        <Avatar>
          <AvatarImage src={row.original?.image} alt='User Image' />
          <AvatarFallback>{shortenName(row.original?.name)}</AvatarFallback>
        </Avatar>
      );
    }
  },
  {
    accessorKey: 'name',
    header: 'Tên nhà tuyển dụng'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'website',
    header: 'Website'
  },
  {
    accessorKey: 'members',
    header: 'Số lượng nhân sự'
  },
  {
    accessorKey: 'active',
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
    accessorKey: 'status',
    header: 'Phê duyệt',
    cell: ({ row }) =>
      row.original.status ? (
        <p className='w-fit rounded-md bg-blue-50 px-2 py-1 text-blue-500'>
          Đã phê duyệt
        </p>
      ) : (
        <p className='w-fit rounded-md bg-red-50 px-2 py-1 text-red-500'>
          Chưa phê duyệt
        </p>
      )
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
