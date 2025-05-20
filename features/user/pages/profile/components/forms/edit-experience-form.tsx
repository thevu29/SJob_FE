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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  LocationType,
  EmployeeType,
  Experience
} from '@/interfaces/experience';
import {
  TExperience,
  TUpdateExperience,
  UpdateExperienceSchema
} from '@/features/user/schemas/experience.schema';
import { usePatch, usePut } from '@/hooks/useQueries';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { formatToYearMonth } from '@/lib/utils';

interface EditExperienceFormProps {
  experience: Experience;
  jobSeekerId: string;
  onClose: () => void;
}

export function EditExperienceForm({
  experience,
  jobSeekerId,
  onClose
}: EditExperienceFormProps) {
  const updateExperienceMutation = usePatch<Experience>(
    'experiences',
    {
      onSuccess: () => {
        toast.success('Cập nhật kinh nghiệm thành công');
      },
      onError: (error: AxiosError) => {
        toast.error(error?.message || 'Có lỗi xảy ra! Vui lòng thử lại!');
        console.error(error);
      }
    },
    ['experiences/job-seeker', jobSeekerId]
  );

  const form = useForm<TUpdateExperience>({
    resolver: zodResolver(UpdateExperienceSchema),
    defaultValues: {
      company: experience.company,
      position: experience.position,
      location: experience.location,
      locationType: experience.locationType,
      description: experience.description,
      employeeType: experience.employeeType,
      startDate: formatToYearMonth(experience.startDate),
      endDate: formatToYearMonth(experience.endDate)
    }
  });

  async function onSubmit(values: TUpdateExperience) {
    const payload = {
      ...values,
      id: experience.id
    };
    await updateExperienceMutation.mutateAsync(payload);
    onClose();
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Chỉnh sửa kinh nghiệm làm việc</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='mt-4 space-y-4'>
          <FormField
            control={form.control}
            name='company'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Công ty</FormLabel>
                <FormControl>
                  <Input placeholder='Tên công ty' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='position'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vị trí</FormLabel>
                <FormControl>
                  <Input placeholder='Vị trí công việc của bạn' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <FormField
              control={form.control}
              name='location'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Địa điểm</FormLabel>
                  <FormControl>
                    <Input placeholder='Thành phố, Quốc gia' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='locationType'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hình thức làm việc</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Chọn hình thức làm việc' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(LocationType).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='employeeType'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loại hình công việc</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Chọn loại hình công việc' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(EmployeeType).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

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
                      placeholder='Để trống nếu đang làm việc'
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
                    placeholder='Mô tả trách nhiệm và thành tựu của bạn'
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
