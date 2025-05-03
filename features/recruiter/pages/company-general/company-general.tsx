'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
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
import { ImageIcon } from 'lucide-react';
import {
  TUpdateRecruiter,
  UpdateRecruiterSchema
} from '@/features/recruiter/schemas/recruiter.schema';

// const formSchema = z.object({
//   companyName: z.string().min(2, {
//     message: 'Tên công ty phải có ít nhất 2 ký tự.'
//   }),
//   phone: z.string().min(10, {
//     message: 'Số điện thoại không hợp lệ.'
//   }),
//   address: z.string().min(5, {
//     message: 'Địa chỉ công ty phải có ít nhất 5 ký tự.'
//   }),
//   website: z.string().min(5, {
//     message: 'website công ty phải có ít nhất 5 ký tự.'
//   }),
//   industry: z.string({
//     required_error: 'Vui lòng chọn lĩnh vực công ty.'
//   }),
//   scale: z.string().optional(),
//   description: z.string().max(10000, {
//     message: 'Mô tả không được vượt quá 10000 ký tự.'
//   })
// });

export function CompanyGeneral() {
  const form = useForm<TUpdateRecruiter>({
    resolver: zodResolver(UpdateRecruiterSchema),
    defaultValues: {
      fieldId: '',
      name: '',
      about: '',
      image: null,
      website: '',
      address: '',
      members: 1,
      status: false
    }
  });

  function onSubmit(values: TUpdateRecruiter) {
    console.log(values);
  }

  return (
    <div className='bg-card rounded-md shadow-sm'>
      <div className='border-b p-4 md:p-6'>
        <h1 className='text-xl font-medium'>Thông Tin Công Ty</h1>
      </div>

      <div className='p-4 md:p-6'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='space-y-2'>
                  <FormLabel className='flex items-center font-medium'>
                    Tên Công Ty <span className='text-destructive ml-1'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Giải pháp phần mềm cho doanh nghiệp'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              

              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem className='space-y-2'>
                    <FormLabel className='flex items-center font-medium'>
                      Điện Thoại{' '}
                      <span className='text-destructive ml-1'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder='0793857312' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div> */}

            <FormField
              control={form.control}
              name='address'
              render={({ field }) => (
                <FormItem className='space-y-2'>
                  <div className='flex flex-wrap items-center'>
                    <FormLabel className='font-medium'>
                      Địa Chỉ Công Ty
                    </FormLabel>
                    <span className='text-muted-foreground ml-2 text-sm'>
                      (Không Bắt Buộc)
                    </span>
                  </div>
                  <FormControl>
                    <Input
                      placeholder='Ví dụ: 130 Đường Nguyễn Anh, Phường Bến Thành, Quận 1'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='website'
              render={({ field }) => (
                <FormItem className='space-y-2'>
                  <div className='flex flex-wrap items-center'>
                    <FormLabel className='font-medium'>
                      Website Công Ty
                    </FormLabel>
                    <span className='text-muted-foreground ml-2 text-sm'>
                      (Không Bắt Buộc)
                    </span>
                  </div>
                  <FormControl>
                    <Input placeholder='sjob.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='fieldId'
                render={({ field }) => (
                  <FormItem className='space-y-2'>
                    <FormLabel className='flex items-center font-medium'>
                      Lĩnh Vực Công Ty{' '}
                      <span className='text-destructive ml-1'>*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={String(field.value)}
                    >
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Thương mại điện tử' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='ecommerce'>
                          Thương mại điện tử
                        </SelectItem>
                        <SelectItem value='software'>Phần mềm</SelectItem>
                        <SelectItem value='finance'>
                          Tài chính / Ngân hàng
                        </SelectItem>
                        <SelectItem value='education'>Giáo dục</SelectItem>
                        <SelectItem value='healthcare'>Y tế</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='members'
                render={({ field }) => (
                  <FormItem className='space-y-2'>
                    <FormLabel className='font-medium'>
                      Quy Mô Công Ty
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={String(field.value)}
                    >
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Vui lòng chọn' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='small'>Dưới 50 nhân viên</SelectItem>
                        <SelectItem value='medium'>50-200 nhân viên</SelectItem>
                        <SelectItem value='large'>
                          Trên 200 nhân viên
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='about'
              render={({ field }) => (
                <FormItem className='space-y-2'>
                  <FormLabel className='font-medium'>
                    Sơ Lược Về Công Ty
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Sơ lược về công ty của bạn...'
                      className='min-h-[120px]'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className='text-right text-xs'>
                    Bạn còn có thể nhập 10000 ký tự
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='space-y-2'>
              <div className='font-medium'>Logo Công Ty</div>
              <div className='rounded-md border border-dashed p-4 text-center md:p-6'>
                <div className='flex flex-col items-center justify-center gap-2'>
                  <div className='text-muted-foreground flex flex-wrap items-center justify-center gap-1 text-sm'>
                    <ImageIcon className='h-4 w-4' />
                    <span>Kéo Và Thả Hình Ảnh Ở Đây</span>
                    <span className='text-accent-foreground'>
                      Hoặc Chọn File
                    </span>
                  </div>
                  <div className='text-muted-foreground text-center text-xs'>
                    (Tập tin với phần mở rộng .jpg .jpeg .png .gif và kích thước{' '}
                    {'<'}5MB)
                  </div>
                </div>
              </div>
            </div>

            <div className='flex justify-end pt-4'>
              <Button
                type='submit'
                className='bg-primary hover:bg-primary/90 w-full sm:w-auto'
              >
                Lưu
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
