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

export function Header() {
  return (
    <header className='sticky top-0 z-50 w-full bg-[#001c40] text-white'>
      <div className='flex h-16 items-center justify-between px-5'>
        <div className='flex items-center'>
          <MobileNav />
          <Link href='/' className='mr-6 flex items-center'>
            <Image src={Logo} alt='Logo' width={30} height={30} />
            {/* <div className='flex aspect-square size-8 items-center justify-center rounded-lg'>
            <Image src={Logo} alt='Logo' width={30} height={30} />
          </div> */}
            {/* <span className='ml-2 text-lg font-semibold'>Dashboard</span> */}
          </Link>
          <nav className='hidden md:flex'>
            <ul className='flex'>
              <li>
                <Link
                  href='#'
                  className='flex items-center px-4 py-1 hover:text-[#ff5c30]'
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='flex items-center px-4 py-1 hover:text-[#ff5c30]'
                >
                  Việc Làm
                </Link>
              </li>
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className='flex items-center px-4 py-1 hover:text-[#ff5c30]'>
                      Ứng viên <ChevronDown className='ml-1 h-4 w-4' />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='w-48'>
                    <DropdownMenuItem>Tìm kiếm ứng viên</DropdownMenuItem>
                    <DropdownMenuItem>Quản lý ứng viên</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
              {/* <li>
                <Link
                  href='#'
                  className='flex items-center px-4 py-1 hover:text-[#ff5c30]'
                >
                  Báo cáo
                </Link>
              </li> */}
            </ul>
          </nav>
        </div>
        <div className='flex items-center'>
          <div className='mr-4 hidden md:flex md:space-x-2'>
            <Button className='cursor-pointer bg-[#ff7d55] text-white hover:bg-[#ff5c30]'>
              Đăng Tuyển Dụng
            </Button>
            <Button className='cursor-pointer bg-[#ff7d55] text-white hover:bg-[#ff5c30]'>
              Tìm Ứng Viên
            </Button>
          </div>
          <div className='flex items-center space-x-4'>
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className='flex items-center'>
                  <div className='flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#001c40]'>
                    <span>VN</span>
                  </div>
                  <ChevronDown className='ml-1 hidden h-4 w-4 md:block' />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem>Tiếng Việt</DropdownMenuItem>
                <DropdownMenuItem>English</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
            <button className='relative'>
              <Bell className='h-6 w-6' />
            </button>
            <UserDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}
