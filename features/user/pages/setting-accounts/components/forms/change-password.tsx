'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
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
import { useGetCurrentUser, usePut } from '@/hooks';
import { IChangePasswordData, User } from '@/interfaces';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

const changePasswordFormSchema = z
  .object({
    currentPassword: z.string().nonempty({ message: 'Hãy nhập mật khẩu' }),
    // .min(1, { message: 'Mật khẩu hiện tại là bắt buộc' }),
    newPassword: z
      .string()
      .nonempty({ message: 'Hãy nhập mật khẩu' })
      .min(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự' }),
    confirmPassword: z
      .string()
      .nonempty({ message: 'Hãy nhập mật khẩu' })
      .min(8, { message: 'Mật khẩu phải có ít nhất 8 kí tự' })
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword']
  });

interface ChangePasswordProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChangePassword({ open, onOpenChange }: ChangePasswordProps) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { data: user } = useGetCurrentUser();

  const changePasswordMutation = usePut<User, IChangePasswordData>(
    'users/change-password',
    {
      onSuccess: () => {
        toast.success('Thay đổi mật khẩu thành công');
      },
      onError: (error: AxiosError) => {
        toast.error(error?.message || 'Có lỗi xảy ra! Vui lòng thử lại!');
      }
    }
    // ['admins']
  );

  const form = useForm<z.infer<typeof changePasswordFormSchema>>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  });

  async function onSubmit(values: z.infer<typeof changePasswordFormSchema>) {
    if (changePasswordMutation.isPending) return;
    if (user && user.data) {
      const payload: IChangePasswordData = {
        email: user.data.email,
        currentPassword: values.currentPassword,
        newPassword: values.newPassword
      };
      await changePasswordMutation.mutateAsync(payload);
      onOpenChange(false);
      form.reset();
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thay đổi mật khẩu</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='currentPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span className='text-red-500'>*</span>
                    Mật khẩu hiện tại
                  </FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        type={showCurrentPassword ? 'text' : 'password'}
                        {...field}
                      />
                      <Button
                        type='button'
                        variant='ghost'
                        size='icon'
                        className='absolute top-0 right-0 h-full px-3'
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                      >
                        {showCurrentPassword ? (
                          <EyeOff className='h-4 w-4' />
                        ) : (
                          <Eye className='h-4 w-4' />
                        )}
                      </Button>
                    </div>
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
                  <FormLabel>
                    <span className='text-red-500'>*</span>
                    Mật khẩu mới
                  </FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        type={showNewPassword ? 'text' : 'password'}
                        {...field}
                      />
                      <Button
                        type='button'
                        variant='ghost'
                        size='icon'
                        className='absolute top-0 right-0 h-full px-3'
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <EyeOff className='h-4 w-4' />
                        ) : (
                          <Eye className='h-4 w-4' />
                        )}
                      </Button>
                    </div>
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
                  <FormLabel>
                    <span className='text-red-500'>*</span>
                    Xác nhận mật khẩu mới
                  </FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        {...field}
                      />
                      <Button
                        type='button'
                        variant='ghost'
                        size='icon'
                        className='absolute top-0 right-0 h-full px-3'
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className='h-4 w-4' />
                        ) : (
                          <Eye className='h-4 w-4' />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-end gap-2'>
              <Button
                type='button'
                variant='outline'
                onClick={() => onOpenChange(false)}
              >
                Hủy
              </Button>
              <Button type='submit' disabled={changePasswordMutation.isPending}>
                {changePasswordMutation.isPending && (
                  <Loader2 className='animate-spin' />
                )}
                Lưu
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
