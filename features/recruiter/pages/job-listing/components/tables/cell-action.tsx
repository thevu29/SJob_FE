'use client';

import { toast } from 'sonner';
import { useState } from 'react';
import { AxiosError } from 'axios';
import {
  Eye,
  FileText,
  MoreHorizontal,
  Pencil,
  Sparkles,
  Trash
} from 'lucide-react';

import { useDelete } from '@/hooks/use-queries';
import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Job, JobStatus } from '@/interfaces/job';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { JobDetail } from '@/features/recruiter/pages/job-listing/components/job-detail';

interface CellActionProps {
  data: Job;
}

type ActionMode = 'delete' | null;

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [actionMode, setActionMode] = useState<ActionMode>(null);
  const [showDetail, setShowDetail] = useState(false);

  const deleteMutation = useDelete(
    'jobs',
    {
      onSuccess: () => {
        toast.success('Xóa job thành công');
      },
      onError: (error: AxiosError) => {
        toast.error(error?.message || 'Có lỗi xảy ra! Vui lòng thử lại!');
      }
    },
    ['jobs']
  );

  const onConfirm = async () => {
    setLoading(true);
    try {
      if (actionMode === 'delete') {
        await deleteMutation.mutateAsync(data.id);
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  const onEdit = () => {
    router.push(ROUTES.RECRUITER.JOBS.EDIT(data.id));
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <JobDetail
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
        job={data}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 cursor-pointer p-0'>
            <span className='sr-only'>Mở menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Hành động</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              router.push(
                `/recruiter-dashboard/job-seeker/suggested/${data.id}`
              );
            }}
          >
            <Sparkles className='mr-2 h-4 w-4 text-indigo-500' />
            <p className='text-indigo-500'>Gợi ý ứng viên</p>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              router.push(`/recruiter-dashboard/job/${data.id}/applications`);
            }}
          >
            <FileText className='mr-2 h-4 w-4 text-amber-500' />
            <p className='text-amber-500'>Xem đơn ứng tuyển</p>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowDetail(true)}>
            <Eye className='mr-2 h-4 w-4 text-gray-700' />
            <p className='text-gray-700'>Xem chi tiết</p>
          </DropdownMenuItem>
          {JobStatus[data.status as unknown as keyof typeof JobStatus] ===
            JobStatus.OPEN && (
            <DropdownMenuItem onClick={onEdit}>
              <Pencil className='mr-2 h-4 w-4 text-blue-500' />
              <p className='text-blue-500'>Sửa</p>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem
            onClick={() => {
              setActionMode('delete');
              setOpen(true);
            }}
          >
            <Trash color='#dc2626' className='mr-2 h-4 w-4' />
            <p className='text-[#dc2626]'>Xóa</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
