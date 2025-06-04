'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { JobSeeker } from '@/interfaces';
import {
  TUpdateJobSeekerSchema,
  UpdateJobSeekerSchema
} from '@/features/user/schemas/job-seeker.schema';
import { useState } from 'react';

interface EditGeneralInfoFormProps {
  jobSeeker: JobSeeker;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

export function EditGeneralInfoForm({
  jobSeeker,
  onSubmit,
  onCancel
}: EditGeneralInfoFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const previewImage = file ? URL.createObjectURL(file) : jobSeeker.image;

  const form = useForm<TUpdateJobSeekerSchema>({
    resolver: zodResolver(UpdateJobSeekerSchema),
    defaultValues: {
      name: jobSeeker.name || '',
      field: jobSeeker.field || '',
      phone: jobSeeker.phone || '',
      image: '',
      gender: jobSeeker.gender || false,
      address: jobSeeker.address || '',
      about: jobSeeker.about || '',
    }
  });

  function handleSubmit(values: TUpdateJobSeekerSchema) {
    const { image, ...restValues } = values;

    const payload = {
      ...restValues,
      id: jobSeeker.id,
      updatedAt: new Date().toISOString(),
      ...(file && { imageFile: file })
    };

    onSubmit(payload);
    setFile(null);
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Chỉnh sửa hồ sơ</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='mt-4 space-y-4'
        >
          <div className='mb-4 flex items-center gap-4'>
            <FormField
              control={form.control}
              name='image'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <Avatar className='h-20 w-20'>
                    <AvatarImage src={previewImage} alt='Profile' />
                    <AvatarFallback>
                      {form
                        .getValues('name')
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <FormControl>
                    <Input
                      type='file'
                      accept='image/*'
                      className='hidden'
                      id='profile-image'
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          // and get a URL back
                          field.onChange(file);
                          setFile(file);
                        }
                      }}
                    />
                  </FormControl>
                  <Button
                    type='button'
                    variant='outline'
                    size='sm'
                    onClick={() =>
                      document.getElementById('profile-image')?.click()
                    }
                  >
                    Thay đổi ảnh
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='grid grid-cols-1 gap-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ và tên</FormLabel>
                  <FormControl>
                    <Input placeholder='Nhập họ và tên của bạn' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <FormField
              control={form.control}
              name='gender'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giới tính</FormLabel>
                  <Select
                    onValueChange={(val) => field.onChange(val === 'true')}
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Chọn giới tính' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='true'>Nam</SelectItem>
                      <SelectItem value='false'>Nữ</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số điện thoại</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Nhập số điện thoại của bạn'
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
            name='field'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ngành nghề</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Nhập ngành nghề của bạn'
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
              <FormItem>
                <FormLabel>Địa chỉ</FormLabel>
                <FormControl>
                  <Input placeholder='Nhập địa chỉ của bạn' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='about'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giới thiệu</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Giới thiệu về bản thân'
                    className='min-h-[100px]'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex justify-end gap-2 pt-4'>
            <Button type='button' variant='outline' onClick={onCancel}>
              Hủy
            </Button>
            <Button type='submit'>Lưu thay đổi</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
