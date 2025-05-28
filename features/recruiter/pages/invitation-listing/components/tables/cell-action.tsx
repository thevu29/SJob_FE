'use client';

import { toast } from 'sonner';
import { useState } from 'react';
import { AxiosError } from 'axios';
import {
  Eye,
  LockKeyhole,
  LockKeyholeOpen,
  MoreHorizontal,
  Pencil,
  Trash
} from 'lucide-react';

import { useDelete, usePut } from '@/hooks/use-queries';
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
import { Invitation } from '@/interfaces/invitation';
import { InvitationDetail } from '@/features/recruiter/pages/invitation-listing/components/invitation-detail';

interface CellActionProps {
  data: Invitation;
}

type ActionMode = 'delete' | null;

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [actionMode, setActionMode] = useState<ActionMode>(null);
  const [showDetail, setShowDetail] = useState(false);

  const deleteMutation = useDelete(
    'invitations',
    {
      onSuccess: () => {
        toast.success('Xóa thư mời ứng tuyển thành công');
      },
      onError: (error: AxiosError) => {
        toast.error(error?.message || 'Có lỗi xảy ra! Vui lòng thử lại!');
        console.error(error);
      }
    },
    ['invitations']
  );

  const onConfirm = async () => {
    setLoading(true);
    try {
      if (actionMode === 'delete') {
        await deleteMutation.mutateAsync(data.id);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <InvitationDetail
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
        invitation={data}
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
          <DropdownMenuItem onClick={() => setShowDetail(true)}>
            <Eye className='mr-2 h-4 w-4 text-blue-500' />
            <p className='text-blue-500'>Xem chi tiết</p>
          </DropdownMenuItem>
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
