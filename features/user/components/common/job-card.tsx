import { Bookmark } from 'lucide-react';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ISavedJobData, Job, SavedJob, ViewedJob } from '@/interfaces/job';
import placeholder from '@/public/placeholder.jpg';
import {
  formatApplicationStatus,
  formatExperience,
  formatRelativeDate,
  formatSalary,
  isExpired
} from '@/lib/utils';
import { ROUTES } from '@/constants/routes';
import Link from 'next/link';
import {
  useAuthToken,
  useDelete,
  useGet,
  useGetCurrentUser,
  usePost
} from '@/hooks';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { JobApplicationModal } from '@/features/user/components/common/job-application';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  Application,
  ApplicationStatus,
  IHasAppliedJobData
} from '@/interfaces/application';

interface JobCardProps {
  job: Job;
  status?: string;
}

export function JobCard({ job, status = '' }: JobCardProps) {
  const router = useRouter();

  const { getAccessToken } = useAuthToken();
  const accessToken = getAccessToken();

  const { data: user } = useGetCurrentUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const createViewJobMutation = usePost<ViewedJob>('viewed-jobs', {}, [
    'viewed-jobs'
  ]);

  const { data: application, refetch: refetchGetApplication } =
    useGet<Application>(
      'applications/job/job-seeker',
      ['application/job/job-seeker', job.id, user?.data?.id ?? ''],
      {
        params: {
          jobId: job.id,
          jobSeekerId: user?.data?.id
        }
      },
      {
        enabled: !!accessToken && !!user?.data?.id
      }
    );

  const { data: savedJob, refetch } = useGet<SavedJob>(
    `saved-jobs/job/job-seeker`,
    [`saved-jobs/job/job-seeker`, job.id, user?.data?.id ?? ''],
    {
      params: {
        jobId: job.id,
        jobSeekerId: user?.data?.id
      }
    },
    {
      enabled: !!accessToken && !!user?.data?.id
    }
  );

  const { mutateAsync: savedJobMutation, isPending: isSavedPending } = usePost<
    SavedJob,
    ISavedJobData
  >(
    'saved-jobs',
    {
      onSuccess: () => {
        toast.success('Lưu việc làm thành công');
      },
      onError: (error: AxiosError) => {
        toast.error(error?.message || 'Có lỗi xảy ra! Vui lòng thử lại!');
      }
    },
    ['saved-jobs', job.id]
  );

  const { mutateAsync: unSavedJobMutation, isPending: isUnSavedPending } =
    useDelete(
      'saved-jobs',
      {
        onSuccess: () => {
          toast.success('Bỏ lưu việc làm thành công');
        },
        onError: (error: AxiosError) => {
          toast.error(error?.message || 'Có lỗi xảy ra! Vui lòng thử lại!');
        }
      },
      ['saved-jobs', job.id]
    );

  const handleSaveJob = async () => {
    if (!user?.data?.id) {
      toast.warning('Vui lòng đăng nhập để lưu công việc này.');
      router.push(`/login`);
      return;
    }

    if (isSavedPending) return;

    const payload = {
      jobId: job.id,
      jobSeekerId: user.data.id
    };

    await savedJobMutation(payload);
    refetch();
  };

  const handleUnSaveJob = async (id: string) => {
    if (isUnSavedPending) return;

    await unSavedJobMutation(id);
    refetch();
  };

  const handleViewJob = async () => {
    if (!user?.data?.id) return;

    const payload = {
      jobSeekerId: user.data.id,
      jobId: job.id
    };

    createViewJobMutation.mutate(payload);
  };

  const handleApplyJob = async () => {
    if (!user?.data?.id) {
      toast.warning('Vui lòng đăng nhập để ứng tuyển công việc này.');
      router.push(`/login`);
      return;
    }

    if (application && application.data) {
      toast.error('Bạn đã ứng tuyển việc làm này!');
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
                    <h3 className='mb-1 line-clamp-2 flex items-center text-lg font-semibold'>
                      {job.name}
                      {status && status != '' && (
                        <Badge className={`ml-2`}>
                          {formatApplicationStatus(
                            status as keyof typeof ApplicationStatus
                          )}
                        </Badge>
                      )}
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
        {application && application.data ? (
          <Button
            className='bg-primary hover:bg-primary/80 flex-1 text-white sm:flex-none'
            disabled
          >
            Đã ứng tuyển
          </Button>
        ) : isExpired(job.deadline) ? (
          <Badge variant='outline' className='text-red-500'>
            Đã hết hạn
          </Badge>
        ) : (
          <Button
            className='bg-primary hover:bg-primary/80 flex-1 text-white sm:flex-none'
            onClick={handleApplyJob}
          >
            Ứng tuyển
          </Button>
        )}

        {savedJob && savedJob.data ? (
          <Button
            variant='ghost'
            size='icon'
            className='h-8 w-8 rounded-full'
            onClick={() => handleUnSaveJob(savedJob.data.id)}
          >
            <Bookmark className='h-5 w-5 fill-black' />
            <span className='sr-only'>Bỏ lưu việc làm</span>
          </Button>
        ) : (
          <Button
            variant='ghost'
            size='icon'
            className='h-8 w-8 rounded-full'
            onClick={handleSaveJob}
          >
            <Bookmark className='h-5 w-5' />
            <span className='sr-only'>Lưu việc làm</span>
          </Button>
        )}
      </div>
      {user && user.data && isModalOpen && (
        <JobApplicationModal
          job={job}
          user={user.data}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          refetchGetApplication={refetchGetApplication}
        />
      )}
    </div>
  );
}
