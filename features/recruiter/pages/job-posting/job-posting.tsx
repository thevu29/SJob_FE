'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ChevronDown, ChevronUp, Pencil } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { JobDescriptionSection } from '@/features/recruiter/pages/job-posting/components/job-description-section';
import {
  CreateJobSchema,
  TCreateJob
} from '@/features/recruiter/schemas/job.schema';
import { usePost } from '@/hooks/use-queries';
import { Job } from '@/interfaces/job';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { useGetCurrentUser } from '@/hooks';

export default function JobPostingForm() {
  const { data: user } = useGetCurrentUser();

  const [openJobDescription, setOpenJobDescription] = useState(true);
  const router = useRouter();

  const createJobMutation = usePost<Job, TCreateJob>(
    'jobs/recruiters/' + user?.data?.id,
    {
      onSuccess: () => {
        toast.success('Đăng tin tuyển dụng thành công!');
        form.reset(); // Reset form after successful submission
      },
      onError: (error: AxiosError) => {
        toast.error(error?.message || 'Có lỗi xảy ra! Vui lòng thử lại!');
        console.error('Error creating job:', error);
      }
    }
  );

  const form = useForm<TCreateJob>({
    resolver: zodResolver(CreateJobSchema),
    defaultValues: {
      name: '',
      description: '',
      salary: '',
      requirement: '',
      benefit: '',
      deadline: new Date()
        .toLocaleDateString('en-GB')
        .split('/')
        .reverse()
        .join('-'), // 2015-03-25
      slots: 1,
      type: 'FULL_TIME',
      education: 'Cử nhân',
      experience: ''
    }
  });

  async function onSubmit(values: TCreateJob) {
    // console.log(values);
    try {
      const payload = {
        ...values,
        fieldDetails: [values.fieldDetails]
      };
      await createJobMutation.mutateAsync(payload as any);
      form.reset();
      router.push(ROUTES.RECRUITER.JOBS.LIST);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

  const handleCancel = () => {
    form.reset();
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
                  disabled={createJobMutation.isPending}
                >
                  {createJobMutation.isPending
                    ? 'Đang đăng...'
                    : 'Đăng tuyển dụng'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
