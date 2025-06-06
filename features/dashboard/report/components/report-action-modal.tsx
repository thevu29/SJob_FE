import { z } from 'zod';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { usePut } from '@/hooks';
import { ReportStatus } from '@/constants/enums';
import type { IUpdateReportData, Report } from '@/interfaces';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { SelectDropdown } from '@/components/common/select-dropdown';

interface ReportActionModalProps {
  currentReport?: Report;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const reportSchema = z.object({
  status: z.nativeEnum(ReportStatus)
});

type ReportFormData = z.infer<typeof reportSchema>;

export function ReportActionModal({
  currentReport,
  open,
  onOpenChange
}: ReportActionModalProps) {
  const isUpdate = !!currentReport;

  const form = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema),
    defaultValues: isUpdate
      ? {
          ...currentReport
        }
      : {
          status: ReportStatus.PENDING
        }
  });

  const handleCloseModal = () => {
    if (isPending) return;

    form.reset();
    onOpenChange(false);
  };

  const handleOnSuccess = () => {
    const action = isUpdate ? 'Cập nhật' : 'Thêm';
    toast.success(`${action} báo cáo thành công`);
    form.reset();
    onOpenChange(false);
  };

  const { mutate: updateReport, isPending } = usePut<Report, IUpdateReportData>(
    `/reports/${currentReport?.id}`,
    {
      onSuccess: handleOnSuccess,
      onError: (error: AxiosError) => {
        toast.error(error?.message || 'Có lỗi xảy ra. Vui lòng thử lại');
      }
    },
    ['reports']
  );

  const onSubmit = (data: ReportFormData) => {
    updateReport(data);
  };

  return (
    <Dialog open={open} onOpenChange={handleCloseModal}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-left'>
          <DialogTitle>Cập nhật báo cáo</DialogTitle>
          <DialogDescription>
            Nhấn lưu để cập nhật báo cáo này.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id='report-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4 p-0.5'
          >
            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem className='grid grid-cols-7 items-center space-y-0 gap-x-4 gap-y-1 sm:grid-cols-5'>
                  <FormLabel className='col-span-2 text-right sm:col-span-1'>
                    Tình trạng
                  </FormLabel>
                  <SelectDropdown
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    placeholder='Chọn tình trạng'
                    className='col-span-4 w-full'
                    items={Object.values(ReportStatus).map((level) => ({
                      label: level,
                      value: level
                    }))}
                  />
                  <FormMessage className='col-span-5 col-start-3 sm:col-span-4 sm:col-start-2' />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button type='submit' form='report-form' disabled={isPending}>
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
