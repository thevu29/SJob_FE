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
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  CreateCertificationSchema,
  TCreateCertification
} from '@/features/user/schemas/certification.schema';
import { usePost, usePostFormData } from '@/hooks/use-queries';
import { Certification } from '@/interfaces/certification';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { useState } from 'react';

interface AddCertificationFormProps {
  jobSeekerId: string;
  onClose: () => void;
}

export function AddCertificationForm({
  jobSeekerId,
  onClose
}: AddCertificationFormProps) {
  const [file, setFile] = useState<File | null>(null);

  const createCertificationMutation = usePostFormData<Certification>(
    'certifications',
    {
      onSuccess: () => {
        toast.success('Thêm mới chứng chỉ thành công');
      },
      onError: (error: AxiosError) => {
        toast.error(error?.message || 'Có lỗi xảy ra! Vui lòng thử lại!');
      }
    },
    ['certifications/job-seeker', jobSeekerId]
  );
  const form = useForm<TCreateCertification>({
    resolver: zodResolver(CreateCertificationSchema),
    defaultValues: {
      name: '',
      issueDate: '',
      expireDate: '',
      imageOrFile: ''
    }
  });

  async function onSubmit(values: TCreateCertification) {
    const { imageOrFile, ...rest } = values;
    const payload = {
      ...rest,
      jobSeekerId: jobSeekerId,
      ...(file && { file: file })
    };
    await createCertificationMutation.mutateAsync(payload as any);
    setFile(null);
    onClose();
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Thêm chứng chỉ</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='mt-4 space-y-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên chứng chỉ</FormLabel>
                <FormControl>
                  <Input placeholder='Tên chứng chỉ' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <FormField
              control={form.control}
              name='issueDate'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ngày cấp</FormLabel>
                  <FormControl>
                    <Input type='month' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='expireDate'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ngày hết hạn</FormLabel>
                  <FormControl>
                    <Input
                      type='month'
                      {...field}
                      placeholder='Để trống nếu không có hạn'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='imageOrFile'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tải lên chứng chỉ</FormLabel>
                <FormControl>
                  <Input
                    type='file'
                    accept='image/*'
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        // In a real app, you would upload the file to a server
                        // and get a URL back
                        // field.onChange(URL.createObjectURL(file));
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
