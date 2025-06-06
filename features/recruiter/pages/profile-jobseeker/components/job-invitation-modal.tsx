'use client';

import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';

import { useGetCurrentUser, usePost, useGetPaginated } from '@/hooks';
import type { JobSeeker, Job, Invitation } from '@/interfaces';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  CreateInvitationSchema,
  TCreateInvitation
} from '@/features/recruiter/schemas/invitation.schema';
import { Combobox } from '@/components/common/combobox';

const defaultContent = `Dear [Tên ứng viên],

Chúng tôi rất vui mừng được mời bạn ứng tuyển vào vị trí [Tên vị trí] tại SJob Service. Nền tảng và kỹ năng ấn tượng của bạn đã thu hút sự chú ý của chúng tôi và chúng tôi tin rằng bạn có thể là một nhân tố tiềm năng cho đội ngũ của chúng tôi.

Vui lòng nộp đơn ứng tuyển của bạn thông qua trang web SJob kèm theo CV của bạn trước ngày [Ngày/tháng].`;

export default function JobInvitationModal() {
  const params = useParams();
  const queryClient = useQueryClient();

  const { data: user } = useGetCurrentUser();

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [jobsOptions, setJobsOptions] = useState<
    Array<{ value: string; label: string }>
  >([]);
  const [open, setOpen] = useState(false);
  const [charCount, setCharCount] = useState(defaultContent.length);

  const jobSeekerId = params.jobSeekerId as string;

  const { data: jobs, isLoading } = useGetPaginated<Job>(
    'jobs',
    page,
    10,
    ['jobs', user?.data.id ?? ''],
    {
      params: {
        recruiterId: user && user.data.id,
        ...(query && { query })
      }
    },
    {
      enabled: !!user?.data.id
    }
  );

  const hasMoreExercises =
    jobs && jobs.meta ? page < jobs.meta.totalPages : false;

  const jobSeekerData = queryClient.getQueryData<{ data: JobSeeker }>([
    'job-seekers',
    jobSeekerId
  ]);

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    if (jobs) {
      const options = jobs.data.map((job) => ({
        value: job.id,
        label: job.name
      }));

      setJobsOptions((prev) => (page === 1 ? options : [...prev, ...options]));
    }
  }, [jobs, page]);

  const handleSearchJobs = async (query: string) => {
    setQuery(query);
  };

  const handleLoadMoreJobs = async () => {
    if (jobs && jobs.meta && page < jobs.meta.totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const jobSeeker = jobSeekerData?.data as JobSeeker;

  const createInvitationMutation = usePost<Invitation>('invitations', {
    onSuccess: () => {
      toast.success('Gửi thư mời ứng tuyển thành công');
    },
    onError: (error: AxiosError) => {
      toast.error(error?.message || 'Có lỗi xảy ra! Vui lòng thử lại!');
      setOpen(false);
    }
  });

  const form = useForm<TCreateInvitation>({
    resolver: zodResolver(CreateInvitationSchema),
    defaultValues: {
      jobId: '',
      message: defaultContent
    }
  });

  const getJobNameById = (id: string): string | undefined => {
    const job = jobs && jobs.data.find((job) => job.id === id);
    return job?.name;
  };

  const onSubmit = async (data: TCreateInvitation) => {
    const payload = {
      jobId: data.jobId,
      jobName: getJobNameById(data.jobId),
      recruiterId: user?.data?.id,
      jobSeekerId: jobSeeker?.id as string,
      jobSeekerName: jobSeeker?.name as string,
      message: data.message
    };

    await createInvitationMutation.mutateAsync(payload);
    form.reset();

    setOpen(false);
  };

  return (
    <>
      <Button
        className='bg-primary text-primary-foreground flex-1 cursor-pointer'
        onClick={() => setOpen(true)}
      >
        Gửi lời mời ứng tuyển
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='max-h-[90vh] overflow-y-auto sm:max-w-[600px]'>
          <DialogHeader>
            <DialogTitle className='flex items-center justify-between text-xl font-semibold'>
              Gửi lời mời tới ứng viên
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='jobId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-medium'>
                      Chọn công việc để gửi lời mời{' '}
                      <span className='text-red-500'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Combobox
                        enableServerSideSearch
                        options={jobsOptions}
                        field={field}
                        placeholder='Chọn việc làm'
                        searchPlaceholder='Tìm kiếm việc làm...'
                        onSearch={handleSearchJobs}
                        onLoadMore={handleLoadMoreJobs}
                        isLoading={isLoading}
                        hasMore={hasMoreExercises}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='message'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-medium'>
                      Nội dung gửi đến ứng viên{' '}
                      <span className='text-red-500'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className='min-h-[100px] resize-none'
                        onChange={(e) => {
                          field.onChange(e);
                          setCharCount(e.target.value.length);
                        }}
                      />
                    </FormControl>
                    <div className='text-muted-foreground text-right text-sm'>
                      {charCount}/10000 ký tự
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex justify-end gap-2 pt-4'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => setOpen(false)}
                >
                  Hủy
                </Button>
                <Button
                  type='submit'
                  className='bg-primary text-primary-foreground'
                >
                  Gửi lời mời ứng tuyển
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
