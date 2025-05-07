'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import { formatDate } from '@/lib/utils';
import { InvitationStatus, type Invitation } from '@/interfaces/invitation';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface InvitationDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  invitation: Invitation;
}

export function InvitationDetail({
  isOpen,
  onClose,
  invitation
}: InvitationDetailModalProps) {
  // Function to determine badge color based on status
  const getStatusBadge = (status: string) => {
    const formatedStatus =
      InvitationStatus[status as unknown as keyof typeof InvitationStatus];
    switch (formatedStatus) {
      case InvitationStatus.PENDING:
        return (
          <Badge
            variant='outline'
            className='border-yellow-200 bg-yellow-50 text-yellow-500'
          >
            {InvitationStatus.PENDING}
          </Badge>
        );
      case InvitationStatus.ACCEPTED:
        return (
          <Badge
            variant='outline'
            className='border-green-200 bg-green-50 text-green-500'
          >
            {InvitationStatus.ACCEPTED}
          </Badge>
        );
      case InvitationStatus.REJECTED:
        return (
          <Badge
            variant='outline'
            className='border-red-200 bg-red-50 text-red-500'
          >
            {InvitationStatus.REJECTED}
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
              Chi tiết thư mời
            </DialogTitle>
          </div>
        </DialogHeader>

        <ScrollArea className='max-h-[calc(90vh-8rem)] overflow-auto'>
          <div className='space-y-6 p-6'>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <div className='space-y-2'>
                <h4 className='text-muted-foreground text-sm font-medium'>
                  Công việc
                </h4>
                <p className='font-medium'>{invitation.jobName}</p>
              </div>

              <div className='space-y-2'>
                <h4 className='text-muted-foreground text-sm font-medium'>
                  Ứng viên
                </h4>
                <p className='font-medium'>{invitation.jobSeekerName}</p>
              </div>
            </div>

            <div className='space-y-2'>
              <h4 className='text-muted-foreground text-sm font-medium'>
                Trạng thái
              </h4>
              <div>{getStatusBadge(invitation.status)}</div>
            </div>

            <div className='space-y-2'>
              <h4 className='text-muted-foreground text-sm font-medium'>
                Lời nhắn
              </h4>
              <div className='bg-muted/50 rounded-lg p-4'>
                <p className='break-words whitespace-pre-wrap'>
                  {invitation.message}
                </p>
              </div>
            </div>

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <div className='space-y-2'>
                <h4 className='text-muted-foreground text-sm font-medium'>
                  Thời gian tạo
                </h4>
                <p className='text-sm'>
                  {formatDate(new Date(invitation.createdAt))}
                </p>
              </div>

              {invitation.updatedAt !== invitation.createdAt && (
                <div className='space-y-2'>
                  <h4 className='text-muted-foreground text-sm font-medium'>
                    Thời gian cập nhật
                  </h4>
                  <p className='text-sm'>
                    {formatDate(new Date(invitation.updatedAt))}
                  </p>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
