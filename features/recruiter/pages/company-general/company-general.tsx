'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
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
import { ImageIcon } from 'lucide-react';
import {
  TUpdateRecruiter,
  UpdateRecruiterSchema
} from '@/features/recruiter/schemas/recruiter.schema';
import { useGet, usePutFormData } from '@/hooks/use-queries';
import { Recruiter } from '@/interfaces';
import { useEffect, useMemo, useState } from 'react';
import { Field } from '@/interfaces/field';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import Image from 'next/image';

export function CompanyGeneral() {
  const recruiterId = '68144e36647b71355acf11d1';

  const [file, setFile] = useState<File | null>(null);
  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : '';
  }, [file]);

  const { data: recruiterData } = useGet<Recruiter>(
    'recruiters/' + recruiterId,
    ['recruiters', recruiterId]
  );
  const { data: fieldsData } = useGet<Field[]>('fields', ['fields']);

  const fields = fieldsData?.data || [];
  const recruiter = recruiterData?.data;

  const updateRecruiterMutation = usePutFormData<Recruiter, TUpdateRecruiter>(
    'recruiters',
    {
      onSuccess: () => {
        toast.success('Cập nhật thông tin công ty thành công!');
      },
      onError: (error: AxiosError) => {
        toast.error(error?.message || 'Có lỗi xảy ra! Vui lòng thử lại!');
        console.error(error);
      }
    },
    ['recruiters', recruiterId]
  );

  const form = useForm<TUpdateRecruiter>({
    resolver: zodResolver(UpdateRecruiterSchema),
    values: recruiter || {
      fieldId: '',
      name: '',
      about: '',
      image: null,
      website: '',
      address: '',
      members: 0
    }
  });

  const onSubmit = async (values: TUpdateRecruiter) => {
    try {
      // Remove the existing image from values
      const { image, ...restValues } = values;

      const payload = {
        ...restValues,
        id: recruiterId,
        ...(file && { image: file }) // Only add image if there's a new file
      };
      await updateRecruiterMutation.mutateAsync(payload);
      setFile(null);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className='bg-card rounded-md shadow-sm'>
      <div className='border-b p-4 md:p-6'>
        <h1 className='text-xl font-medium'>Thông Tin Công Ty</h1>
      </div>

      <div className='p-4 md:p-6'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='space-y-2'>
                  <FormLabel className='flex items-center font-medium'>
                    Tên Công Ty
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Giải pháp phần mềm cho doanh nghiệp'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='address'
              render={({ field }) => (
                <FormItem className='space-y-2'>
                  <div className='flex flex-wrap items-center'>
                    <FormLabel className='font-medium'>
                      Địa Chỉ Công Ty
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Input
                      placeholder='Ví dụ: 130 Đường Nguyễn Anh, Phường Bến Thành, Quận 1'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='website'
              render={({ field }) => (
                <FormItem className='space-y-2'>
                  <div className='flex flex-wrap items-center'>
                    <FormLabel className='font-medium'>
                      Website Công Ty
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Input placeholder='sjob.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='fieldId'
                render={({ field }) => (
                  <FormItem className='space-y-2'>
                    <FormLabel className='flex items-center font-medium'>
                      Lĩnh Vực Công Ty{' '}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Thương mại điện tử' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {fields.map((field) => (
                          <SelectItem key={field.id} value={field.id}>
                            {field.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='members'
                render={({ field }) => (
                  <FormItem className='space-y-2'>
                    <FormLabel className='font-medium'>
                      Quy Mô Công Ty
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='Nhập số lượng nhân viên'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='about'
              render={({ field }) => (
                <FormItem className='space-y-2'>
                  <FormLabel className='font-medium'>
                    Sơ Lược Về Công Ty
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Sơ lược về công ty của bạn...'
                      className='min-h-[120px]'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='image'
              render={({ field }) => (
                <FormItem className='space-y-2'>
                  <FormLabel className='font-medium'>Logo Công Ty</FormLabel>
                  <FormControl>
                    <div className='md-border-l mx-auto flex justify-center md:w-72 md:border-l-gray-200'>
                      <div className='flex flex-col items-center'>
                        <div className='my-5 h-24 w-24'>
                          {previewImage || field.value ? (
                            <Image
                              src={previewImage || field.value}
                              alt='Logo'
                              width={96}
                              height={96}
                              className='h-full w-full rounded-full object-cover'
                            />
                          ) : (
                            <div className='flex h-full w-full items-center justify-center rounded-full border-2 border-dashed border-gray-300'>
                              <ImageIcon className='h-8 w-8 text-gray-400' />
                            </div>
                          )}
                        </div>

                        <Input
                          type='file'
                          accept='.jpg,.jpeg,.png,.gif'
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            field.onChange(file);
                            setFile(file);
                          }}
                        />
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription className='text-muted-foreground mx-auto text-sm'>
                    Vui lòng chọn tập tin với phần mở rộng .jpg .jpeg .png .gif
                    và kích thước {'<'}5MB
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex justify-end pt-4'>
              <Button
                type='submit'
                className='bg-primary hover:bg-primary/90 w-full sm:w-auto'
              >
                {updateRecruiterMutation.isPending ? 'Đang lưu...' : 'Lưu'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
