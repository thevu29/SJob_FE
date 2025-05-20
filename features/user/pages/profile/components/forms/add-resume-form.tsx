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
import {
  CreateResumeSchema,
  TCreateResume
} from '@/features/user/schemas/resume.schema';
import { useMemo, useState } from 'react';
import { Resume } from '@/interfaces/resume';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { usePostFormData } from '@/hooks/useQueries';

interface AddResumeFormProps {
  jobSeekerId: string;
  onClose: () => void;
}

export function AddResumeForm({ onClose, jobSeekerId }: AddResumeFormProps) {
  const [file, setFile] = useState<File | null>(null);

  const fileName = useMemo(() => {
    if (!file) return '';
    return file.name;
  }, [file]);

  const createResumeMutation = usePostFormData<Resume>(
    'resumes',
    {
      onSuccess: () => {
        toast.success('Thêm mới hồ sơ thành công');
      },
      onError: (error: AxiosError) => {
        toast.error(error?.message || 'Có lỗi xảy ra! Vui lòng thử lại!');
      }
    },
    ['resumes/job-seeker', jobSeekerId]
  );
  const form = useForm<TCreateResume>({
    resolver: zodResolver(CreateResumeSchema),
    defaultValues: {
      name: '',
      file: '',
      main: false
    }
  });

  async function onSubmit(values: TCreateResume) {
    const payload = {
      ...values,
      name: fileName,
      jobSeekerId: jobSeekerId
    };
    console.log('payload', payload);
    await createResumeMutation.mutateAsync(payload as any);
    setFile(null);
    onClose();
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Thêm hồ sơ</DialogTitle>
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
                  <Input
                    placeholder='Tên hồ sơ hiển thị cho nhà tuyển dụng'
                    disabled={true}
                    {...field}
                    value={fileName}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
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
