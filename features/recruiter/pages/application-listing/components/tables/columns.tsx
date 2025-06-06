'use client';

import { ColumnDef } from '@tanstack/react-table';

import { CellAction } from './cell-action';
import {
  Application,
  ApplicationStatus,
  IUpdateApplicationStatusData
} from '@/interfaces/application';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import header from '@/components/dashboard/navigation/header';
import { useState } from 'react';
import { usePut } from '@/hooks';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

export const columns: ColumnDef<Application>[] = [
  {
    accessorKey: 'jobSeeker.name',
    header: 'Ứng viên',
    cell: ({ row }) => (
      <Link
        href={ROUTES.RECRUITER.JOBSEEKER.DETAIL(row.original.jobSeekerId)}
        className='text-blue-500'
        target='_blank'
      >
        {row.original.jobSeeker.name}
      </Link>
    )
  },
  {
    accessorKey: 'jobSeeker.email',
    header: 'Email'
  },
  {
    accessorKey: 'resumeUrl',
    header: 'Hồ sơ đính kèm',
    cell: ({ row }) => (
      <Link
        href={row.original.resumeUrl}
        className='block w-48 truncate'
        target='_blank'
      >
        {row.original.resumeUrl}
      </Link>
    )
  },
  {
    accessorKey: 'status',
    header: 'Tình trạng',
    cell: ({ row }) => {
      const [currentStatus, setCurrentStatus] = useState(
        row.original.status as keyof typeof ApplicationStatus
      );
      const [showConfirmDialog, setShowConfirmDialog] = useState(false);
      const [pendingStatus, setPendingStatus] = useState<string | null>(null);

      const updateApplicationStatusMutation = usePut<
        Application,
        IUpdateApplicationStatusData & { id: string }
      >(
        'applications',
        {
          onSuccess: () => {
            toast.success('Cập nhật trạng thái đơn ứng tuyển thành công');
            // Cập nhật UI sau khi API thành công
            if (pendingStatus) {
              setCurrentStatus(pendingStatus as keyof typeof ApplicationStatus);
            }
          },
          onError: (error: AxiosError) => {
            toast.error(error?.message || 'Có lỗi xảy ra! Vui lòng thử lại!');
          }
        },
        ['applications']
      );

      const handleStatusChange = (newStatus: string) => {
        if (newStatus === 'ACCEPTED' || newStatus === 'REJECTED') {
          setPendingStatus(newStatus);
          setShowConfirmDialog(true);
        }
      };

      const handleConfirm = async () => {
        if (pendingStatus && !updateApplicationStatusMutation.isPending) {
          // console.log('id', row.original.id);
          await updateApplicationStatusMutation.mutateAsync({
            id: row.original.id,
            status: pendingStatus as ApplicationStatus
          });
        }
        setShowConfirmDialog(false);
      };

      const handleCancel = () => {
        setPendingStatus(null);
        setShowConfirmDialog(false);
      };

      const getStatusStyle = (status: ApplicationStatus) => {
        const styles = {
          [ApplicationStatus.ACCEPTED]: 'text-green-500',
          [ApplicationStatus.REJECTED]: 'text-red-500',
          [ApplicationStatus.PENDING]: 'text-yellow-500'
        };
        return styles[status] || '';
      };

      // Hiển thị text cho ACCEPTED hoặc REJECTED
      if (currentStatus === 'ACCEPTED' || currentStatus === 'REJECTED') {
        return (
          <span className={getStatusStyle(ApplicationStatus[currentStatus])}>
            {ApplicationStatus[currentStatus]}
          </span>
        );
      }

      // Hiển thị select cho PENDING
      return (
        <>
          <Select value={currentStatus} onValueChange={handleStatusChange}>
            <SelectTrigger className={`w-[160px]`}>
              <SelectValue placeholder='Chọn trạng thái' />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(ApplicationStatus).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <AlertDialog
            open={showConfirmDialog}
            onOpenChange={setShowConfirmDialog}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Xác nhận thay đổi trạng thái
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Bạn có chắc chắn muốn thay đổi trạng thái này không?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={handleCancel}>
                  Hủy
                </AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirm}>
                  Xác nhận
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      );
    }
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
