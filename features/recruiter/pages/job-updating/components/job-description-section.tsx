'use client';

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
import { RichTextEditor } from '@/features/recruiter/components/common/rich-text-editor';
import { TUpdateJob } from '@/features/recruiter/schemas/job.schema';
import { useGet } from '@/hooks/use-queries';
import { FieldDetail } from '@/interfaces/field';
import { JobType } from '@/interfaces/job';
import { Combobox } from '@/components/common/combobox';
import MyTooltip from '@/features/recruiter/components/common/tooltip';
import { InputFieldWithType } from '@/features/recruiter/components/common/input-field-with-type';

interface JobDescriptionSectionProps {
  form: UseFormReturn<TUpdateJob>;
}

const ExperienceTooltipContent = () => (
  <div className='w-full space-y-2 text-sm'>
    <div>
      <strong>[≤]:</strong> Dưới X năm kinh nghiệm (VD: ≤2 = dưới 2 năm)
    </div>
    <div>
      <strong>[≥]:</strong> Ít nhất X năm kinh nghiệm (VD: ≥3 = ít nhất 3 năm)
    </div>
    <div>
      <strong>[=]:</strong> Đúng X năm kinh nghiệm (VD: =5 = đúng 5 năm) (VD: =0
      = Không yêu cầu kinh nghiệm)
    </div>
    <div>
      <strong>[x-y]:</strong> Từ X đến Y năm kinh nghiệm (VD: 2-5 = từ 2 đến 5
      năm)
    </div>
  </div>
);

const SalaryTooltipContent = () => (
  <div className='w-full space-y-2 text-sm'>
    <div>
      <strong>≤:</strong> Dưới X triệu đồng (VD: ≤10 = dưới 10 triệu)
    </div>
    <div>
      <strong>≥:</strong> Ít nhất X triệu đồng (VD: ≥15 = trên 15 triệu)
    </div>
    <div>
      <strong>=:</strong> Đúng X triệu đồng (VD: =20 = đúng 20 triệu) (VD: =0 =
      Thỏa thuận)
    </div>
    <div>
      <strong>x-y:</strong> Từ X đến Y triệu đồng (VD: 10-20 = từ 10 đến 20
      triệu)
    </div>
  </div>
);
const DeadlineTooltipContent = () => (
  <div className='w-full space-y-2 text-sm'>
    Hạn nộp hồ sơ phải là một ngày trong tương lai
  </div>
);

export function JobDescriptionSection({ form }: JobDescriptionSectionProps) {
  const { data: fieldDetailsData } = useGet<FieldDetail[]>('field-details', [
    'field-details'
  ]);

  return (
    <div className='space-y-6 p-2'>
      <FormField
        control={form.control}
        name='name'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-base font-medium'>
              Chức danh<span className='text-destructive'>*</span>
            </FormLabel>
            <FormControl>
              <Input
                placeholder='Chuyên Viên Kiểm Thử Và Vận Hành Phần Mềm (Tester)'
                value={field.value}
                onChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <FormField
          control={form.control}
          name='education'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-base font-medium'>
                Trình độ học vấn
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Cử nhân' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='Trung học phổ thông'>
                    Trung học phổ thông
                  </SelectItem>
                  <SelectItem value='Cao đẳng'>Cao đẳng</SelectItem>
                  <SelectItem value='Cử nhân'>Cử nhân</SelectItem>
                  <SelectItem value='Thạc sĩ'>Thạc sĩ</SelectItem>
                  <SelectItem value='Tiến sĩ'>Tiến sĩ</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='type'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-base font-medium'>
                Loại việc làm
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Toàn thời gian' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(JobType).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <FormField
          control={form.control}
          name='slots'
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
                    onClick={() =>
                      field.onChange(Math.max(1, (field.value ?? 1) - 1))
                    }
                  >
                    -
                  </Button>
                  <Input
                    type='number'
                    className='h-9 w-16 rounded-none text-center'
                    value={field.value || 1}
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
                    onClick={() => field.onChange((field.value ?? 1) + 1)}
                  >
                    +
                  </Button>
                </div>
                <div></div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='deadline'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-base font-medium'>
                Hạn nộp hồ sơ<span className='text-destructive'>*</span>
                <MyTooltip>
                  <DeadlineTooltipContent />
                </MyTooltip>
              </FormLabel>
              <FormControl>
                <Input type='date' {...field} className='w-full' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name='experience'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-base font-medium'>
              Kinh nghiệm yêu cầu<span className='text-destructive'>*</span>
              <MyTooltip>
                <ExperienceTooltipContent />
              </MyTooltip>
            </FormLabel>
            <div className='grid grid-cols-1 items-center gap-4'>
              <InputFieldWithType
                name='experience'
                control={form.control}
                value={field.value}
              />
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='fieldDetails'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-base font-medium'>
              Ngành nghề chi tiết<span className='text-destructive'>*</span>
            </FormLabel>
            <Combobox
              options={
                fieldDetailsData?.data?.map((fieldDetail) => ({
                  value: fieldDetail.id,
                  label: fieldDetail.name
                })) ?? []
              }
              field={field}
              placeholder='Chọn ngành nghề chi tiết việc làm'
              className='col-span-5 sm:col-span-4 sm:!h-9 sm:text-sm'
            />
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
              Mức lương mong muốn<span className='text-destructive'>*</span>{' '}
              <MyTooltip>
                <SalaryTooltipContent />
              </MyTooltip>
            </FormLabel>
            <div className='grid grid-cols-1 items-center gap-4'>
              <InputFieldWithType
                name='salary'
                control={form.control}
                value={field.value}
              />
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='description'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-base font-medium'>
              Mô tả công việc<span className='text-destructive'>*</span>
            </FormLabel>
            <FormControl>
              <RichTextEditor
                value={field.value || ''}
                onChange={field.onChange}
                placeholder='- Tham gia vào quá trình phân tích chức năng, phát triển tính năng của hệ thống phần mềm'
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='requirement'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-base font-medium'>
              Yêu cầu công việc<span className='text-destructive'>*</span>
            </FormLabel>
            <FormControl>
              <RichTextEditor
                value={field.value || ''}
                onChange={field.onChange}
                placeholder='- Có kinh nghiệm ít nhất 2 năm với vị trí Tester'
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='benefit'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-base font-medium'>
              Quyền lợi được hưởng<span className='text-destructive'>*</span>
            </FormLabel>
            <FormControl>
              <RichTextEditor
                value={field.value || ''}
                onChange={field.onChange}
                placeholder='- Được đóng BHXH, BHYT, BHTN theo quy định'
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
