'use client';

import { toast } from 'sonner';
import { useState } from 'react';
import { AxiosError } from 'axios';
import {
  LockKeyhole,
  LockKeyholeOpen,
  MoreHorizontal,
  Trash
} from 'lucide-react';

import type { JobSeeker, User } from '@/interfaces';
import { useDelete, usePut } from '@/hooks/useQueries';
import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface CellActionProps {
  data: JobSeeker;
}

type ActionMode = 'activate' | 'block' | 'delete' | null;

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [actionMode, setActionMode] = useState<ActionMode>(null);

  const activateMutation = usePut<User, { id: string }>(
    'users/activate',
    {
      onSuccess: () => {
        toast.success('Activate job seeker thành công');
      },
      onError: (error: AxiosError) => {
        toast.error(error?.message || 'Có lỗi xảy ra! Vui lòng thử lại!');
        console.error(error);
      }
    },
    ['job-seekers']
  );

  const blockMutation = usePut<User, { id: string }>(
    'users/block',
    {
      onSuccess: () => {
        toast.success('Block job seeker thành công');
      },
      onError: (error: AxiosError) => {
        toast.error(error?.message || 'Có lỗi xảy ra! Vui lòng thử lại!');
        console.error(error);
      }
    },
    ['job-seekers']
  );

  const deleteMutation = useDelete(
    'job-seekers',
    {
      onSuccess: () => {
        toast.success('Xóa job seeker thành công');
      },
      onError: (error: AxiosError) => {
        toast.error(error?.message || 'Có lỗi xảy ra! Vui lòng thử lại!');
        console.error(error);
      }
    },
    ['job-seekers']
  );

  const onConfirm = async () => {
    setLoading(true);
    try {
      if (actionMode === 'activate') {
        await activateMutation.mutateAsync({ id: data.userId });
      } else if (actionMode === 'block') {
        await blockMutation.mutateAsync({ id: data.userId });
      } else {
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
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 cursor-pointer p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => {
              setActionMode('activate');
              setOpen(true);
            }}
          >
            <LockKeyholeOpen className='mr-2 h-4 w-4' color='#3b82f6' />
            <p className='text-[#3b82f6]'>Activate</p>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setActionMode('block');
              setOpen(true);
            }}
          >
            <LockKeyhole color='#fbbf24' className='mr-2 h-4 w-4' />
            <p className='text-[#fbbf24]'>Block</p>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setActionMode('delete');
              setOpen(true);
            }}
          >
            <Trash color='#dc2626' className='mr-2 h-4 w-4' />
            <p className='text-[#dc2626]'>Delete</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
