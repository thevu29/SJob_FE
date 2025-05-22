'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Resume } from '@/interfaces/resume';
import {
  TUpdateResume,
  UpdateResumeSchema
} from '@/features/user/schemas/resume.schema';
import { usePatchFormData } from '@/hooks/useQueries';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';

interface EditResumeFormProps {
  resume: Resume;
  jobSeekerId: string;
  onClose: () => void;
}

export function EditResumeForm({
  resume,
  jobSeekerId,
  onClose
}: EditResumeFormProps) {
  const [file, setFile] = useState<File | null>(null);

  const updateResumeMutation = usePatchFormData<Resume>(
    'resumes',
    {
      onSuccess: () => {
        toast.success('Cập nhật chứng chỉ thành công');
      },
      onError: (error: AxiosError) => {
        toast.error(error?.message || 'Có lỗi xảy ra! Vui lòng thử lại!');
      }
    },
    ['resumes/job-seeker', jobSeekerId]
  );
  const form = useForm<TUpdateResume>({
    resolver: zodResolver(UpdateResumeSchema),
    defaultValues: {
      name: resume.name,
      file: '',
      main: resume.main
    }
  });

  async function onSubmit(values: TUpdateResume) {
    const { file: fileOriginal, ...rest } = values;
    const payload: any = {
      ...rest,
      id: resume.id
    };
    if (file) {
      payload.file = file;
    }

    await updateResumeMutation.mutateAsync(payload);
    onClose();
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Chỉnh sửa hồ sơ</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='mt-4 space-y-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên hồ sơ</FormLabel>
                <FormControl>
                  <Input placeholder='Nhập tên cho hồ sơ này' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='file'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tải lên hồ sơ</FormLabel>
                <FormControl>
                  <Input
                    type='file'
                    accept='.pdf'
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        field.onChange(file);
                        setFile(file);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='main'
            render={({ field }) => (
              <FormItem className='flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4'>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className='space-y-1 leading-none'>
                  <FormLabel>Đặt làm hồ sơ chính</FormLabel>
                  <p className='text-muted-foreground text-sm'>
                    Hồ sơ này sẽ được sử dụng làm hồ sơ mặc định khi ứng tuyển
                    công việc
                  </p>
                </div>
              </FormItem>
            )}
          />

          <div className='flex justify-end gap-2 pt-4'>
            <Button type='button' variant='outline' onClick={onClose}>
              Hủy
            </Button>
            <Button type='submit'>Lưu</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
