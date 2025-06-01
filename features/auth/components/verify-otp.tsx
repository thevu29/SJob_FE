'use client';

import Link from 'next/link';
import { z } from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Loader2, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { usePost } from '@/hooks';
import { useForgotPassword } from '@/context/forgot-password-context';
import type { IVerifyOtpData, User, ISendOtpData } from '@/interfaces';
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button';

const verifyOtpFormSchema = z.object({
  otp: z
    .string()
    .length(6, 'Mã OTP phải có 6 chữ số')
    .regex(/^\d+$/, 'Mã OTP chỉ chứa chữ số')
});

type VerifyOtpFormData = z.infer<typeof verifyOtpFormSchema>;

export function VerifyOtpForm() {
  const router = useRouter();
  const { email } = useForgotPassword();

  const form = useForm<VerifyOtpFormData>({
    resolver: zodResolver(verifyOtpFormSchema),
    defaultValues: {
      otp: ''
    },
    mode: 'onChange'
  });

  const { mutate: sendOtp, isPending: isSending } = usePost<
    string,
    ISendOtpData
  >(
    '/auth/send-otp',
    {
      onSuccess: (response) => {
        if (response) {
          toast.success('Mã OTP đã được gửi đến email của bạn');
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

  const { mutate: verifyOtp, isPending: isVerifying } = usePost<
    User,
    IVerifyOtpData
  >(
    '/users/verify-otp',
    {
      onSuccess: () => {
        toast.success('Xác minh OTP thành công');
        router.push('/reset-password');
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

  const handleRequireEmail = () => {
    toast.error('Vui lòng nhập email để gửi mã OTP');
    router.push('/send-otp');
  };

  const onSubmit = (data: VerifyOtpFormData) => {
    if (!email) {
      handleRequireEmail();
      return;
    }

    verifyOtp({
      email,
      otp: data.otp
    });
  };

  const handleResendOtp = () => {
    if (!email) {
      handleRequireEmail();
      return;
    }

    sendOtp({ email });
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 p-4 sm:p-6 md:p-8'>
      <Card className='mx-auto w-full max-w-md shadow-lg'>
        <CardHeader className='space-y-1 sm:space-y-2'>
          <div className='flex items-center'>
            <div className='mr-2'>
              <Link href='/send-otp'>
                <Button
                  variant='ghost'
                  size='icon'
                  className='h-8 w-8 cursor-pointer'
                >
                  <ArrowLeft className='h-4 w-4' />
                </Button>
              </Link>
            </div>
            <div>
              <CardTitle className='text-lg sm:text-xl'>Xác minh OTP</CardTitle>
              <CardDescription className='text-sm sm:text-base'>
                Nhập mã OTP đã được gửi đến email của bạn để xác minh tài khoản.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className='px-4 sm:px-6'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='grid gap-6'>
                <div className='mx-auto flex items-center justify-center'>
                  <Shield className='text-primary h-10 w-10 sm:h-12 sm:w-12' />
                </div>

                <div className='grid gap-2'>
                  <FormField
                    name='otp'
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-sm sm:text-base'>
                          Nhập mã OTP
                        </FormLabel>
                        <FormControl>
                          <InputOTP pattern='[0-9]*' maxLength={6} {...field}>
                            <InputOTPGroup className='w-full'>
                              {[...Array(6)].map((_, index) => (
                                <InputOTPSlot
                                  key={index}
                                  className='h-[40px] flex-1'
                                  index={index}
                                />
                              ))}
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <p className='mt-2 text-xs text-gray-500 sm:text-sm'>
                    Không nhận được mã?{' '}
                    <Button
                      type='button'
                      variant='link'
                      onClick={handleResendOtp}
                      className='text-primary cursor-pointer p-0 font-medium'
                      disabled={isSending || isVerifying}
                    >
                      Gửi lại
                    </Button>
                  </p>
                </div>

                <Button
                  type='submit'
                  className='h-10 w-full cursor-pointer text-sm sm:h-11 sm:text-base'
                  disabled={isSending || isVerifying}
                >
                  {isVerifying && <Loader2 className='animate-spin' />}
                  Xác minh
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className='flex flex-col space-y-4 px-4 sm:px-6'>
          <div className='w-full text-center text-xs sm:text-sm'>
            <Link
              href='/login'
              className='text-primary font-medium underline underline-offset-4'
            >
              Quay lại đăng nhập
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
