import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { generateJobDetails } from '@/features/user/pages/job-detail/utils/generate-job-details';
import { Job } from '@/interfaces/job';
import { formatSalary, getExpirationMessage, isExpired } from '@/lib/utils';
import { Clock } from 'lucide-react';
import DOMPurify from 'isomorphic-dompurify';
import { useState } from 'react';
import { JobApplicationModal } from '@/features/user/components/common/job-application';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useGetCurrentUser, usePost } from '@/hooks';
import { Badge } from '@/components/ui/badge';
import { IHasAppliedJobData } from '@/interfaces/application';
import { AxiosError } from 'axios';
import { FieldDetail } from '@/interfaces';

interface JobInfoProps {
  job: Job;
  fieldDetails: FieldDetail[];
}

export default function JobInfo({ job, fieldDetails }: JobInfoProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { data: user } = useGetCurrentUser();
  const details = generateJobDetails(job, fieldDetails);

  const { mutateAsync: hasAppliedJobMutation, isPending } = usePost<
    Boolean,
    IHasAppliedJobData
  >('applications/check-apply', {
    onError: (error: AxiosError) => {
      toast.error(error?.message || 'Có lỗi xảy ra! Vui lòng thử lại!');
      console.error('Failed to check applied job:', error);
    }
  });

  const handleApplyJob = async () => {
    if (!user?.data?.id) {
      toast.warning('Vui lòng đăng nhập để ứng tuyển công việc này.');
      // router.push(`/login?redirect=/jobs/${job.id}`);
      router.push(`/login`);
      return;
    }
    if (isPending) return;
    const payload: IHasAppliedJobData = {
      jobId: job.id,
      jobSeekerId: user.data.id
    };
    const hasApplied = await hasAppliedJobMutation(payload);
    if (hasApplied) {
      toast.error('Bạn đã ứng tuyển việc làm này!');
      return;
    }

    setIsModalOpen(true);
  };
  
  return (
    <>
      <Card>
        <CardContent className='space-y-4'>
          <div className='space-y-4'>
            <h1 className='text-2xl font-bold md:text-3xl'>{job.name}</h1>
    <Card>
      <CardContent className='space-y-4'>
        <div className='space-y-4'>
          <h1 className='text-2xl font-bold md:text-3xl'>{job.name}</h1>
            <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
              <div className='text-color-5 flex items-center text-lg font-semibold'>
                {formatSalary(job.salary)}
              </div>
            </div>
          </div>


            <div className='flex flex-wrap gap-4'>
              <div className='text-muted-foreground flex items-center gap-1 text-sm'>
                <Clock className='h-4 w-4' />
                <span>{getExpirationMessage(job.deadline)}</span>
              </div>
            </div>
            <div className='mt-4 flex w-full gap-2 sm:w-auto'>
              {isExpired(job.deadline) ? (
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

              <Button
                variant='outline'
                className='flex-1 sm:flex-none'
                // onClick={toggleSave}
              >
                {/* {isSaved ? 'Đã lưu' : 'Lưu công việc này'} */}
                Lưu công việc này
              </Button>
            </div>
          </div>

          <div className='mt-4 flex w-full gap-2 sm:w-auto'>
            <Button className='flex-1 bg-[#ff7a59] text-white hover:bg-[#ff7a59]/90 sm:flex-none'>
              Nộp đơn
            </Button>
            <Button variant='outline' className='flex-1 sm:flex-none'>
              Lưu công việc này
            </Button>
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
