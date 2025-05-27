'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';

import { NavItem } from '@/constants/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserDropdownProps {
  navItems: NavItem[];
}

export function UserDropdown({ navItems }: UserDropdownProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button className='focus:outline-none'>
          <Avatar className='h-8 w-8 cursor-pointer'>
            <AvatarImage
              src='/placeholder.svg?height=32&width=32'
              alt='Avatar'
            />
            <AvatarFallback className='bg-white text-[#001c40]'>
              VH
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-[300px] p-0' align='end'>
        <div className='bg-secondary text-primary-foreground flex items-center justify-between p-4'>
          <div className='flex items-center space-x-3'>
            <Avatar className='h-10 w-10 border-2 border-white'>
              <AvatarImage
                src='/placeholder.svg?height=40&width=40'
                alt='Avatar'
              />
              <AvatarFallback className='bg-background text-foreground'>
                VH
              </AvatarFallback>
            </Avatar>
            <div>
              <p className='font-bold'>Vuong Hoang</p>
              <p className='text-sm'>wanaham816@fundapk.com</p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className='text-white hover:text-gray-200'
          >
            <X className='text-primary-foreground ml-2 h-5 w-5' />
          </button>
        </div>

        <div className='p-1'>
          {navItems &&
            navItems.map((navItem, index) => (
              <DropdownMenuItem
                key={index}
                className='focus:bg-secondary/40 mt-2 flex items-center border-t p-3'
              >
                {navItem.icon}
                <Link href={navItem.url} className='w-full'>
                  {navItem.title}
                </Link>
              </DropdownMenuItem>
            ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
