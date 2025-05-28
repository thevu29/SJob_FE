'use client';

import * as z from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';

import type { User } from '@/interfaces';
import { usePost } from '@/hooks/use-queries';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { PasswordInput } from '@/components/common/password-input';

const formSchema = z
  .object({
    email: z.string().email('Email không hợp lệ'),
    password: z.string().min(8, 'Mật khẩu tối thiểu 8 kí tự').max(100),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu không khớp',
    path: ['confirmPassword']
  });

type FormSchema = z.infer<typeof formSchema>;

export default function AdminForm() {
  const router = useRouter();

  const defaultValues = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    values: defaultValues,
    mode: 'onChange'
  });

  const createAdminMutation = usePost<
    User,
    Omit<FormSchema, 'confirmPassword'> & { role: string }
  >(
    'users',
    {
      onSuccess: () => {
        toast.success('Tạo admin thành công');
        form.reset();

        router.push('/dashboard/admin');
      },
      onError: (error: AxiosError) => {
        toast.error(error?.message || 'Có lỗi xảy ra! Vui lòng thử lại!');
        console.error('Failed to create admin:', error);
      }
    },
    ['admins']
  );

  const onSubmit = (data: FormSchema) => {
    const { confirmPassword: _, ...rest } = data;
    const payload = { ...rest, role: 'admin' };

    createAdminMutation.mutate(payload);
  };

  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>
          Tạo admin mới
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='Nhập email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='mt-4 grid grid-cols-1 gap-6 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder='Nhập mật khẩu' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Nhập lại mật khẩu</FormLabel>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        placeholder='Xác nhận mật khẩu'
                        error={!!fieldState.error}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='text-right'>
              <Button className='cursor-pointer' type='submit'>
                Xác nhận
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
