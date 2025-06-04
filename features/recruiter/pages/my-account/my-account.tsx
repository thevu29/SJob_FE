'use client';

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PasswordChangeForm } from '@/features/recruiter/pages/company-general/components/password-change-form';

export function MyAccount() {
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  return (
    <div className='space-y-4'>
      <div className='bg-card rounded-md p-4 shadow-sm md:p-6'>
        <h1 className='mb-6 text-xl font-medium'>Quản Lý Tài Khoản</h1>

        <div className='space-y-6'>
          <div>
            <h2 className='mb-4 border-b pb-2 text-base font-medium'>
              Thông tin chung
            </h2>

            <div className='space-y-6'>
              <div className='grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-4'>
                <div className='font-medium'>Địa chỉ email</div>
                <div className='col-span-1 break-words md:col-span-2'>
                  hoangnt19.weebpal@gmail.com
                </div>
              </div>

              <div className='grid grid-cols-1 items-center gap-2 md:grid-cols-3 md:gap-4'>
                <div className='font-medium'>Họ và tên</div>
                <div className='col-span-1 flex items-center gap-2 md:col-span-2'>
                  Vuong Hoang
                </div>
              </div>
            </div>
          </div>

          <div className='space-y-2'>
            <Button
              variant='outline'
              className={`flex w-full items-center justify-between sm:w-[240px] ${showPasswordForm ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'} hover:bg-primary/90 border-none`}
              onClick={() => setShowPasswordForm(!showPasswordForm)}
            >
              <span>Thay đổi mật khẩu</span>
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>

          {showPasswordForm && (
            <PasswordChangeForm onCancel={() => setShowPasswordForm(false)} />
          )}
        </div>
      </div>

      <div className='bg-card rounded-md p-4 shadow-sm md:p-6'>
        <div className='grid grid-cols-1 items-center gap-2 md:grid-cols-3 md:gap-4'>
          <div className='font-medium'>Sjob email</div>
          <div className='col-span-1 flex items-center gap-2 break-words md:col-span-2'>
            <span className='break-all'>ndmW398451@service.sjob.com</span>
          </div>
        </div>

        <div className='mt-4 grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-4'>
          <div></div>
          <div className='col-span-1 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center md:col-span-2'>
            <div className='bg-warning/20 text-warning rounded-md px-3 py-1.5 text-sm'>
              Email này vẫn chưa được kích hoạt.
            </div>
            <Button
              variant='secondary'
              className='bg-primary hover:bg-primary/90'
            >
              Gửi yêu cầu kích hoạt
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
