'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import { formatDate, formatSalary } from '@/lib/utils';
import type { Job } from '@/interfaces/job';
import { JobStatus, JobType } from '@/interfaces/job';
import { Badge } from '@/components/ui/badge';
import {
  X,
  Calendar,
  Users,
  GraduationCap,
  Briefcase,
  Clock,
  DollarSign,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface JobDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job;
}

export function JobDetail({ isOpen, onClose, job }: JobDetailModalProps) {
  // Function to determine status badge
  const getStatusBadge = (status: JobStatus) => {
    const formatedStatus =
      JobStatus[status as unknown as keyof typeof JobStatus];
    switch (formatedStatus) {
      case JobStatus.OPEN:
        return (
          <Badge
            variant='outline'
            className='border-green-200 bg-green-50 text-green-700'
          >
            {JobStatus.OPEN}
          </Badge>
        );
      case JobStatus.CLOSED:
        return (
          <Badge
            variant='outline'
            className='border-red-200 bg-red-50 text-red-700'
          >
            {JobStatus.CLOSED}
          </Badge>
        );
      case JobStatus.EXPIRED:
        return (
          <Badge
            variant='outline'
            className='border-gray-200 bg-gray-50 text-gray-700'
          >
            {JobStatus.EXPIRED}
          </Badge>
        );
      default:
        return <Badge variant='outline'>{status}</Badge>;
    }
  };

  // Function to determine job type badge
  const getJobTypeBadge = (type: string) => {
    const formatedType = JobType[type as unknown as keyof typeof JobType];
    switch (formatedType) {
      case JobType.FULL_TIME:
        return (
          <Badge
            variant='outline'
            className='border-blue-200 bg-blue-50 text-blue-700'
          >
            {JobType.FULL_TIME}
          </Badge>
        );
      case JobType.PART_TIME:
        return (
          <Badge
            variant='outline'
            className='border-purple-200 bg-purple-50 text-purple-700'
          >
            {JobType.PART_TIME}
          </Badge>
        );
      case JobType.INTERNSHIP:
        return (
          <Badge
            variant='outline'
            className='border-yellow-200 bg-yellow-50 text-yellow-700'
          >
            {JobType.INTERNSHIP}
          </Badge>
        );
      case JobType.FREELANCE:
        return (
          <Badge
            variant='outline'
            className='border-orange-200 bg-orange-50 text-orange-700'
          >
            {JobType.FREELANCE}
          </Badge>
        );
      default:
        return <Badge variant='outline'>{type}</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-h-[90vh] max-w-md gap-0 overflow-hidden p-0 sm:max-w-lg md:max-w-xl lg:max-w-3xl'>
        <DialogHeader className='border-b p-6 pb-2'>
          <div className='flex items-center justify-between'>
            <DialogTitle className='text-xl font-semibold'>
              {job.name}
            </DialogTitle>
          </div>
        </DialogHeader>

        <ScrollArea className='max-h-[calc(90vh-8rem)] overflow-auto'>
          <div className='space-y-6 p-6'>
            {/* Status and Type */}
            <div className='flex flex-wrap gap-3'>
              {getStatusBadge(job.status)}
              {getJobTypeBadge(job.type)}
            </div>

            {/* Key Information */}
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
              <div className='flex items-center gap-2'>
                <Calendar className='text-muted-foreground h-4 w-4' />
                <div>
                  <p className='text-muted-foreground text-sm font-medium'>
                    Hạn nộp hồ sơ
                  </p>
                  <p className='font-medium'>
                    {formatDate(new Date(job.deadline))}
                  </p>
                </div>
              </div>

              <div className='flex items-center gap-2'>
                <Users className='text-muted-foreground h-4 w-4' />
                <div>
                  <p className='text-muted-foreground text-sm font-medium'>
                    Số lượng
                  </p>
                  <p className='font-medium'>{job.slots} vị trí</p>
                </div>
              </div>

              <div className='flex items-center gap-2'>
                <GraduationCap className='text-muted-foreground h-4 w-4' />
                <div>
                  <p className='text-muted-foreground text-sm font-medium'>
                    Trình độ học vấn
                  </p>
                  <p className='font-medium'>{job.education}</p>
                </div>
              </div>

              <div className='flex items-center gap-2'>
                <Briefcase className='text-muted-foreground h-4 w-4' />
                <div>
                  <p className='text-muted-foreground text-sm font-medium'>
                    Kinh nghiệm
                  </p>
                  <p className='font-medium'>{job.experience}</p>
                </div>
              </div>

              <div className='flex items-center gap-2'>
                <Clock className='text-muted-foreground h-4 w-4' />
                <div>
                  <p className='text-muted-foreground text-sm font-medium'>
                    Ngày đăng
                  </p>
                  <p className='font-medium'>
                    {formatDate(new Date(job.date))}
                  </p>
                </div>
              </div>

              {/* <div className='flex items-center gap-2'>
                {job.closeWhenFull ? (
                  <CheckCircle2 className='h-4 w-4 text-green-500' />
                ) : (
                  <XCircle className='h-4 w-4 text-red-500' />
                )}
                <div>
                  <p className='text-muted-foreground text-sm font-medium'>
                    Đóng khi đủ
                  </p>
                  <p className='font-medium'>
                    {job.closeWhenFull ? 'Có' : 'Không'}
                  </p>
                </div>
              </div> */}

              <div className='flex items-center gap-2'>
                <DollarSign className='text-muted-foreground h-4 w-4' />
                <div>
                  <p className='text-muted-foreground text-sm font-medium'>
                    Mức lương
                  </p>
                  <p className='font-medium'>{formatSalary(job.salary)}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div className='space-y-2'>
              <h3 className='text-lg font-semibold'>Mô tả công việc</h3>
              <div className='bg-muted/50 rounded-lg p-4'>
                <p className='break-words whitespace-pre-wrap'>
                  {job.description}
                </p>
              </div>
            </div>

            {/* Requirements */}
            <div className='space-y-2'>
              <h3 className='text-lg font-semibold'>Yêu cầu</h3>
              <div className='bg-muted/50 rounded-lg p-4'>
                <p className='break-words whitespace-pre-wrap'>
                  {job.requirement}
                </p>
              </div>
            </div>

            {/* Benefits */}
            <div className='space-y-2'>
              <h3 className='text-lg font-semibold'>Quyền lợi</h3>
              <div className='bg-muted/50 rounded-lg p-4'>
                <p className='break-words whitespace-pre-wrap'>{job.benefit}</p>
              </div>
            </div>

            {/* IDs (for admin/debug purposes) */}
            <div className='mt-6 border-t border-dashed pt-4'>
              <div className='text-muted-foreground grid grid-cols-1 gap-2 text-xs md:grid-cols-2'>
                <div>
                  <span className='font-medium'>ID công việc:</span> {job.id}
                </div>
                <div>
                  <span className='font-medium'>ID nhà tuyển dụng:</span>{' '}
                  {job.recruiterId}
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
