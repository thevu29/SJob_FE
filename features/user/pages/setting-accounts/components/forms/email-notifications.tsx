'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { useGet, useGetCurrentUser, usePut } from '@/hooks';
import {
  IUpdateNotificationPreferencesData,
  NotificationPreferences
} from '@/interfaces/notification';
import {
  TUpdateNotificationPreferencesSchema,
  UpdateNotificationPreferencesSchema
} from '@/features/user/schemas/notification.schema';
import { useEffect } from 'react';
import { DialogDescription } from '@radix-ui/react-dialog';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { Loader2 } from 'lucide-react';

interface EmailNotificationsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EmailNotifications({
  open,
  onOpenChange
}: EmailNotificationsProps) {
  const { data: user } = useGetCurrentUser();
  const userId = user?.data && 'userId' in user.data ? user.data.userId : '';
  const { data: preferences, refetch } = useGet<NotificationPreferences>(
    `notification-preferences/${userId}`,
    ['notification-preferences', userId],
    undefined,
    { enabled: !!userId }
  );
  const updateNotificationPreferencesMutation = usePut<
    NotificationPreferences,
    IUpdateNotificationPreferencesData & { id: string }
  >(
    'notification-preferences',
    {
      onSuccess: () => {
        toast.success('Cập nhật cài đặt thông báo thành công!');
      },
      onError: (error: AxiosError) => {
        toast.error(error?.message || 'Có lỗi xảy ra! Vui lòng thử lại!');
      }
    },
    ['notification-preferences']
  );

  const form = useForm<TUpdateNotificationPreferencesSchema>({
    resolver: zodResolver(UpdateNotificationPreferencesSchema),
    defaultValues: {
      jobInvitations: true,
      jobApplications: true
      // expiringJobs: true,
    }
  });

  useEffect(() => {
    if (preferences && preferences.data) {
      const preferencesResponse = preferences.data;
      form.reset({
        jobApplications:
          preferencesResponse.enabledNotificationTypes['JOB_APPLICATION'],
        jobInvitations:
          preferencesResponse.enabledNotificationTypes['JOB_INVITATION']
      });
    }
  }, [preferences, form]);

  async function onSubmit(values: TUpdateNotificationPreferencesSchema) {
    if (updateNotificationPreferencesMutation.isPending) return;
    const payload = {
      id: userId,
      notificationTypeUpdates: {
        JOB_INVITATION: values.jobInvitations,
        JOB_APPLICATION: values.jobApplications
      }
    };
    await updateNotificationPreferencesMutation.mutateAsync(payload);
    // refetch();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Cài đặt thông báo qua Email</DialogTitle>
          <DialogDescription className='sr-only' />
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='jobInvitations'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3'>
                  <div className='space-y-0.5'>
                    <FormLabel>
                      Email thông báo thư mời ứng tuyển công việc
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='jobApplications'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3'>
                  <div className='space-y-0.5'>
                    <FormLabel>
                      Email thông báo nộp đơn ứng tuyển công việc
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name='expiringJobs'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3'>
                  <div className='space-y-0.5'>
                    <FormLabel>
                      Email thông báo về việc làm đã lưu sắp hết hạn
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            /> */}

            <div className='flex justify-end gap-2 pt-4'>
              <Button
                type='button'
                variant='outline'
                onClick={() => onOpenChange(false)}
              >
                Đóng
              </Button>
              <Button
                type='submit'
                disabled={updateNotificationPreferencesMutation.isPending}
              >
                {updateNotificationPreferencesMutation.isPending && (
                  <Loader2 className='animate-spin' />
                )}
                Cập nhật
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
