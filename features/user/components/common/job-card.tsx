import { Heart } from 'lucide-react';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Job, ViewedJob } from '@/interfaces/job';
import placeholder from '@/public/placeholder.jpg';
import {
  formatExperience,
  formatRelativeDate,
  formatSalary,
  isExpired
} from '@/lib/utils';
import { ROUTES } from '@/constants/routes';
import Link from 'next/link';
import { useGetCurrentUser, usePost } from '@/hooks';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { JobApplicationModal } from '@/features/user/components/common/job-application';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { data: user } = useGetCurrentUser();
  const createViewJobMutation = usePost<ViewedJob>('viewed-jobs', {
    onError: (error: AxiosError) => {
      console.error('Failed to create view job:', error);
    }
  });

  const handleViewJob = async () => {
    if (!user?.data?.id) return;
    const payload = {
      jobSeekerId: user.data.id,
      jobId: job.id
    };
    await createViewJobMutation.mutateAsync(payload);
  };

  const handleApplyJob = () => {
    if (!user?.data?.id) {
      toast.warning('Vui lòng đăng nhập để ứng tuyển công việc này.');
      // router.push(`/login?redirect=/jobs/${job.id}`);
      router.push(`/login`);
      return;
    }
    setIsModalOpen(true);
  };
  return (
    <div>
      <Link href={ROUTES.JOBSEEKER.JOBS.DETAIL(job.id)}>
        <Card
          className='border-border mt-4 cursor-pointer overflow-hidden border transition-shadow duration-300 hover:shadow-md'
          onClick={handleViewJob}
        >
          <CardContent className='p-0'>
            <div className='grid grid-cols-12 gap-4'>
              <div className='col-span-12 p-4 md:col-span-9'>
                <div className='flex items-start gap-4'>
                  <div className='hidden flex-shrink-0 sm:block'>
                    <Image
                      src={job.recruiterImage || placeholder}
                      alt={job.recruiterName || 'Recruiter Logo'}
                      width={80}
                      height={80}
                      loading='lazy'
                      className='rounded-md border bg-white object-contain p-2'
                    />
                  </div>
                  <div className='min-w-0 flex-1'>
                    <h3 className='mb-1 line-clamp-2 text-lg font-semibold'>
                      {job.name}
                    </h3>
                    <p className='text-muted-foreground mb-2 text-sm'>
                      {job.recruiterName}
                    </p>
                    <div className='mb-2 flex'>
                      <Badge variant='outline' className='bg-muted/50'>
                        {formatExperience(job.experience)}
                      </Badge>
                    </div>
                    <div className='text-muted-foreground flex items-center text-sm'>
                      <span>{formatRelativeDate(job.date)}</span>
                      {/* <span className='mx-2'>•</span>
                      <span>Đã xem</span> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-span-12 flex flex-col justify-between p-4 md:col-span-3'>
                <div className='flex items-center justify-items-start md:justify-end'>
                  <p className='text-color-5 font-bold'>
                    {job.salary && formatSalary(job.salary)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
      <div className='col-span-12 mt-[-60px] flex justify-end gap-2 p-4 md:col-span-3'>
        {isExpired(job.deadline) ? (
          <Badge variant='outline' className='text-red-500'>
            Đã hết hạn
          </Badge>
        ) : (
          <Button size='sm' variant='outline' onClick={handleApplyJob}>
            Ứng tuyển
          </Button>
        )}

        <Button variant='ghost' size='icon' className='h-8 w-8 rounded-full'>
          <Heart className='h-5 w-5' />
          <span className='sr-only'>Add to favorites</span>
        </Button>
      </div>
      {user && user.data && isModalOpen && (
        <JobApplicationModal
          job={job}
          user={user.data}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      )}
    </div>
  );
}
