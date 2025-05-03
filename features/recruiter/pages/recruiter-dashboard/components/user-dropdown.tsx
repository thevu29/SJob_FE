'use client';

import * as React from 'react';
import { ChevronDown, ChevronRight, LogOut, User, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';

export function UserDropdown() {
  const [open, setOpen] = React.useState(false);
  const [accountSettingsOpen, setAccountSettingsOpen] = React.useState(false);

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
        <div className='flex items-center justify-between bg-gray-400 p-4 text-white'>
          <div className='flex items-center space-x-3'>
            <Avatar className='h-10 w-10 border-2 border-white'>
              <AvatarImage
                src='/placeholder.svg?height=40&width=40'
                alt='Avatar'
              />
              <AvatarFallback className='bg-gray-200 text-gray-600'>
                VH
              </AvatarFallback>
            </Avatar>
            <div>
              <p className='font-medium'>Vuong Hoang</p>
              <p className='text-sm'>wanaham816@fundapk.com</p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className='text-white hover:text-gray-200'
          >
            <X className='h-5 w-5' />
          </button>
        </div>

        <div className='p-1'>
          <Collapsible
            open={accountSettingsOpen}
            onOpenChange={setAccountSettingsOpen}
            className='w-full'
          >
            <CollapsibleTrigger className='flex w-full items-center justify-between p-3 hover:bg-gray-100'>
              <div className='flex items-center'>
                <User className='mr-2 h-5 w-5 text-gray-500' />
                <span>Thiết lập tài khoản</span>
              </div>
              {accountSettingsOpen ? (
                <ChevronDown className='h-4 w-4' />
              ) : (
                <ChevronRight className='h-4 w-4' />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent>
              <DropdownMenuItem className='pl-10 focus:bg-gray-100'>
                Quản lý tài khoản
              </DropdownMenuItem>
              <DropdownMenuItem className='pl-10 focus:bg-gray-100'>
                Thông tin công ty
              </DropdownMenuItem>
            </CollapsibleContent>
          </Collapsible>

          <DropdownMenuItem className='mt-2 flex items-center border-t p-3 focus:bg-gray-100'>
            <LogOut className='mr-2 h-5 w-5 text-gray-500' />
            <span>Thoát</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
