'use client';

import { toast } from 'sonner';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { Eye, MoreHorizontal, Trash } from 'lucide-react';

import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Application } from '@/interfaces/application';
import { ApplicationDetail } from '@/features/recruiter/pages/application-listing/components/application-detail';

interface CellActionProps {
  data: Application;
}

type ActionMode = 'update' | null;

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [actionMode, setActionMode] = useState<ActionMode>(null);
  const [showDetail, setShowDetail] = useState(false);

  const onConfirm = async () => {
    setLoading(true);
    try {
      if (actionMode === 'update') {
        // await deleteMutation.mutateAsync(data.id);
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
      <ApplicationDetail
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
        application={data}
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
            <Eye className='mr-2 h-4 w-4 text-gray-700' />
            <p className='text-gray-700'>Xem chi tiết</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
