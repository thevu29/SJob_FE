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
import { navUserItems } from '@/constants/navigation';
import { NotificationBell } from '@/features/notification/notification';
import { MobileNav } from '@/features/user/components/navigation/mobile-nav';
import { UserDropdown } from '@/features/recruiter/pages/recruiter-dashboard/components/user-dropdown';

export function Header() {
  return (
    <header className='bg-secondary text-foreground sticky top-0 z-50 w-full'>
      <div className='container flex h-16 items-center justify-between px-5'>
        <div className='flex items-center'>
          <MobileNav />
          <Link href='/' className='mr-6 flex items-center'>
            <Image src={Logo} alt='Logo' width={30} height={30} />
          </Link>
          <nav className='hidden md:flex'>
            <ul className='flex'>
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Link
                      href='#'
                      className='hover:text-primary-foreground/80 flex items-center px-4 py-1'
                    >
                      Việc làm <ChevronDown className='ml-1 h-4 w-4' />
                    </Link>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='w-48'>
                    <DropdownMenuItem>Việc làm đã lưu</DropdownMenuItem>
                    <DropdownMenuItem>Việc làm đã ứng tuyển</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            </ul>
          </nav>
        </div>
        <div className='flex items-center'>
          <div className='flex items-center space-x-4'>
            <NotificationBell />
            <UserDropdown navItems={navUserItems} />
          </div>
        </div>
      </div>
    </header>
  );
}
