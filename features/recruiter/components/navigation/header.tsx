'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MobileNav } from '@/features/recruiter/components/navigation/mobile-nav';
import Image from 'next/image';
import Logo from '@/public/icon.png';
import { ROUTES } from '@/constants/routes';
import { navRecruiterItems } from '@/constants/navigation';
import { useAuthToken, useGetCurrentUser } from '@/hooks';
import { useLogoutState } from '@/hooks/use-logout-state';
import { LoadingSpinner, LoadingPage } from '@/components/common/loading';
import { NotificationBell } from '@/features/notification/notification';
import { UserDropdown } from '@/features/recruiter/pages/recruiter-dashboard/components/user-dropdown';

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
      <div className='flex h-16 items-center justify-between px-5'>
        <div className='flex items-center'>
          <MobileNav />
          <Link href='/' className='mr-6 flex items-center'>
            <Image src={Logo} alt='Logo' width={30} height={30} />
          </Link>
          <nav className='hidden md:flex'>
            <ul className='flex'>
              <li>
                <Link
                  href={ROUTES.RECRUITER.DASHBOARD}
                  className='hover:text-primary-foreground/80 flex items-center px-4 py-1'
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.RECRUITER.JOBS.LIST}
                  className='hover:text-primary-foreground/80 flex items-center px-4 py-1'
                >
                  Việc Làm
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.RECRUITER.JOBSEEKER.INVITATION_LISTING}
                  className='hover:text-primary-foreground/80 flex items-center px-4 py-1'
                >
                  Ứng viên
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className='flex items-center'>
          <div className='mr-4 hidden md:flex md:space-x-2'>
            <Button
              className='bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer shadow-xs'
              asChild
            >
              <Link href={ROUTES.RECRUITER.JOBS.CREATE}>Đăng Tuyển Dụng</Link>
            </Button>
            <Button
              className='bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer shadow-xs'
              asChild
            >
              <Link href={ROUTES.RECRUITER.JOBSEEKER.SEARCH}>Tìm Ứng Viên</Link>
            </Button>
          </div>
          <div className='flex items-center space-x-4'>
            {showUserDropdown ? (
              <>
                <NotificationBell user={user.data} />
                <UserDropdown user={user.data} navItems={navRecruiterItems} />
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
