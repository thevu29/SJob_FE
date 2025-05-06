'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { X } from 'lucide-react';
import { SheetClose, SheetHeader, SheetTitle } from '@/components/ui/sheet';

const filterSchema = z.object({
  dateRange: z.string().optional(),
  location: z.string().optional(),
  level: z.string().optional(),
  field: z.string().optional(),
  industry: z.string().optional(),
  salaryFrom: z.string().optional(),
  salaryTo: z.string().optional(),
  language: z.string().optional(),
  languageLevel: z.string().optional(),
  education: z.string().optional(),
  experienceFrom: z.string().optional(),
  experienceTo: z.string().optional(),
  currentCity: z.string().optional(),
  district: z.string().optional(),
  gender: z.string().optional(),
  nationality: z.string().optional(),
  ageFrom: z.string().optional(),
  ageTo: z.string().optional()
});

type FilterValues = z.infer<typeof filterSchema>;

export default function FilterSidebar() {
  const [currency, setCurrency] = useState<'USD' | 'VND'>('USD');

  const form = useForm<FilterValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      dateRange: '',
      location: '',
      level: '',
      field: '',
      industry: '',
      salaryFrom: '',
      salaryTo: '',
      language: '',
      languageLevel: '',
      education: '',
      experienceFrom: '',
      experienceTo: '',
      currentCity: '',
      district: '',
      gender: 'any',
      nationality: '',
      ageFrom: '',
      ageTo: ''
    }
  });

  function onSubmit(data: FilterValues) {
    console.log(data);
  }

  return (
    <>
      <SheetHeader className='pb-4'>
        <SheetTitle>Bộ lọc</SheetTitle>
        <SheetClose className='ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none'>
          <X className='h-4 w-4' />
          <span className='sr-only'>Close</span>
        </SheetClose>
      </SheetHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 p-4'>
          <div className='space-y-4'>
            <h3 className='text-base font-medium'>
              Lọc theo công việc đang đăng tuyển
            </h3>
            <div className='space-y-2'>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder='Chọn công việc' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='job1'>Kỹ sư phần mềm</SelectItem>
                  <SelectItem value='job2'>Nhà thiết kế UI/UX</SelectItem>
                  <SelectItem value='job3'>Quản lý dự án</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className='space-y-4'>
            <h3 className='text-base font-medium'>Lần cuối cập nhật hồ sơ</h3>
            <div className='grid grid-cols-3 gap-2'>
              <Button type='button' variant='outline' className='justify-start'>
                Bất kỳ
              </Button>
              <Button type='button' variant='outline' className='justify-start'>
                Hôm nay
              </Button>
              <Button type='button' variant='outline' className='justify-start'>
                Hôm qua
              </Button>
              <Button type='button' variant='outline' className='justify-start'>
                3 Ngày trước
              </Button>
              <Button type='button' variant='outline' className='justify-start'>
                1 Tuần
              </Button>
              <Button type='button' variant='outline' className='justify-start'>
                2 Tuần
              </Button>
              <Button type='button' variant='outline' className='justify-start'>
                1 Tháng
              </Button>
              <Button type='button' variant='outline' className='justify-start'>
                2 Tháng
              </Button>
              <Button type='button' variant='outline' className='justify-start'>
                6 Tháng
              </Button>
              <Button type='button' variant='outline' className='justify-start'>
                12 Tháng
              </Button>
            </div>
          </div>

          <div className='space-y-4'>
            <h3 className='text-base font-medium'>Công việc mong muốn</h3>

            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='location'>Nơi làm việc</Label>
                <Select>
                  <SelectTrigger id='location'>
                    <SelectValue placeholder='Chọn địa điểm...' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='hanoi'>Hà Nội</SelectItem>
                    <SelectItem value='hcm'>Hồ Chí Minh</SelectItem>
                    <SelectItem value='danang'>Đà Nẵng</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='level'>Cấp bậc</Label>
                <Select>
                  <SelectTrigger id='level'>
                    <SelectValue placeholder='Bất kỳ' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='intern'>Thực tập sinh</SelectItem>
                    <SelectItem value='fresher'>Fresher</SelectItem>
                    <SelectItem value='junior'>Junior</SelectItem>
                    <SelectItem value='middle'>Middle</SelectItem>
                    <SelectItem value='senior'>Senior</SelectItem>
                    <SelectItem value='manager'>Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='field'>Lĩnh vực</Label>
                <Select>
                  <SelectTrigger id='field'>
                    <SelectValue placeholder='Chọn lĩnh vực' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='it'>Công nghệ thông tin</SelectItem>
                    <SelectItem value='marketing'>Marketing</SelectItem>
                    <SelectItem value='finance'>Tài chính</SelectItem>
                    <SelectItem value='education'>Giáo dục</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='industry'>Ngành nghề</Label>
                <Select>
                  <SelectTrigger id='industry'>
                    <SelectValue placeholder='Chọn ngành nghề' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='software'>Phần mềm</SelectItem>
                    <SelectItem value='hardware'>Phần cứng</SelectItem>
                    <SelectItem value='design'>Thiết kế</SelectItem>
                    <SelectItem value='management'>Quản lý</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <Label>Mức lương</Label>
                <div className='flex items-center space-x-1'>
                  <Button
                    type='button'
                    variant={currency === 'USD' ? 'default' : 'outline'}
                    size='sm'
                    onClick={() => setCurrency('USD')}
                    className='h-7 px-2 text-xs'
                  >
                    USD
                  </Button>
                  <Button
                    type='button'
                    variant={currency === 'VND' ? 'default' : 'outline'}
                    size='sm'
                    onClick={() => setCurrency('VND')}
                    className='h-7 px-2 text-xs'
                  >
                    VND
                  </Button>
                </div>
              </div>
              <div className='grid grid-cols-2 gap-2'>
                <FormField
                  control={form.control}
                  name='salaryFrom'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder='Từ' {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='salaryTo'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder='Đến' {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className='space-y-4'>
            <h3 className='text-base font-medium'>Thông tin cơ bản</h3>

            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='language'>Ngoại ngữ</Label>
                <Select>
                  <SelectTrigger id='language'>
                    <SelectValue placeholder='Bất kỳ' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='english'>Tiếng Anh</SelectItem>
                    <SelectItem value='japanese'>Tiếng Nhật</SelectItem>
                    <SelectItem value='korean'>Tiếng Hàn</SelectItem>
                    <SelectItem value='chinese'>Tiếng Trung</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='languageLevel'>Trình độ ngoại ngữ</Label>
                <Select>
                  <SelectTrigger id='languageLevel'>
                    <SelectValue placeholder='Bất kỳ' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='beginner'>Sơ cấp</SelectItem>
                    <SelectItem value='intermediate'>Trung cấp</SelectItem>
                    <SelectItem value='advanced'>Cao cấp</SelectItem>
                    <SelectItem value='fluent'>Thành thạo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='education'>Trình độ học vấn</Label>
                <Select>
                  <SelectTrigger id='education'>
                    <SelectValue placeholder='Bất kỳ' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='highschool'>Trung học</SelectItem>
                    <SelectItem value='college'>Cao đẳng</SelectItem>
                    <SelectItem value='university'>Đại học</SelectItem>
                    <SelectItem value='master'>Thạc sĩ</SelectItem>
                    <SelectItem value='phd'>Tiến sĩ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-2'>
                <Label>Số năm kinh nghiệm</Label>
                <div className='grid grid-cols-2 gap-2'>
                  <FormField
                    control={form.control}
                    name='experienceFrom'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder='Từ' {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='experienceTo'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder='Đến' {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='currentCity'>Nơi ở hiện tại</Label>
                <Select>
                  <SelectTrigger id='currentCity'>
                    <SelectValue placeholder='Chọn thành phố...' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='hanoi'>Hà Nội</SelectItem>
                    <SelectItem value='hcm'>Hồ Chí Minh</SelectItem>
                    <SelectItem value='danang'>Đà Nẵng</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='district'>Quận</Label>
                <Select>
                  <SelectTrigger id='district'>
                    <SelectValue placeholder='Chọn quận...' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='district1'>Quận 1</SelectItem>
                    <SelectItem value='district2'>Quận 2</SelectItem>
                    <SelectItem value='district3'>Quận 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='space-y-2'>
              <Label>Giới tính</Label>
              <RadioGroup
                defaultValue='any'
                className='flex items-center gap-4'
              >
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='any' id='gender-any' />
                  <Label htmlFor='gender-any'>Bất kỳ</Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='male' id='gender-male' />
                  <Label htmlFor='gender-male'>Nam</Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='female' id='gender-female' />
                  <Label htmlFor='gender-female'>Nữ</Label>
                </div>
              </RadioGroup>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='nationality'>Quốc tịch</Label>
              <Select>
                <SelectTrigger id='nationality'>
                  <SelectValue placeholder='Bất kỳ' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='vietnam'>Việt Nam</SelectItem>
                  <SelectItem value='other'>Khác</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label>Tuổi</Label>
              <div className='grid grid-cols-2 gap-2'>
                <FormField
                  control={form.control}
                  name='ageFrom'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder='Từ' {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='ageTo'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder='Đến' {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className='flex justify-between pt-4'>
            <Button type='button' variant='outline'>
              Cài đặt lại
            </Button>
            <Button type='submit'>Tìm kiếm</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
