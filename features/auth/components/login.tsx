'use client';

import Link from 'next/link';
import { z } from 'zod';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'nextjs-toploader/app';
import { zodResolver } from '@hookform/resolvers/zod';

import { getRole } from '@/lib/helpers';
import { usePost, useAuthToken } from '@/hooks';
import { QueryKeys, UserRole } from '@/constants/enums';
import type { IAuthResponse, ICustomJwtPayload } from '@/interfaces';
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

const loginSchema = z.object({
  email: z.string().email({ message: 'Email không hợp lệ' }),
  password: z.string().nonempty({ message: 'Mật khẩu là bắt buộc' })
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();

  const { getAccessToken, setTokens } = useAuthToken();
  const accessToken = getAccessToken();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange'
  });

  const { mutate: login, isPending } = usePost<IAuthResponse, LoginFormData>(
    '/auth/login',
    {
      onSuccess: async (response) => {
        if (response) {
          const data = response.data;
          const { access_token, refresh_token } = data;

          setTokens(access_token, refresh_token);

          const decodedToken = jwtDecode<ICustomJwtPayload>(access_token);

          const role = getRole(decodedToken.realm_access.roles);

          if (role === UserRole.ADMIN) {
            router.push('/admin');
          } else {
            router.push('/');
          }

          toast.success('Đăng nhập thành công!');
        }
      },
      onError: (error) => {
        toast.error(error?.message || 'Có lỗi xảy ra! Vui lòng thử lại!');
      }
    },
    [QueryKeys.CURRENT_USER],
    {
      isPublic: true
    }
  );

  const onSubmit = (data: LoginFormData) => login(data);

  useEffect(() => {
    if (accessToken && !isPending) {
      const decodedToken = jwtDecode<ICustomJwtPayload>(accessToken);

      const role = getRole(decodedToken.realm_access.roles);

      if (role === UserRole.ADMIN) {
        router.push('/admin');
      } else {
        router.push('/');
      }
    }
  }, [accessToken, isPending, router]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-6'
      >
        <div className='grid gap-6'>
          <FormField
            name='email'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Nhập email' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='password'
            control={form.control}
            render={({ field, fieldState }) => (
              <FormItem>
                <div className='flex items-center'>
                  <FormLabel>Mật khẩu</FormLabel>
                  <Link
                    href='/forgot-password'
                    className='text-primary ml-auto text-sm underline-offset-4 hover:underline'
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
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
          <Button
            type='submit'
            className='w-full cursor-pointer'
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className='animate-spin' />
                Đăng nhập
              </>
            ) : (
              'Đăng nhập'
            )}
          </Button>{' '}
          <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
            <span className='bg-background text-muted-foreground relative z-10 px-2'>
              Hoặc
            </span>
          </div>
          <GoogleLoginButton />
        </div>
        <div className='text-center text-sm'>
          Chưa có tài khoản?{' '}
          <Link
            href='/signup'
            className='text-primary underline underline-offset-4'
          >
            Đăng ký ngay
          </Link>
        </div>
      </form>
    </Form>
  );
}
