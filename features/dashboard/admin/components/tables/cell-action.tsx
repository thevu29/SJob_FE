'use client';

import { toast } from 'sonner';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { LockKeyhole, LockKeyholeOpen, MoreHorizontal } from 'lucide-react';

import type { User } from '@/interfaces';
import { usePut } from '@/hooks';
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
  data: User;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [actionMode, setActionMode] = useState<'activate' | 'block' | null>(
    null
  );

  const activateMutation = usePut<User, { id: string }>(
    'users/activate',
    {
      onSuccess: () => {
        toast.success('Kích hoạt tài khoản admin thành công');
      },
      onError: (error: AxiosError) => {
        toast.error(error?.message || 'Có lỗi xảy ra! Vui lòng thử lại!');
      }
    },
    ['admins']
  );

  const blockMutation = usePut<User, { id: string }>(
    'users/block',
    {
      onSuccess: () => {
        toast.success('Chặn tài khoản admin thành công');
      },
      onError: (error: AxiosError) => {
        toast.error(error?.message || 'Có lỗi xảy ra! Vui lòng thử lại!');
      }
    },
    ['admins']
  );

  const onConfirm = async () => {
    setLoading(true);
    try {
      if (actionMode === 'activate') {
        await activateMutation.mutateAsync({ id: data.id });
      } else {
        await blockMutation.mutateAsync({ id: data.id });
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
            <LockKeyhole color='#dc2626' className='mr-2 h-4 w-4' />
            <p className='text-[#dc2626]'>Chặn</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
