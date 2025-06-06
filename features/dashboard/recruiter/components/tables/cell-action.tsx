'use client';

import { toast } from 'sonner';
import { useState } from 'react';
import { AxiosError } from 'axios';
import {
  LockKeyhole,
  LockKeyholeOpen,
  MoreHorizontal,
  Trash,
  CheckCircle
} from 'lucide-react';

import type { Recruiter, User } from '@/interfaces';
import { useDelete, usePut, usePutFormData } from '@/hooks';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { AlertModal } from '@/components/modal/alert-modal';

interface CellActionProps {
  data: Recruiter;
}

type ActionMode = 'activate' | 'block' | 'delete' | 'approve' | null;

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [actionMode, setActionMode] = useState<ActionMode>(null);

  const activateMutation = usePut<User, { id: string }>(
    'users/activate',
    {
      onSuccess: () => {
        toast.success('Kích hoạt tài khoản nhà tuyển dụng thành công');
      },
      onError: (error: AxiosError) => {
        toast.error(error?.message || 'Có lỗi xảy ra! Vui lòng thử lại!');
      }
    },
    ['recruiters']
  );

  const blockMutation = usePut<User, { id: string }>(
    'users/block',
    {
      onSuccess: () => {
        toast.success('Chặn tài khoản nhà tuyển dụng thành công');
      },
      onError: (error: AxiosError) => {
        toast.error(error?.message || 'Có lỗi xảy ra! Vui lòng thử lại!');
      }
    },
    ['recruiters']
  );

  const deleteMutation = useDelete(
    'recruiters',
    {
      onSuccess: () => {
        toast.success('Xóa nhà tuyển dụng thành công');
      },
      onError: (error: AxiosError) => {
        toast.error(error?.message || 'Có lỗi xảy ra! Vui lòng thử lại!');
      }
    },
    ['recruiters']
  );

  const approveMutation = usePutFormData<
    Recruiter,
    { id: string; status: true }
  >(
    'recruiters',
    {
      onSuccess: () => {
        toast.success('Phê duyệt nhà tuyển dụng thành công');
      },
      onError: (error: AxiosError) => {
        toast.error(error?.message || 'Có lỗi xảy ra! Vui lòng thử lại!');
      }
    },
    ['recruiters']
  );

  const onConfirm = async () => {
    setLoading(true);
    try {
      if (actionMode === 'activate') {
        await activateMutation.mutateAsync({ id: data.userId });
      } else if (actionMode === 'block') {
        await blockMutation.mutateAsync({ id: data.userId });
      } else if (actionMode === 'delete') {
        await deleteMutation.mutateAsync(data.id);
      } else {
        await approveMutation.mutateAsync({
          id: data.id,
          status: true
        });
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại');
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
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 cursor-pointer p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Thao tác</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => {
              setActionMode('activate');
              setOpen(true);
            }}
          >
            <LockKeyholeOpen className='mr-2 h-4 w-4' color='#3b82f6' />
            <p className='text-[#3b82f6]'>Kích hoạt</p>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setActionMode('block');
              setOpen(true);
            }}
          >
            <LockKeyhole color='#fbbf24' className='mr-2 h-4 w-4' />
            <p className='text-[#fbbf24]'>Chặn</p>
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
          {!data.status ? (
            <DropdownMenuItem
              onClick={() => {
                setActionMode('approve');
                setOpen(true);
              }}
            >
              <CheckCircle color='#16a34a' className='mr-2 h-4 w-4' />
              <p className='text-[#16a34a]'>Phê duyệt</p>
            </DropdownMenuItem>
          ) : (
            ''
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
