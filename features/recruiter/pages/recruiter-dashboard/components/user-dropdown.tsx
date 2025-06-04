'use client';

import Link from 'next/link';
import { useState } from 'react';
import { LayoutDashboard, LogOut } from 'lucide-react';

import { useAuthToken, useLogout } from '@/hooks';
import { shortenName } from '@/lib/utils';
import { NavItem, navUserItems } from '@/constants/navigation';
import type {
  ICustomJwtPayload,
  JobSeeker,
  Recruiter,
  User
} from '@/interfaces';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { LoadingPage } from '@/components/common/loading';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { jwtDecode } from 'jwt-decode';
import { getRole } from '@/lib/helpers';
import { UserRole } from '@/constants/enums';

interface UserDropdownProps {
  user: User | JobSeeker | Recruiter;
  navItems: NavItem[];
}

export function UserDropdown({ user, navItems }: UserDropdownProps) {
  const { getAccessToken } = useAuthToken();
  const accessToken = getAccessToken();

  const decodedToken = jwtDecode<ICustomJwtPayload>(accessToken as string);

  const role = getRole(decodedToken.realm_access.roles);

  const [open, setOpen] = useState(false);

  const { logout, isLoading: isLoggingOut } = useLogout();

  if (isLoggingOut) {
    return <LoadingPage text='Đang đăng xuất...' />;
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
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
          {role === UserRole.JOB_SEEKER &&
            navItems &&
            navItems.map((navItem, index) => (
              <DropdownMenuItem
                key={index}
                className='focus:bg-sidebar-accent text-sidebar-foreground flex items-center border-b p-3'
              >
                {navItem.icon}
                <Link
                  href={navItem.url}
                  className='w-full'
                  onClick={() => setOpen(false)}
                >
                  {navItem.title}
                </Link>
              </DropdownMenuItem>
            ))}
          {role === UserRole.RECRUITER && (
            <Link href='/recruiter-dashboard'>
              <DropdownMenuItem className='focus:bg-sidebar-accent text-sidebar-foreground flex cursor-pointer items-center border-b p-3'>
                <LayoutDashboard />
                Dashboard
              </DropdownMenuItem>
            </Link>
          )}
          <DropdownMenuItem
            className='focus:bg-sidebar-accent text-sidebar-foreground flex cursor-pointer items-center border-b p-3'
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
