'use client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, ChevronDown } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import RichEditor, {
  type RichEditorRef
} from '@/components/common/rich-editor';
import {
  CreateInvitationSchema,
  TCreateInvitation
} from '@/features/recruiter/schemas/invitation.schema';
import { useParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { JobSeeker } from '@/interfaces';
import { Job } from '@/interfaces/job';
import { useGet, usePost } from '@/hooks/useQueries';
import { Invitation } from '@/interfaces/invitation';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

const defaultContent = `Dear [Tên ứng viên],

Chúng tôi rất vui mừng được mời bạn ứng tuyển vào vị trí [Tên vị trí] tại SJob Service. Nền tảng và kỹ năng ấn tượng của bạn đã thu hút sự chú ý của chúng tôi và chúng tôi tin rằng bạn có thể là một nhân tố tiềm năng cho đội ngũ của chúng tôi.

Vui lòng nộp đơn ứng tuyển của bạn thông qua trang web SJob kèm theo CV của bạn trước ngày [Ngày/tháng].
`;

export function JobInvitationModal() {
  const params = useParams();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const editorRef = useRef<RichEditorRef>(null);

  const recruiterId = '68144e36647b71355acf11d1';
  const jobSeekerId = params.jobSeekerId as string;

  const { data: jobData } = useGet<Job[]>('jobs/recruiters/' + recruiterId, [
    'jobs/recruiters/',
    recruiterId
  ]);
  const jobSeekerData = queryClient.getQueryData<{ data: JobSeeker }>([
    'job-seekers',
    jobSeekerId
  ]);
  const jobSeeker = jobSeekerData?.data as JobSeeker;
  const jobs = jobData?.data as Job[];

  const createInvitationMutation = usePost<Invitation>(
    'invitations',
    {
      onSuccess: () => {
        toast.success('Gửi thư mời ứng tuyển thành công');
      },
      onError: (error: AxiosError) => {
        toast.error(error?.message || 'Có lỗi xảy ra! Vui lòng thử lại!');
        console.error('Failed to create invitation:', error);
        setOpen(false);
      }
    }
    // ['invitations']
  );

  const form = useForm<TCreateInvitation>({
    resolver: zodResolver(CreateInvitationSchema),
    defaultValues: {
      jobId: '',
      message: defaultContent
    }
  });

  const getJobNameById = (id: string): string | undefined => {
    const job = jobs.find((job) => job.id === id);
    return job?.name;
  };

  async function onSubmit(data: TCreateInvitation) {
    if (editorRef.current) {
      const decodedContent = editorRef.current.getDecodedContent();
      const payload = {
        jobId: data.jobId,
        jobName: getJobNameById(data.jobId),
        recruiterId: recruiterId,
        jobSeekerId: jobSeeker?.id as string,
        jobSeekerName: jobSeeker?.name as string,
        message: decodedContent
      };
      await createInvitationMutation.mutateAsync(payload);
      form.reset();
      setOpen(false);
    } else {
      console.log(data);
    }
    setOpen(false);
  }

  const handleEditorChange = (content: string, editor: any) => {
    form.setValue('message', content);
    // Calculate character count from the text content (excluding HTML tags)
    const textContent = editor.getContent({ format: 'text' });
    setCharCount(textContent.length);
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Chọn công việc tại đây' />
                          <ChevronDown className='h-4 w-4 opacity-50' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {jobs &&
                          jobs.map((job) => (
                            <SelectItem key={job.id} value={job.id}>
                              {job.name}
                            </SelectItem>
                          ))}
                        {/* <SelectItem value='test-n'>Test N</SelectItem>
                        <SelectItem value='developer'>Developer</SelectItem>
                        <SelectItem value='designer'>Designer</SelectItem> */}
                      </SelectContent>
                    </Select>
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
                      <RichEditor
                        ref={editorRef}
                        value={field.value}
                        onChange={handleEditorChange}
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
