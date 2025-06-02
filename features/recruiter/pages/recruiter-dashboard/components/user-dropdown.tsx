'use client';

import Link from 'next/link';
import { useState } from 'react';

import { shortenName } from '@/lib/utils';
import { navUserItems } from '@/constants/navigation';
import type { JobSeeker, Recruiter, User } from '@/interfaces';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserDropdownProps {
  user: User | JobSeeker | Recruiter;
}

export function UserDropdown({ user }: UserDropdownProps) {
  const [open, setOpen] = useState(false);

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
          {navUserItems &&
            navUserItems.map((navItem, index) => (
              <DropdownMenuItem
                key={index}
                className='focus:bg-sidebar-accent text-sidebar-foreground mt-2 flex items-center border-b p-3'
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
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
