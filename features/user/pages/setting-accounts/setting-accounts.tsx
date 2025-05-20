'use client';

import { useState } from 'react';
import { File, Building2, LayoutDashboard } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { ChangePassword } from '@/features/user/pages/setting-accounts/components/forms/change-password';
import { EmailNotifications } from '@/features/user/pages/setting-accounts/components/forms/email-notifications';
import { useJobSeekerContext } from '@/features/user/contexts/job-seeker-context';

export function SettingAccounts() {
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isEmailNotificationsOpen, setIsEmailNotificationsOpen] =
    useState(false);
  const { data } = useJobSeekerContext();
  const { jobSeeker } = data;

  return (
    <div className='flex min-h-screen flex-col md:flex-row'>
      {/* Main content */}
      <div className='flex-1 p-6'>
        <div className='space-y-8'>
          <div className='bg-card space-y-6 rounded-xl border p-6'>
            <h1 className='text-3xl font-bold'>Quản Lý Tài Khoản</h1>
          </div>
          {/* Email and Password Section */}
          <div className='bg-card space-y-6 rounded-xl border p-6'>
            <h2 className='text-xl font-semibold'>
              Email đăng nhập & mật khẩu
            </h2>
            <div className='flex items-center'>
              <div>
                <p className='text-muted-foreground mb-1'>
                  Email truy cập hiện tại: {jobSeeker?.email}
                </p>
              </div>
            </div>
            <div className='items-centerm flex flex-1 justify-end'>
              <p
                className='text-primary hover:text-color-5 cursor-pointer font-semibold no-underline transition'
                onClick={() => setIsChangePasswordOpen(true)}
              >
                Thay đổi mật khẩu
              </p>
            </div>
          </div>

          {/* Email Notifications Section */}
          <div className='bg-card space-y-6 rounded-xl border p-6'>
            <div className='flex flex-col justify-between gap-4 md:flex-row md:items-center'>
              <h2 className='text-xl font-semibold'>
                Cài đặt thông báo qua Email
              </h2>
            </div>
            <p className='text-muted-foreground'>
              Thông báo hỗ trợ bạn có việc làm phù hợp: theo dõi trạng thái ứng
              tuyển, nhà tuyển dụng xem hồ sơ,...
            </p>
            <div className='items-centerm flex flex-1 justify-end'>
              <p
                className='text-primary hover:text-color-5 cursor-pointer font-semibold no-underline transition'
                onClick={() => setIsEmailNotificationsOpen(true)}
              >
                Thiết lập
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <ChangePassword
        open={isChangePasswordOpen}
        onOpenChange={setIsChangePasswordOpen}
      />

      <EmailNotifications
        open={isEmailNotificationsOpen}
        onOpenChange={setIsEmailNotificationsOpen}
      />
    </div>
  );
}
