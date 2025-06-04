import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { generateJobDetails } from '@/features/user/pages/job-detail/utils/generate-job-details';
import { ISavedJobData, Job, SavedJob, ViewedJob } from '@/interfaces/job';
import { formatSalary, getExpirationMessage, isExpired } from '@/lib/utils';
import { Bookmark, Clock } from 'lucide-react';
import DOMPurify from 'isomorphic-dompurify';
import { useState } from 'react';
import { JobApplicationModal } from '@/features/user/components/common/job-application';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  useAuthToken,
  useDelete,
  useGet,
  useGetCurrentUser,
  usePost
} from '@/hooks';
import { Badge } from '@/components/ui/badge';
import { Application } from '@/interfaces/application';
import { AxiosError } from 'axios';
import { FieldDetail } from '@/interfaces';

interface JobInfoProps {
  job: Job;
  fieldDetails: FieldDetail[];
}

export default function JobInfo({ job, fieldDetails }: JobInfoProps) {
  const router = useRouter();

  const { getAccessToken } = useAuthToken();
  const accessToken = getAccessToken();

  const { data: user } = useGetCurrentUser();
  const details = generateJobDetails(job, fieldDetails);

  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const { data: savedJob, refetch: refetchSavedJob } = useGet<SavedJob>(
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
        console.error('Failed to saved job:', error);
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
          console.error('Failed to unSaved job:', error);
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
    refetchSavedJob();
    refetchGetApplication();
  };

  const handleUnSaveJob = async (id: string) => {
    if (isUnSavedPending) return;

    await unSavedJobMutation(id);
    refetchSavedJob();
  };

  return (
    <>
      <Card>
        <CardContent className='space-y-4'>
          <div className='space-y-4'>
            <h1 className='text-2xl font-bold md:text-3xl'>{job.name}</h1>

            <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
              <div className='text-color-5 flex items-center text-lg font-semibold'>
                {formatSalary(job.salary)}
              </div>
            </div>

            <div className='flex flex-wrap gap-4'>
              <div className='text-muted-foreground flex items-center gap-1 text-sm'>
                <Clock className='h-4 w-4' />
                <span>{getExpirationMessage(job.deadline)}</span>
              </div>
            </div>

            <div className='mt-4 flex w-full gap-2 sm:w-auto'>
              {application ? (
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
                  variant='outline'
                  size='icon'
                  className='h-8 w-8'
                  onClick={() => handleUnSaveJob(savedJob.data.id)}
                >
                  <Bookmark className='h-5 w-5 fill-black' />
                  <span className='sr-only'>Bỏ lưu việc làm</span>
                </Button>
              ) : (
                <Button
                  variant='outline'
                  size='icon'
                  className='h-8 w-8'
                  onClick={handleSaveJob}
                >
                  <Bookmark className='h-5 w-5' />
                  <span className='sr-only'>Lưu việc làm</span>
                </Button>
              )}
            </div>
          </div>

          <h3 className='pt-4 text-lg font-semibold'>Mô tả công việc</h3>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(job.description)
            }}
          ></div>

          <h3 className='pt-4 text-lg font-semibold'>Yêu cầu công việc</h3>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(job.requirement)
            }}
          ></div>

          <h3 className='pt-4 text-lg font-semibold'>
            Các phúc lợi dành cho bạn
          </h3>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(job.benefit)
            }}
          ></div>

          <h3 className='pt-4 text-lg font-semibold'>Thông tin việc làm</h3>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            {details.map((detail, index) => (
              <div key={index} className='flex items-start gap-3'>
                <div className='bg-muted flex h-8 w-8 shrink-0 items-center justify-center rounded-full'>
                  <span>{detail.icon}</span>
                </div>
                <div>
                  <p className='text-muted-foreground text-xs'>
                    {detail.label}
                  </p>
                  <p className='font-medium'>{detail.value}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      {user && user.data && isModalOpen && (
        <JobApplicationModal
          job={job}
          user={user.data}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      )}
    </>
  );
}
