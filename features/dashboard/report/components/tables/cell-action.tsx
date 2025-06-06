import { Row } from '@tanstack/react-table';
import { Edit } from 'lucide-react';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

import type { Report } from '@/interfaces';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useReportContext } from '@/context/admin/report/update-report-context';

interface ReportTableRowActionProps {
  row: Row<Report>;
}

export function ReportTableRowAction({ row }: ReportTableRowActionProps) {
  const { setOpen, setCurrentReport } = useReportContext();

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='data-[state=open]:bg-muted flex h-8 w-8 p-0'
          >
            <DotsHorizontalIcon className='h-4 w-4' />
            <span className='sr-only'>Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-[160px]'>
          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() => {
              setCurrentReport(row.original);
              setOpen('update');
            }}
          >
            Cập nhật
            <DropdownMenuShortcut>
              <Edit size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
