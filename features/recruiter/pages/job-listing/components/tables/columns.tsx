'use client';

import { ArrowUpDown } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  formatDate,
  formatExperience,
  formatSalary,
  shortenName
} from '@/lib/utils';

import { CellAction } from './cell-action';
import { Job, JobStatus, JobType } from '@/interfaces/job';

export const columns: ColumnDef<Job>[] = [
  {
    accessorKey: 'name',
    header: 'Chức danh'
  },
  {
    accessorKey: 'salary',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='cursor-pointer'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Mức lương
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    // header: 'Mức lương'
    cell: ({ row }) => formatSalary(row.original.salary)
  },
  {
    accessorKey: 'deadline',
    // header: 'Hạn nộp hồ sơ'
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='cursor-pointer'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Hạn nộp hồ sơ
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    }
  },
  {
    accessorKey: 'slots',
    header: 'Số lượng'
  },
  {
    accessorKey: 'type',
    header: 'Loại hình',
    cell: ({ row }) => JobType[row.original.type as keyof typeof JobType]
  },
  {
    accessorKey: 'education',
    header: 'Trình độ học vấn'
  },
  {
    accessorKey: 'experience',
    header: 'Kinh nghiệm',
    cell: ({ row }) => formatExperience(row.original.experience)
  },
  {
    accessorKey: 'status',
    header: 'Tình trạng',
    cell: ({ row }) => {
      const status =
        JobStatus[row.original.status as unknown as keyof typeof JobStatus];
      switch (status) {
        case JobStatus.OPEN:
          return (
            <p className='w-fit rounded-md bg-green-50 px-2 py-1 text-green-500'>
              {JobStatus.OPEN}
            </p>
          );
        case JobStatus.CLOSED:
          return (
            <p className='w-fit rounded-md bg-red-50 px-2 py-1 text-red-500'>
              {JobStatus.CLOSED}
            </p>
          );
        case JobStatus.EXPIRED:
          return (
            <p className='w-fit rounded-md bg-yellow-50 px-2 py-1 text-yellow-500'>
              {JobStatus.EXPIRED}
            </p>
          );
        default:
          return null;
      }
    }
  },
  {
    accessorKey: 'date',
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
    cell: ({ row }) => formatDate(new Date(row.original.date))
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
