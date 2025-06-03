'use client';

import Link from 'next/link';
import { z } from 'zod';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'nextjs-toploader/app';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAuthToken, usePost } from '@/hooks';
import type { IJobSeekerSignUpData, JobSeeker } from '@/interfaces';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PasswordInput } from '@/components/common/password-input';

import { GoogleLoginButton } from './google-login-button';

const signUpSchema = z
  .object({
    name: z.string().nonempty({ message: 'Hãy nhập họ tên' }),
    email: z.string().email({ message: 'Email không hợp lệ' }),
    password: z
      .string()
      .nonempty({ message: 'Hãy nhập mật khẩu' })
      .min(8, { message: 'Mật khẩu phải có ít nhất 8 kí tự' }),
    confirmPassword: z
      .string()
      .nonempty({ message: 'Hãy nhập mật khẩu' })
      .min(8, { message: 'Mật khẩu phải có ít nhất 8 kí tự' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu không trùng khớp',
    path: ['confirmPassword']
  });

type FormData = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const router = useRouter();

  const { getAccessToken } = useAuthToken();
  const accessToken = getAccessToken();

  const { mutate: signUp, isPending } = usePost<
    JobSeeker,
    IJobSeekerSignUpData
  >(
    '/auth/register/job-seeker',
    {
      onSuccess: async (response) => {
        if (response) {
          toast.success(
            'Tạo tài khoản thành công. Vui lòng đăng nhập để tiếp tục!'
          );

          router.push('/login');
        }
      },
      onError: (error) => {
        toast.error(error.message || 'Đã có lỗi xảy ra. Vui lòng thử lại sau!');
      }
    },
    [],
    {
      isPublic: true
    }
  );

  const formMethods = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    mode: 'onChange'
  });

  const onSubmit = (data: FormData) => {
    signUp({
      name: data.name,
      email: data.email,
      password: data.password
    });
  };

  useEffect(() => {
    if (accessToken) {
      router.push('/');
    }
  }, [accessToken, router]);

  return (
    <Form {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(onSubmit)}
        className='flex flex-col gap-6'
      >
        <div className='grid gap-4'>
          <FormField
            name='name'
            control={formMethods.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Họ tên</FormLabel>
                <FormControl>
                  <Input placeholder='Nhập họ tên của bạn' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='email'
            control={formMethods.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='Nhập email của bạn' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='password'
            control={formMethods.control}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Mật khẩu</FormLabel>
                <FormControl>
                  <PasswordInput
                    {...field}
                    placeholder='Nhập mật khẩu'
                    error={!!fieldState.error}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='confirmPassword'
            control={formMethods.control}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Xác nhận mật khẩu</FormLabel>
                <FormControl>
                  <PasswordInput
                    {...field}
                    placeholder='Nhập lại mật khẩu'
                    error={!!fieldState.error}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            className='w-full cursor-pointer'
            disabled={isPending}
          >
            {isPending && <Loader2 className='animate-spin' />}
            Đăng ký
          </Button>
          <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
            <span className='bg-background text-muted-foreground relative z-10 px-2'>
              Hoặc
            </span>
          </div>
          <GoogleLoginButton />
        </div>
        <div className='text-center text-sm'>
          Đã có tài khoản?{' '}
          <Link
            href='/login'
            className='text-primary underline underline-offset-4'
          >
            Đăng nhập
          </Link>
        </div>
        <div className='text-center text-sm'>
          Bạn là nhà tuyển dụng?{' '}
          <Link
            href='/sign-up/recruiter'
            className='text-primary underline underline-offset-4'
          >
            Đăng ký ngay tại đây
          </Link>
        </div>
      </form>
    </Form>
  );
}
