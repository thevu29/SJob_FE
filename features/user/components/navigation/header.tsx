'use client';

import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/public/icon.png';
import { useAuthToken, useGetCurrentUser } from '@/hooks';
import { useLogoutState } from '@/hooks/use-logout-state';
import { LoadingSpinner, LoadingPage } from '@/components/common/loading';
import { NotificationBell } from '@/features/notification/notification';
import { MobileNav } from '@/features/user/components/navigation/mobile-nav';
import { UserDropdown } from '@/features/recruiter/pages/recruiter-dashboard/components/user-dropdown';
import { navUserItems } from '@/constants/navigation';

export function Header() {
  const { getAccessToken } = useAuthToken();
  const accessToken = getAccessToken();
  const { isLoggingOut } = useLogoutState();

  const { data: user, isLoading, error } = useGetCurrentUser();

  if (isLoggingOut) {
    return <LoadingPage text='Đang đăng xuất...' />;
  }

  const hasValidToken = !!accessToken;
  const hasUserData = !!(user && user.data);
  const showUserDropdown = hasValidToken && hasUserData && !error;
  const isAuthenticating =
    hasValidToken && (isLoading || (!hasUserData && !error));

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
            {showUserDropdown ? (
              <>
                <NotificationBell user={user.data} />
                <UserDropdown user={user.data} navItems={navUserItems} />
              </>
            ) : isAuthenticating ? (
              <LoadingSpinner size='sm' variant='primary' className='h-8 w-8' />
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
