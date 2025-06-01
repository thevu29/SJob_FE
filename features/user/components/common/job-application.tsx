'use client';

import type React from 'react';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, FileText, Trash2, Loader2 } from 'lucide-react';
import { Job } from '@/interfaces/job';
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import type { Resume } from '@/interfaces/resume';
import { useGet, usePostFormData } from '@/hooks';
import { User, JobSeeker, Recruiter } from '@/interfaces';
import {
  CreateApplicationSchema,
  TCreateApplication
} from '@/features/user/schemas/application.schema';
import { Application } from '@/interfaces/application';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

interface JobApplicationModalProps {
  job: Job;
  user: User | JobSeeker;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function JobApplicationModal({
  job,
  user,
  open,
  onOpenChange
}: JobApplicationModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { data: resumeData } = useGet<Resume[]>(
    'resumes/job-seeker/' + user.id,
    ['resumes/job-seeker/', user.id]
  );
  const { mutateAsync: apply, isPending } = usePostFormData<Application>(
    'applications',
    {
      onSuccess: () => {
        toast.success('Ứng tuyển việc làm thành công');
      },
      onError: (error: AxiosError) => {
        toast.error(error?.message || 'Có lỗi xảy ra! Vui lòng thử lại!');
        console.error('Failed to create applications:', error);
      }
    }
  );

  const form = useForm<TCreateApplication>({
    resolver: zodResolver(CreateApplicationSchema),
    defaultValues: {
      resumeType: 'new',
      resumeId: '',
      resumeFile: undefined,
      message: ''
    }
  });

  const handleSubmit = async (data: TCreateApplication) => {
    const submitData: {
      jobSeekerId: string;
      jobId: string;
      resumeId?: string;
      resumeFile?: File;
      message?: string;
    } = {
      jobSeekerId: user.id,
      jobId: job.id,
      message: data.message
    };

    if (data.resumeType === 'existing' && data.resumeId) {
      submitData.resumeId = data.resumeId;
    } else if (data.resumeType === 'new' && data.resumeFile) {
      submitData.resumeFile = data.resumeFile;
    }
    await apply(submitData as any);
    onOpenChange(false);
  };

  const handleDeleteFile = () => {
    setSelectedFile(null);
    form.setValue('resumeFile', undefined);
    form.clearErrors('resumeFile');
  };

  const handleResumeSelect = (resumeId: string) => {
    form.setValue('resumeId', resumeId);
    form.setValue('resumeType', 'existing');
    form.clearErrors('resumeType');
    console.log(form.getValues());
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-[90vh] max-w-2xl overflow-y-auto p-0'>
        <DialogHeader className='border-b px-6 py-4'>
          <DialogTitle className='text-left text-lg font-semibold'>
            Ứng tuyển công việc {job.name}
          </DialogTitle>
          <DialogDescription className='sr-only' />
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-6'
          >
            <div className='space-y-6 px-6'>
              {/* Profile Section */}
              <div className='space-y-4'>
                <h3 className='text-base font-medium'>Hồ sơ của bạn</h3>

                <FormField
                  control={form.control}
                  name='resumeType'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className='space-y-3'
                        >
                          {/* Existing Resumes */}
                          {resumeData &&
                            resumeData.data &&
                            resumeData.data.length > 0 && (
                              <div className='space-y-2'>
                                <div className='flex items-center space-x-3 rounded-lg border p-3'>
                                  <RadioGroupItem
                                    value='existing'
                                    id='existing'
                                  />
                                  <div className='flex-1'>
                                    <Label
                                      htmlFor='existing'
                                      className='cursor-pointer font-medium'
                                    >
                                      Sử dụng hồ sơ có sẵn
                                    </Label>
                                    <p className='text-muted-foreground text-sm'>
                                      Chọn từ các hồ sơ đã tải lên trước đó
                                    </p>
                                  </div>
                                </div>

                                {/* Resume List - only show when existing is selected */}
                                {form.watch('resumeType') === 'existing' && (
                                  <div className='space-y-2'>
                                    {resumeData &&
                                      resumeData.data &&
                                      resumeData.data.length > 0 &&
                                      resumeData.data.map((resume) => (
                                        <FormField
                                          key={resume.id}
                                          control={form.control}
                                          name='resumeId'
                                          render={({ field: resumeField }) => (
                                            <div
                                              className={`border-primary bg-primary/5 flex cursor-pointer items-center space-x-3 rounded-lg border p-3 transition-colors ${
                                                resumeField.value === resume.id
                                                  ? 'ring-primary ring-2'
                                                  : 'hover:bg-primary/10'
                                              }`}
                                              onClick={() => {
                                                resumeField.onChange(resume.id);
                                                handleResumeSelect(resume.id);
                                              }}
                                            >
                                              <input
                                                type='radio'
                                                checked={
                                                  resumeField.value ===
                                                  resume.id
                                                }
                                                onChange={() => {
                                                  resumeField.onChange(
                                                    resume.id
                                                  );
                                                  handleResumeSelect(resume.id);
                                                }}
                                                className='sr-only'
                                              />
                                              <div className='bg-primary flex h-8 w-8 items-center justify-center rounded-full'>
                                                <FileText className='text-primary-foreground h-4 w-4' />
                                              </div>
                                              <div className='flex-1'>
                                                <div className='flex items-center space-x-2'>
                                                  <span className='font-medium'>
                                                    {resume.name}
                                                  </span>
                                                  {resume.main && (
                                                    <span className='bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs'>
                                                      Chính
                                                    </span>
                                                  )}
                                                </div>
                                                <p className='text-muted-foreground text-sm'>
                                                  📎 Đã tải lên:{' '}
                                                  {new Date(
                                                    resume.uploadedAt
                                                  ).toLocaleDateString('vi-VN')}
                                                </p>
                                              </div>
                                            </div>
                                          )}
                                        />
                                      ))}
                                  </div>
                                )}
                              </div>
                            )}

                          {/* File Upload Option */}
                          <div className='space-y-3'>
                            <div className='flex items-center space-x-3 rounded-lg border p-3'>
                              <RadioGroupItem value='new' id='new' />
                              <div className='flex-1'>
                                <Label
                                  htmlFor='new'
                                  className='cursor-pointer font-medium'
                                >
                                  Tải lên hồ sơ mới
                                </Label>
                                <p className='text-muted-foreground text-sm'>
                                  Chọn file từ máy tính của bạn
                                </p>
                              </div>
                            </div>

                            {/* File Upload Area - only show when new is selected */}
                            {form.watch('resumeType') === 'new' && (
                              <FormField
                                control={form.control}
                                name='resumeFile'
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <div className='border-border rounded-lg border-2 border-dashed p-6 text-center'>
                                        {selectedFile ? (
                                          <div className='bg-primary/5 flex items-center justify-between rounded-lg border p-2'>
                                            <div className='flex items-center space-x-3'>
                                              <div className='bg-primary flex h-8 w-8 items-center justify-center rounded-full'>
                                                <FileText className='text-primary-foreground h-4 w-4' />
                                              </div>
                                              <span className='max-w-[200px] truncate font-medium'>
                                                {selectedFile.name}
                                              </span>
                                            </div>
                                            <Button
                                              type='button'
                                              variant='ghost'
                                              size='icon'
                                              onClick={handleDeleteFile}
                                              className='text-destructive hover:text-destructive h-8 w-8'
                                            >
                                              <Trash2 className='h-4 w-4' />
                                            </Button>
                                          </div>
                                        ) : (
                                          <div className='flex flex-col items-center space-y-2'>
                                            <div>
                                              <Label
                                                htmlFor='file-upload'
                                                className='text-primary flex cursor-pointer items-center gap-2 font-medium'
                                              >
                                                <div className='bg-primary flex items-center justify-center rounded-full p-1'>
                                                  <Plus className='text-primary-foreground h-3 w-3' />
                                                </div>
                                                Chọn hồ sơ từ máy của bạn
                                              </Label>
                                              <Input
                                                id='file-upload'
                                                type='file'
                                                accept='.pdf'
                                                onChange={(e) => {
                                                  const file =
                                                    e.target.files?.[0];
                                                  if (file) {
                                                    setSelectedFile(file);
                                                    field.onChange(file);
                                                    form.setValue(
                                                      'resumeType',
                                                      'new'
                                                    );
                                                    form.clearErrors(
                                                      'resumeType'
                                                    );
                                                  }
                                                }}
                                                className='hidden'
                                              />
                                            </div>
                                            <p className='text-muted-foreground text-sm'>
                                              Hỗ trợ định dạng pdf có kích thước
                                              dưới 5MB
                                            </p>
                                          </div>
                                        )}
                                      </div>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            )}
                          </div>
                        </RadioGroup>
                      </FormControl>

                      <FormMessage className='mt-2' />
                    </FormItem>
                  )}
                />
              </div>

              {/* Application Information Section */}
              <div className='space-y-4'>
                <h3 className='mb-2 text-base font-medium'>
                  Thư ứng tuyển (Cover letter){' '}
                </h3>

                <FormField
                  control={form.control}
                  name='message'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-xs leading-5 font-normal text-[#7f878f]'>
                        Một thư ứng tuyển ngắn gọn, chỉn chu sẽ giúp bạn trở nên
                        chuyên nghiệp và gây ấn tượng hơn với nhà tuyển dụng.
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Viết thư ứng tuyển để thể hiện sự quan tâm và phù hợp với vị trí này...'
                          className='min-h-[100px] resize-none'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className='bg-muted/30 flex justify-end space-x-3 border-t px-6 py-4'>
              <Button
                type='button'
                variant='outline'
                onClick={() => onOpenChange(false)}
                className='min-w-[80px]'
              >
                Hủy
              </Button>
              <Button
                type='submit'
                className='bg-primary hover:bg-primary/80 min-w-[100px] text-white'
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className='animate-spin' />
                    Đang ứng tuyển
                  </>
                ) : (
                  'Ứng tuyển'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
