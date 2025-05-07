'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ChevronDown, ChevronUp, Pencil } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import {
  CreateJobSchema,
  TCreateJob,
  TUpdateJob,
  UpdateJobSchema
} from '@/features/recruiter/schemas/job.schema';
import { useGet, usePost, usePut } from '@/hooks/useQueries';
import { Job } from '@/interfaces/job';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { JobDescriptionSection } from '@/features/recruiter/pages/job-updating/components/job-description-section';
import { FieldDetail } from '@/interfaces/field';

export default function JobUpdatingForm() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.jobId as string;

  const [openJobDescription, setOpenJobDescription] = useState(true);

  const { data: jobData } = useGet<Job>('jobs/' + jobId, ['jobs', jobId]);
  const { data: fieldDetailData } = useGet<FieldDetail[]>(
    '/field-details/jobs/' + jobId,
    ['field-details', jobId]
  );
  const job = jobData?.data as Job;
  const fieldDetails = fieldDetailData?.data[0] as FieldDetail;

  const updateJobMutation = usePut<Job, TUpdateJob>(
    'jobs',
    {
      onSuccess: () => {
        toast.success('Cập nhật tin tuyển dụng thành công!');
      },
      onError: (error: AxiosError) => {
        toast.error(error?.message || 'Có lỗi xảy ra! Vui lòng thử lại!');
      }
    },
    ['jobs']
  );

  const form = useForm<TUpdateJob>({
    resolver: zodResolver(UpdateJobSchema),
    values: {
      name: job?.name || '',
      description: job?.description || '',
      salary: Number(job?.salary) || 0,
      requirement: job?.requirement || '',
      benefit: job?.benefit || '',
      deadline: job?.deadline || new Date().toISOString().split('T')[0], // 2015-03-25
      slots: job?.slots || 1,
      type: job?.type || 'FULL_TIME',
      education: job?.education || 'Cử nhân',
      experience: job?.experience || 'Không yêu cầu',
      fieldDetails: fieldDetails?.id || ''
    }
  });

  async function onSubmit(values: TUpdateJob) {
    try {
      const payload = {
        ...values,
        id: jobId,
        fieldDetails: [values.fieldDetails]
      };
      await updateJobMutation.mutateAsync(payload as any);
      form.reset();
      router.push(ROUTES.RECRUITER.JOBS.LIST);
    } catch (error) {
      console.error('Error updating job:', error);
    }
  }

  const handleCancel = () => {
    router.push(ROUTES.RECRUITER.DASHBOARD);
  };

  const toggleJobDescription = () => {
    setOpenJobDescription(!openJobDescription);
  };

  return (
    <div className='mx-auto max-w-4xl'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className='mb-8 shadow-sm'>
            <CardHeader className='flex flex-row items-center gap-2 pb-2'>
              <Pencil className='text-muted-foreground h-5 w-5' />
              <CardTitle className='text-2xl font-bold'>
                Đăng Tin Tuyển Dụng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground mb-6'>
                Tạo mô tả công việc và kỳ vọng để tìm kiếm ứng viên phù hợp.
              </p>

              <div className='space-y-4'>
                <div className='w-full'>
                  <Button
                    variant='ghost'
                    className='bg-muted/50 hover:bg-muted/70 h-auto w-full justify-between rounded-lg px-6 py-4'
                    onClick={toggleJobDescription}
                    type='button'
                  >
                    <span className='text-lg font-semibold'>
                      Mô tả công việc
                    </span>
                    {openJobDescription ? (
                      <ChevronUp className='h-5 w-5' />
                    ) : (
                      <ChevronDown className='h-5 w-5' />
                    )}
                  </Button>
                  {openJobDescription && (
                    <div className='mt-4 transition-all duration-300 ease-in-out'>
                      <Card>
                        <CardContent className='pt-6'>
                          <JobDescriptionSection form={form} />
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
              </div>

              <div className='mt-8 flex justify-between gap-4'>
                <Button
                  variant='outline'
                  className='flex-1 cursor-pointer'
                  type='button'
                  onClick={handleCancel}
                >
                  Hủy
                </Button>
                <Button
                  className='bg-primary text-primary-foreground flex-1'
                  type='submit'
                  disabled={updateJobMutation.isPending}
                >
                  {updateJobMutation.isPending
                    ? 'Đang cập nhật...'
                    : 'Cập nhật tin tuyển dụng'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
