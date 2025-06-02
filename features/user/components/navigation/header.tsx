'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

import Logo from '@/public/icon.png';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { useAuthToken, useGetCurrentUser } from '@/hooks';
import { NotificationBell } from '@/features/notification/notification';
import { MobileNav } from '@/features/user/components/navigation/mobile-nav';
import { UserDropdown } from '@/features/recruiter/pages/recruiter-dashboard/components/user-dropdown';

export function Header() {
  const { getAccessToken } = useAuthToken();
  const accessToken = getAccessToken();

  const { data: user } = useGetCurrentUser();

  return (
    <header className='bg-secondary text-foreground sticky top-0 z-50 w-full'>
      <div className='container flex h-16 items-center justify-between px-5'>
        <div className='flex items-center'>
          <MobileNav />
          <Link href='/' className='mr-6 flex items-center'>
            <Image src={Logo} alt='Logo' width={30} height={30} />
          </Link>
        </div>
        <div className='flex items-center'>
          <div className='flex items-center space-x-4'>
            {accessToken && user && user.data ? (
              <>
                <NotificationBell />
                <UserDropdown user={user.data} />
              </>
            ) : (
              <Link
                href='/login'
                className='bg-primary hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium text-white'
              >
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
