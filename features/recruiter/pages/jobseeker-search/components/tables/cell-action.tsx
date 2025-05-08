'use client';
import { Eye, MoreHorizontal } from 'lucide-react';

import type { JobSeeker, User } from '@/interfaces';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

interface CellActionProps {
  data: JobSeeker;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 cursor-pointer p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Hành động</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              router.push(ROUTES.RECRUITER.JOBSEEKER.DETAIL(data.id));
            }}
          >
            <Eye className='mr-2 h-4 w-4 text-blue-500' />
            <p className='text-blue-500'>Xem chi tiết</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
