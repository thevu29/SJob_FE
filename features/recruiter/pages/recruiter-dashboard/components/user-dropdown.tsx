'use client';

import Link from 'next/link';
import { useState } from 'react';
import { LogOut } from 'lucide-react';

import { useLogout } from '@/hooks';
import { shortenName } from '@/lib/utils';
import { navUserItems } from '@/constants/navigation';
import type { JobSeeker, Recruiter, User } from '@/interfaces';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { LoadingPage } from '@/components/common/loading';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserDropdownProps {
  user: User | JobSeeker | Recruiter;
}

export function UserDropdown({ user }: UserDropdownProps) {
  const [open, setOpen] = useState(false);

  const { logout, isLoading: isLoggingOut } = useLogout();

  if (isLoggingOut) {
    return <LoadingPage text="Đang đăng xuất..." />;
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button className='focus:outline-none'>
          <Avatar className='h-8 w-8 cursor-pointer'>
            <AvatarImage
              src={
                ('image' in user ? user.image : null) ??
                '/placeholder.svg?height=40&width=40'
              }
              alt='Avatar'
            />
            <AvatarFallback className='bg-white text-[#001c40]'>
              {shortenName('name' in user ? user.name : user.email)}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-[300px] p-0' align='end'>
        <div className='p-1'>
          {navUserItems &&
            navUserItems.map((navItem, index) => (
              <Link
                key={index}
                href={navItem.url}
                className='w-full cursor-pointer'
              >
                <DropdownMenuItem
                  key={index}
                  className='focus:bg-secondary/40 mt-2 flex cursor-pointer items-center border-b p-3'
                >
                  {navItem.icon}
                  {navItem.title}
                </DropdownMenuItem>
              </Link>
            ))}
          <DropdownMenuItem
            className='focus:bg-secondary/40 mt-2 flex cursor-pointer items-center border-b p-3'
            onClick={logout}
          >
            <LogOut className='mr-2 h-5 w-5 text-gray-500' />
            Đăng xuất
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
