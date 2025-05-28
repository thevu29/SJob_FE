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
import { Textarea } from '@/components/ui/textarea';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Education } from '@/interfaces/education';
import {
  TUpdateEducation,
  UpdateEducationSchema
} from '@/features/user/schemas/education.schema';
import { formatToYearMonth } from '@/lib/utils';
import { usePatch } from '@/hooks/use-queries';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

interface EditEducationFormProps {
  education: Education;
  jobSeekerId: string;
  onClose: () => void;
}

export function EditEducationForm({
  education,
  jobSeekerId,
  onClose
}: EditEducationFormProps) {
  const updateEducationMutation = usePatch<Education>(
    'educations',
    {
      onSuccess: () => {
        toast.success('Cập nhật học vấn thành công');
      },
      onError: (error: AxiosError) => {
        toast.error(error?.message || 'Có lỗi xảy ra! Vui lòng thử lại!');
      }
    },
    ['educations/job-seeker', jobSeekerId]
  );

  const form = useForm<TUpdateEducation>({
    resolver: zodResolver(UpdateEducationSchema),
    defaultValues: {
      school: education.school,
      major: education.major,
      degree: education.degree,
      description: education.description || '',
      startDate: formatToYearMonth(education.startDate),
      endDate: formatToYearMonth(education.endDate)
    }
  });

  async function onSubmit(values: TUpdateEducation) {
    const payload = {
      ...values,
      id: education.id
    };
    await updateEducationMutation.mutateAsync(payload);
    onClose();
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Chỉnh sửa học vấn</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='mt-4 space-y-4'>
          <FormField
            control={form.control}
            name='school'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trường học</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Tên trường đại học hoặc cao đẳng'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <FormField
              control={form.control}
              name='major'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chuyên ngành</FormLabel>
                  <FormControl>
                    <Input placeholder='Chuyên ngành của bạn' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='degree'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bằng cấp</FormLabel>
                  <FormControl>
                    <Input placeholder='Cử nhân, Thạc sĩ, v.v.' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <FormField
              control={form.control}
              name='startDate'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ngày bắt đầu</FormLabel>
                  <FormControl>
                    <Input type='month' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='endDate'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ngày kết thúc</FormLabel>
                  <FormControl>
                    <Input
                      type='month'
                      {...field}
                      placeholder='Để trống nếu đang học'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mô tả</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Mô tả về quá trình học tập, thành tích, v.v.'
                    className='min-h-[100px]'
                    {...field}
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
