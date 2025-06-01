'use client';

import { z } from 'zod';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { usePut } from '@/hooks';
import type { IResetPasswordData, User } from '@/interfaces';
import { useForgotPassword } from '@/context/forgot-password-context';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { PasswordInput } from '@/components/common/password-input';

const resetPasswordFormSchema = z
  .object({
    password: z
      .string()
      .nonempty({ message: 'Vui lòng nhập mật khẩu' })
      .min(8, { message: 'Mật khẩu phải có ít nhất 8 kí tự' }),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu không khớp',
    path: ['confirmPassword']
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordFormSchema>;

export function ResetPasswordForm() {
  const router = useRouter();
  const { email, clearEmail } = useForgotPassword();

  const resetPasswordForm = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    },
    mode: 'onChange'
  });

  const { mutate: resetPassword, isPending } = usePut<User, IResetPasswordData>(
    '/users/update-password',
    {
      onSuccess: () => {
        clearEmail();
        toast.success('Đặt lại mật khẩu thành công. Vui lòng đăng nhập lại');
        router.push('/login');
      },
      onError: (error) => {
        toast.error(error?.message || 'Có lỗi xảy ra! Vui lòng thử lại!');
      }
    },
    [],
    {
      isPublic: true
    }
  );

  const onSubmit = (data: ResetPasswordFormData) => {
    if (!email) {
      toast.error('Vui lòng nhập email để đặt lại mật khẩu');
      router.push('/send-otp');
      return;
    }

    resetPassword({
      email,
      password: data.password
    });
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 p-4 sm:p-6 md:p-8'>
      <Card className='mx-auto w-full max-w-md shadow-lg'>
        <CardHeader className='space-y-1 sm:space-y-2'>
          <CardTitle className='text-lg sm:text-xl'>Tạo lại mật khẩu</CardTitle>
          <CardDescription className='text-sm sm:text-base'>
            Nhập mật khẩu mới
          </CardDescription>
        </CardHeader>
        <CardContent className='px-4 sm:px-6'>
          <Form {...resetPasswordForm}>
            <form onSubmit={resetPasswordForm.handleSubmit(onSubmit)}>
              <div className='grid gap-6'>
                <FormField
                  name='password'
                  control={resetPasswordForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mật khẩu</FormLabel>
                      <FormControl>
                        <PasswordInput {...field} placeholder='Nhập mật khẩu' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name='confirmPassword'
                  control={resetPasswordForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Xác nhận mật khẩu</FormLabel>
                      <FormControl>
                        <PasswordInput {...field} placeholder='Nhập mật khẩu' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type='submit'
                  className='h-10 w-full cursor-pointer text-sm sm:h-11 sm:text-base'
                  disabled={isPending}
                >
                  {isPending && <Loader2 className='animate-spin' />}
                  Lưu
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
