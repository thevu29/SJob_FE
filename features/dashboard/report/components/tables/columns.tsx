'use client';

import { ColumnDef } from '@tanstack/react-table';

import type { Report } from '@/interfaces';
import { ReportStatus } from '@/constants/enums';

import { ReportTableRowAction } from './cell-action';

export const columns: ColumnDef<Report>[] = [
  {
    accessorKey: 'email',
    header: 'Tài khoản bị báo cáo',
    cell: ({ row }) => {
      const { jobSeekerEmail, recruiterEmail } = row.original;
      return (
        <div className='flex items-center gap-2'>
          <span>{jobSeekerEmail || recruiterEmail}</span>
        </div>
      );
    }
  },
  {
    accessorKey: 'message',
    header: 'Lời nhắn'
  },
  {
    accessorKey: 'reason',
    header: 'Lý do'
  },
  {
    accessorKey: 'evidence',
    header: 'Ảnh minh chứng',
    cell: ({ row }) => {
      const { evidence } = row.original;
      return (
        <div className='flex items-center gap-2'>
          {evidence ? (
            <a
              href={evidence}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-500 hover:underline'
            >
              Xem ảnh
            </a>
          ) : (
            <span>Không có ảnh</span>
          )}
        </div>
      );
    }
  },
  {
    accessorKey: 'status',
    header: 'Tình trạng',
    cell: ({ row }) =>
      row.original.status === ReportStatus.PENDING ? (
        <span className='rounded-md bg-yellow-50 px-2 py-1 text-yellow-500'>
          {ReportStatus.PENDING}
        </span>
      ) : row.original.status === ReportStatus.IN_PROGRESS ? (
        <span className='rounded-md bg-blue-50 px-2 py-1 text-blue-500'>
          {ReportStatus.IN_PROGRESS}
        </span>
      ) : row.original.status === ReportStatus.RESOLVED ? (
        <span className='rounded-md bg-green-50 px-2 py-1 text-green-500'>
          {ReportStatus.RESOLVED}
        </span>
      ) : (
        <span className='rounded-md bg-red-50 px-2 py-1 text-red-500'>
          {ReportStatus.REJECTED}
        </span>
      )
  },
  {
    accessorKey: 'date',
    header: 'Ngày báo cáo',
    cell: ({ row }) => {
      const date = new Date(row.original.date);
      return (
        <span>
          {date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          })}
        </span>
      );
    }
  },
  {
    accessorKey: 'actions',
    header: '',
    cell: ReportTableRowAction
  }
];
