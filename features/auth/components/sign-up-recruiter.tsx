'use client';

import Link from 'next/link';
import { z } from 'zod';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'nextjs-toploader/app';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAuthToken, useGetPublic, usePost } from '@/hooks';
import type { IRecruiterSignUpData, Field, Recruiter } from '@/interfaces';
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
import { Combobox } from '@/components/common/combobox';
import { PasswordInput } from '@/components/common/password-input';

const signUpRecruiterSchema = z
  .object({
    name: z.string().nonempty('Hãy nhập tên công ty'),
    email: z.string().email({ message: 'Email không hợp lệ' }),
    phone: z.string({ required_error: 'Hãy nhập số điện thoại' }).min(10, {
      message: 'Số điện thoại phải có ít nhất 10 kí tự'
    }),
    website: z
      .string()
      .url({ message: 'Địa chỉ website không hợp lệ' })
      .optional(),
    address: z.string({ required_error: 'Hãy nhập địa chỉ công ty' }),
    fieldId: z.string({ required_error: 'Hãy chọn lĩnh vực công ty' }),
    password: z
      .string({ required_error: 'Hãy nhập mật khẩu' })
      .min(8, { message: 'Mật khẩu phải có ít nhất 8 kí tự' }),
    confirmPassword: z
      .string({ required_error: 'Hãy xác nhận mật khẩu' })
      .min(8, { message: 'Mật khẩu phải có ít nhất 8 kí tự' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu không trùng khớp',
    path: ['confirmPassword']
  });

type FormData = z.infer<typeof signUpRecruiterSchema>;

export function SignUpRecruiterForm() {
  const router = useRouter();

  const { getAccessToken } = useAuthToken();
  const accessToken = getAccessToken();

  const { data: fields } = useGetPublic<Field[]>('/fields', ['fields']);

  const { mutate: signUp, isPending } = usePost<
    Recruiter,
    IRecruiterSignUpData
  >(
    '/auth/register/recruiter',
    {
      onSuccess: async (response) => {
        if (response) {
          toast.success(
            'Tạo tài khoản thành công. Vui lòng chờ xét duyệt từ quản trị viên'
          );

          router.push('/');
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
    resolver: zodResolver(signUpRecruiterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    mode: 'onChange'
  });

  const onSubmit = (data: FormData) => signUp(data);

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
        <div className='grid grid-cols-2 gap-6'>
          <div className='grid gap-4'>
            <FormField
              name='name'
              control={formMethods.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Công ty
                    <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder='Nhập tên công ty' {...field} />
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
                  <FormLabel>
                    Email<span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder='Nhập email công ty' {...field} />
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
                  <FormLabel>
                    Mật khẩu<span className='text-red-500'>*</span>
                  </FormLabel>
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
                  <FormLabel>
                    Xác nhận mật khẩu<span className='text-red-500'>*</span>
                  </FormLabel>
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
          </div>
          <div className='grid gap-4'>
            <FormField
              name='phone'
              control={formMethods.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Số điện thoại<span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Nhập số điện thoại công ty'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='website'
              control={formMethods.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder='Nhập website công ty' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='address'
              control={formMethods.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Địa chỉ<span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder='Nhập địa chỉ công ty' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='fieldId'
              control={formMethods.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Lĩnh vực<span className='text-red-500'>*</span>
                  </FormLabel>
                  <Combobox
                    options={
                      fields?.data?.map((field) => ({
                        value: field.id,
                        label: field.name
                      })) ?? []
                    }
                    field={field}
                    placeholder='Chọn lĩnh vực công ty'
                    className='col-span-5 sm:col-span-4 sm:!h-9 sm:text-sm'
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className='w-full text-right'>
          <Button type='submit' className='cursor-pointer' disabled={isPending}>
            {isPending && <Loader2 className='animate-spin' />}
            Đăng ký
          </Button>
        </div>
        <div className='text-right text-sm'>
          Đã có tài khoản?{' '}
          <Link
            href='/login'
            className='text-primary underline underline-offset-4'
          >
            Đăng nhập
          </Link>
        </div>
      </form>
    </Form>
  );
}
