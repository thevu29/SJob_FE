'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { ApplicationStatus, type Application } from '@/interfaces/application';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';

interface ApplicationDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  application: Application;
}

export function ApplicationDetail({
  isOpen,
  onClose,
  application
}: ApplicationDetailModalProps) {
  // Function to determine badge color based on status
  const getStatusBadge = (status: string) => {
    const formatedStatus =
      ApplicationStatus[status as unknown as keyof typeof ApplicationStatus];
    switch (formatedStatus) {
      case ApplicationStatus.PENDING:
        return (
          <Badge
            variant='outline'
            className='border-yellow-200 bg-yellow-50 text-yellow-500'
          >
            {ApplicationStatus.PENDING}
          </Badge>
        );
      case ApplicationStatus.ACCEPTED:
        return (
          <Badge
            variant='outline'
            className='border-green-200 bg-green-50 text-green-500'
          >
            {ApplicationStatus.ACCEPTED}
          </Badge>
        );
      case ApplicationStatus.REJECTED:
        return (
          <Badge
            variant='outline'
            className='border-red-200 bg-red-50 text-red-500'
          >
            {ApplicationStatus.REJECTED}
          </Badge>
        );
      default:
        return <Badge variant='outline'>{formatedStatus}</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-h-[90vh] max-w-md gap-0 overflow-hidden p-0 sm:max-w-lg md:max-w-xl lg:max-w-2xl'>
        <DialogHeader className='border-b p-6 pb-2'>
          <div className='flex items-center justify-between'>
            <DialogTitle className='text-xl font-semibold'>
              Chi tiết đơn ứng tuyển
            </DialogTitle>
          </div>
        </DialogHeader>

        <ScrollArea className='max-h-[calc(90vh-8rem)] overflow-auto'>
          <div className='space-y-6 p-6'>
            <div className='space-y-2'>
              <div>{getStatusBadge(application.status)}</div>
            </div>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <div className='space-y-2'>
                <h4 className='text-muted-foreground text-sm font-medium'>
                  Ứng viên
                </h4>
                <p className='font-medium'>{application.jobSeeker.name}</p>
              </div>
              <div className='space-y-2'>
                <h4 className='text-muted-foreground text-sm font-medium'>
                  Email
                </h4>
                <p className='font-medium'>{application.jobSeeker.email}</p>
              </div>
            </div>

            <div className='space-y-2'>
              <h4 className='text-muted-foreground text-sm font-medium'>
                Hồ sơ đính kèm
              </h4>
              <Link href={application.resumeUrl} target='_blank'>
                {application.resumeUrl}
              </Link>
            </div>

            <div className='space-y-2'>
              <h4 className='text-muted-foreground text-sm font-medium'>
                Thư ứng tuyển
              </h4>
              <div className='bg-muted/50 rounded-lg p-4'>
                <p className='break-words whitespace-pre-wrap'>
                  {application.message}
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
