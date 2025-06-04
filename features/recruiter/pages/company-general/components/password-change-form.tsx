'use client';

import { useState } from 'react';
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
import { AlertCircle } from 'lucide-react';

const formSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: 'Vui lòng nhập mật khẩu hiện tại' }),
    newPassword: z
      .string()
      .min(8, { message: 'Mật khẩu mới phải có ít nhất 8 ký tự' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Vui lòng xác nhận mật khẩu mới' })
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword']
  });

interface PasswordChangeFormProps {
  onCancel: () => void;
}

export function PasswordChangeForm({ onCancel }: PasswordChangeFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onCancel(); // Close form after successful submission
    }, 1000);
  }

  return (
    <div className='bg-card mt-4 rounded-md p-4 shadow-sm md:p-6'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='currentPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='flex items-center font-medium'>
                  Mật Khẩu Hiện Tại{' '}
                  <span className='text-destructive ml-1'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Nhập vào mật khẩu truy cập hiện tại'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='newPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='flex items-center font-medium'>
                  Mật Khẩu Mới <span className='text-destructive ml-1'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Nhập mật khẩu truy cập mới'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='flex items-center font-medium'>
                  Xác Nhận Mật Khẩu Mới{' '}
                  <span className='text-destructive ml-1'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Nhập lại mật khẩu truy cập mới'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='text-muted-foreground mt-2 flex items-center gap-2 text-sm'>
            <AlertCircle className='h-4 w-4' />
            <p>
              Mật mã tại VietnamWorks luôn được mã hóa và bảo mật tuyệt đối.
            </p>
          </div>

          <div className='flex justify-end gap-2 pt-4'>
            <Button
              type='button'
              variant='outline'
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Hủy
            </Button>
            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting ? 'Đang lưu...' : 'Lưu'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
