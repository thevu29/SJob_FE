'use client';

import Link from 'next/link';
import { z } from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Loader2, Mail } from 'lucide-react';


import { usePost } from '@/hooks';
import type { ISendOtpData } from '@/interfaces';
import { useForgotPassword } from '@/context/forgot-password-context';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const sendOtpFormSchema = z.object({
  email: z.string().email('Email không hợp lệ').nonempty('Vui lòng nhập email')
});

type SendOtpFormData = z.infer<typeof sendOtpFormSchema>;

export function SendOtpForm() {
  const router = useRouter();
  const { setEmail } = useForgotPassword();

  const form = useForm<SendOtpFormData>({
    resolver: zodResolver(sendOtpFormSchema),
    defaultValues: {
      email: ''
    },
    mode: 'onChange'
  });

  const { mutate: sendOtp, isPending } = usePost<string, ISendOtpData>(
    '/auth/send-otp',
    {
      onSuccess: (response) => {
        if (response) {
          const email = form.getValues('email');
          setEmail(email);
          toast.success('Mã OTP đã được gửi đến email của bạn');
          router.push('/verify-otp');
        }
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

  const onSubmit = (data: SendOtpFormData) => {
    sendOtp({ email: data.email });
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 p-4 sm:p-6 md:p-8'>
      <Card className='mx-auto w-full max-w-md shadow-lg'>
        <CardHeader className='space-y-1 sm:space-y-2'>
          <div className='flex items-center'>
            <Link href='/login' className='mr-2'>
              <Button
                variant='ghost'
                size='icon'
                className='h-8 w-8 cursor-pointer'
              >
                <ArrowLeft className='h-4 w-4' />
              </Button>
            </Link>
            <div>
              <CardTitle className='text-lg sm:text-xl'>
                Quên mật khẩu
              </CardTitle>
              <CardDescription className='text-sm sm:text-base'>
                Nhập email của bạn để nhận mã OTP và đặt lại mật khẩu.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className='px-4 sm:px-6'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='grid gap-4 sm:gap-6'>
                <div className='grid gap-2'>
                  <FormField
                    name='email'
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-sm sm:text-base'>
                          Email
                        </FormLabel>
                        <div className='relative'>
                          <Mail className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400' />
                          <FormControl>
                            <Input
                              {...field}
                              placeholder='Nhập email'
                              className='h-10 pl-9 text-sm sm:h-11 sm:text-base'
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type='submit'
                  className='h-10 w-full cursor-pointer text-sm sm:h-11 sm:text-base'
                  disabled={isPending}
                >
                  {isPending && <Loader2 className='animate-spin' />}
                  Gửi mã OTP
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className='flex flex-col space-y-4 px-4 sm:px-6'>
          <div className='w-full text-center text-xs sm:text-sm'>
            Bạn đã nhớ ra mật khẩu?{' '}
            <Link
              href='/login'
              className='text-primary font-medium underline underline-offset-4'
            >
              Đăng nhập ngay
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
