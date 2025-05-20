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
import { Certification } from '@/interfaces/certification';
import { DialogHeader } from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import {
  TUpdateCertification,
  UpdateCertificationSchema
} from '@/features/user/schemas/certification.schema';
import { usePatchFormData } from '@/hooks/useQueries';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { formatToYearMonth } from '@/lib/utils';
import { useState } from 'react';
import placeholder from '@/public/placeholder.jpg';
import Image from 'next/image';

interface EditCertificationFormProps {
  certification: Certification;
  jobSeekerId: string;
  onClose: () => void;
}

export function EditCertificationForm({
  certification,
  jobSeekerId,
  onClose
}: EditCertificationFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const previewImage = file
    ? URL.createObjectURL(file)
    : certification.imageOrFile;

  const updateCertificationMutation = usePatchFormData<Certification>(
    'certifications',
    {
      onSuccess: () => {
        toast.success('Cập nhật chứng chỉ thành công');
      },
      onError: (error: AxiosError) => {
        toast.error(error?.message || 'Có lỗi xảy ra! Vui lòng thử lại!');
      }
    },
    ['certifications/job-seeker', jobSeekerId]
  );

  const form = useForm<TUpdateCertification>({
    resolver: zodResolver(UpdateCertificationSchema),
    defaultValues: {
      name: certification.name,
      issueDate: formatToYearMonth(certification.issueDate),
      expireDate: formatToYearMonth(certification.expireDate),
      imageOrFile: '' // certification.imageOrFile
    }
  });

  async function onSubmit(values: TUpdateCertification) {
    const { imageOrFile, ...rest } = values;
    const payload = {
      ...rest,
      id: certification.id,
      ...(file && { file: file })
    };
    await updateCertificationMutation.mutateAsync(payload);
    onClose();
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Chỉnh sửa chứng chỉ</DialogTitle>
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
                {previewImage && (
                  <div className='mb-2'>
                    <Image
                      src={previewImage}
                      width={48}
                      height={48}
                      alt='Xem trước chứng chỉ'
                      className='max-h-40 rounded border'
                    />
                  </div>
                )}
                <FormControl>
                  <Input
                    type='file'
                    accept='image/*'
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
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
