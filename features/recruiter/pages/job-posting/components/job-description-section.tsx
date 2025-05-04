'use client';

import { Trash, MapPin, AlertTriangle } from 'lucide-react';
import type { UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RichTextEditor } from '@/features/recruiter/components/common/rich-text-editor';
export function JobDescriptionSection({ form }: { form: UseFormReturn<any> }) {
  return (
    <div className='space-y-6 p-2'>
      <FormField
        control={form.control}
        name='jobTitle'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-base font-medium'>
              Chức danh<span className='text-destructive'>*</span>
            </FormLabel>
            <FormControl>
              <Input
                placeholder='Chuyên Viên Kiểm Thử Và Vận Hành Phần Mềm (Tester)'
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <FormField
          control={form.control}
          name='positionLevel'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-base font-medium'>
                Cấp bậc<span className='text-destructive'>*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Nhân viên' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='intern'>Thực tập sinh</SelectItem>
                  <SelectItem value='staff'>Nhân viên</SelectItem>
                  <SelectItem value='senior'>Nhân viên cao cấp</SelectItem>
                  <SelectItem value='manager'>Quản lý</SelectItem>
                  <SelectItem value='director'>Giám đốc</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='workType'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-base font-medium'>
                Loại việc làm
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Toàn thời gian' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='full-time'>Toàn thời gian</SelectItem>
                  <SelectItem value='part-time'>Bán thời gian</SelectItem>
                  <SelectItem value='contract'>Hợp đồng</SelectItem>
                  <SelectItem value='freelance'>Freelance</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name='industry'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-base font-medium'>
              Ngành nghề chủ lực<span className='text-destructive'>*</span>
            </FormLabel>
            <div className='grid grid-cols-1'>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Phần Cứng Máy Tính' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='it-hardware'>
                    Phần Cứng Máy Tính
                  </SelectItem>
                  <SelectItem value='it-software'>Phần Mềm</SelectItem>
                  <SelectItem value='it-network'>Mạng & Hệ thống</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='jobNature'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-base font-medium'>
              Lĩnh vực công việc<span className='text-destructive'>*</span>
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Cung cấp phần lực' />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value='hardware-supply'>
                  Cung cấp phần lực
                </SelectItem>
                <SelectItem value='software-dev'>
                  Phát triển phần mềm
                </SelectItem>
                <SelectItem value='testing'>Kiểm thử</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='workLocation'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-base font-medium'>
              Địa điểm làm việc<span className='text-destructive'>*</span>
              <span className='text-muted-foreground ml-2 text-xs'>
                (Tối đa 3 địa điểm)
              </span>
            </FormLabel>
            <div className='relative'>
              <FormControl>
                <div className='flex'>
                  <div className='relative flex-1'>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className='w-full pl-9'>
                        <SelectValue placeholder='Office: Hà Nội, Vietnam' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='hanoi'>
                          Office: Hà Nội, Vietnam
                        </SelectItem>
                        <SelectItem value='hcm'>
                          Office: Hồ Chí Minh, Vietnam
                        </SelectItem>
                        <SelectItem value='danang'>
                          Office: Đà Nẵng, Vietnam
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <div className='pointer-events-none absolute top-1/2 left-3 -translate-y-1/2'>
                      <MapPin className='text-muted-foreground h-4 w-4' />
                    </div>
                  </div>
                  <Button variant='ghost' size='icon' className='ml-2'>
                    <span className='sr-only'>Xóa địa điểm</span>
                    <Trash className='text-muted-foreground h-4 w-4' />
                  </Button>
                </div>
              </FormControl>
            </div>
            <Button
              variant='link'
              size='sm'
              className='text-primary mt-2 h-auto'
            >
              <span className='text-sm'>+ Thêm địa điểm làm việc</span>
            </Button>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='jobDescription'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-base font-medium'>
              Mô tả<span className='text-destructive'>*</span>
            </FormLabel>
            <FormControl>
              <RichTextEditor
                value={field.value || ''}
                onChange={field.onChange}
                placeholder='Nhập mô tả công việc'
                initialContent={`- Viết test case và thực hiện test manual hoặc automation theo chức năng phần mềm của Tập đoàn
- Tham gia vào quá trình phân tích chức năng, phát triển tính năng của hệ thống phần mềm
- Hỗ trợ người dùng về các vấn đề liên quan đến hệ thống phần mềm
- Các công việc khác theo phân công của quản lý`}
              />
            </FormControl>
            <div className='text-muted-foreground mt-1 flex justify-between text-xs'>
              <span>Xem mẫu mô tả công việc khác</span>
              <span>0/4500 ký tự</span>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='jobRequirements'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-base font-medium'>
              Yêu cầu công việc<span className='text-destructive'>*</span>
            </FormLabel>
            <FormControl>
              <RichTextEditor
                value={field.value || ''}
                onChange={field.onChange}
                placeholder='Nhập yêu cầu công việc'
                initialContent={`- Tốt nghiệp các chuyên ngành có liên quan
- Có kinh nghiệm ít nhất 2 năm với vị trí Tester
- Có thể giao tiếp tiếng Anh cơ bản
- Kỹ năng giao tiếp, quản lý công việc và làm việc nhóm tốt
- Ưu tiên ứng viên có kinh nghiệm
- Thích nghi với môi trường làm việc nhanh, cạnh tranh tính thử thách`}
              />
            </FormControl>
            <div className='text-muted-foreground mt-1 flex justify-between text-xs'>
              <span>Xem mẫu yêu cầu công việc khác</span>
              <span>0/2744/4000 ký tự</span>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='salary'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-base font-medium'>
              Mức lương<span className='text-destructive'>*</span>{' '}
              <span className='text-muted-foreground text-xs'>(USD)</span>
            </FormLabel>
            <div className='grid grid-cols-2 items-center gap-4'>
              <Input type='number' placeholder='1000' />
              <div className='flex items-center gap-2'>
                <Input type='number' placeholder='1500' />
                <FormField
                  control={form.control}
                  name='showSalary'
                  render={({ field }) => (
                    <FormItem className='flex items-center space-y-0 space-x-2'>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className='text-muted-foreground text-xs'>
                        Hiển thị cho Ứng Viên
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Alert
              variant='default'
              className='bg-warning/10 text-warning-foreground border-warning/50 mt-4'
            >
              <AlertTriangle className='h-4 w-4' />
              <AlertDescription className='text-xs'>
                Ấn mức lương có thể làm giảm lượng hồ sơ ứng tuyển hồ sơ ứng
                tuyển đến 30%.
              </AlertDescription>
            </Alert>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className='space-y-6 p-2'>
        <FormField
          control={form.control}
          name='positions'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-base font-medium'>
                Số lượng tuyển dụng
              </FormLabel>
              <div className='flex items-center justify-between'>
                <div className='flex'>
                  <Button
                    type='button'
                    variant='outline'
                    size='icon'
                    className='h-9 w-9 rounded-r-none'
                    onClick={() => field.onChange(Math.max(1, field.value - 1))}
                  >
                    -
                  </Button>
                  <Input
                    type='number'
                    className='h-9 w-16 rounded-none text-center'
                    value={field.value}
                    onChange={(e) =>
                      field.onChange(Number.parseInt(e.target.value) || 1)
                    }
                    min={1}
                  />
                  <Button
                    type='button'
                    variant='outline'
                    size='icon'
                    className='h-9 w-9 rounded-l-none'
                    onClick={() => field.onChange(field.value + 1)}
                  >
                    +
                  </Button>
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name='showPositions'
                    render={({ field }) => (
                      <FormItem className='ml-4 flex items-center space-y-0 space-x-2'>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className='text-muted-foreground text-xs'>
                          Hiển thị cho Ứng Viên
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='recruiterEmail'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-base font-medium'>
                Địa chỉ email nhận hồ sơ
                <span className='text-destructive'>*</span>
              </FormLabel>
              <FormControl>
                <Input type='email' {...field} />
              </FormControl>
              <p className='text-muted-foreground mt-1 text-xs'>
                (Địa chỉ email sẽ được ẩn với người tìm việc. Bạn có thể nhập
                nhiều địa chỉ cách nhau bởi dấu "," )
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='experienceYears'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-base font-medium'>
                Năm kinh nghiệm tối thiểu
              </FormLabel>
              <div className='flex items-center gap-4'>
                <div className='flex items-center'>
                  <Button
                    type='button'
                    variant='outline'
                    size='icon'
                    className='h-9 w-9 rounded-r-none'
                    onClick={() => field.onChange(Math.max(0, field.value - 1))}
                  >
                    -
                  </Button>
                  <Input
                    type='number'
                    className='h-9 w-16 rounded-none text-center'
                    value={field.value}
                    onChange={(e) =>
                      field.onChange(Number.parseInt(e.target.value) || 0)
                    }
                    min={0}
                  />
                  <Button
                    type='button'
                    variant='outline'
                    size='icon'
                    className='h-9 w-9 rounded-l-none'
                    onClick={() => field.onChange(field.value + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
