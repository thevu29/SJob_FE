import Link from 'next/link';
import { Bell, ChevronDown, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MobileNav } from '@/features/recruiter/components/navigation/mobile-nav';
import Image from 'next/image';
import Logo from '@/public/icon.png';
import { UserDropdown } from '@/features/recruiter/pages/recruiter-dashboard/components/user-dropdown';
import { ROUTES } from '@/constants/routes';
import { NotificationBell } from '@/features/notification/notification';
import { navRecruiterItems } from '@/constants/navigation';

export function Header() {
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
              {/* <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Link
                      href='/recruiter/invitation-listing'
                      className='hover:text-primary-foreground/80 flex items-center px-4 py-1'
                    >
                      Ứng viên <ChevronDown className='ml-1 h-4 w-4' />
                    </Link>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='w-48'>
                    <DropdownMenuItem>Tìm kiếm ứng viên</DropdownMenuItem>
                    <DropdownMenuItem>Quản lý ứng viên</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li> */}
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
            {/* <button className='relative'>
              <Bell className='h-6 w-6' />
            </button> */}
            <NotificationBell />
            <UserDropdown navItems={navRecruiterItems} />
          </div>
        </div>
      </div>
    </header>
  );
}
