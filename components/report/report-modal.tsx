'use client';

import { z } from 'zod';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { formatBytes } from '@/lib/utils';
import type { ICreateReportData } from '@/interfaces';
import { usePostFormData } from '@/hooks';
import { MAX_FILE_SIZE } from '@/constants';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
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

type ReportedUser = 'jobSeeker' | 'recruiter';

interface ReportModalProps {
  reportdUser: ReportedUser;
  reportedId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const reportSchema = z.object({
  message: z.string().min(1, 'Vui lòng nhập nội dung báo cáo'),
  reason: z.string().min(1, 'Vui lòng nhập lý do báo cáo'),
  evidenceFile: z
    .instanceof(File, { message: 'Vui lòng tải lên ảnh bằng chứng' })
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: `File quá lớn. Vui lòng chọn file có kích thước nhỏ hơn ${formatBytes(
        MAX_FILE_SIZE
      )}.`
    })
    .refine((file) => !file || file.type !== 'iamge/', {
      message: 'Vui lòng tải lên  hình ảnh hợp lệ (jpg, png, gif, webp)'
    })
});

type ReportFormData = z.infer<typeof reportSchema>;

export function ReportModal({
  reportdUser,
  reportedId,
  open,
  onOpenChange
}: ReportModalProps) {
  const form = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      message: '',
      reason: '',
      evidenceFile: undefined
    }
  });

  const { mutate: report, isPending } = usePostFormData<
    Report,
    ICreateReportData
  >('reports', {
    onSuccess: () => {
      toast.success('Báo cáo đã được gửi thành công');
    },
    onError: (error: AxiosError) => {
      toast.error(error?.message || 'Có lỗi xảy ra! Vui lòng thử lại!');
    }
  });

  const handleCloseModal = () => {
    if (isPending) return;

    form.reset();
    onOpenChange(false);
  };

  const onSubmit = (data: ReportFormData) => {
    const payload: ICreateReportData = {
      ...data
    };

    if (reportdUser === 'jobSeeker') {
      payload.jobSeekerId = reportedId;
    } else {
      payload.recruiterId = reportedId;
    }

    report(payload);
    handleCloseModal();
  };

  return (
    <Dialog open={open} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Báo cáo vi phạm</DialogTitle>
          <DialogDescription>
            Vui lòng cung cấp thông tin chi tiết về vi phạm để chúng tôi có thể
            xử lý kịp thời.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='mt-4 space-y-4'
          >
            <FormField
              control={form.control}
              name='message'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nội dung</FormLabel>
                  <FormControl>
                    <Input placeholder='Nhập nội dung' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='reason'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lý do</FormLabel>
                  <FormControl>
                    <Input placeholder='Nhập lý do' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='evidenceFile'
              render={({ field: { onChange, name, ...field } }) => (
                <FormItem>
                  <FormLabel>Tải lên bằng chứng</FormLabel>
                  <FormControl>
                    <Input
                      name={name}
                      type='file'
                      accept='image/*'
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        onChange(file);
                      }}
                      onBlur={field.onBlur}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-end gap-2 pt-4'>
              <Button
                type='button'
                variant='outline'
                onClick={handleCloseModal}
              >
                Hủy
              </Button>
              <Button type='submit'>Gửi</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
