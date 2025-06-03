'use client';

import { shortenName } from '@/lib/utils';
import { useGetCurrentUser, useLogout } from '@/hooks';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { LoadingPage } from '@/components/common/loading';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function UserProfileMenu() {
  const { data: user } = useGetCurrentUser();

  const { logout, isLoading: isLoggingOut } = useLogout();

  if (isLoggingOut) {
    return <LoadingPage text='Đang đăng xuất...' />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8'>
            <AvatarImage
              src={
                user
                  ? 'image' in user.data
                    ? user.data.image
                    : undefined
                  : '/placeholder.svg?height=40&width=40'
              }
              alt='Avatar'
            />
            <AvatarFallback className='bg-white text-[#001c40]'>
              {user
                ? shortenName(
                    'name' in user.data ? user.data.name : user.data.email
                  )
                : 'A'}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Tài khoản
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          Đăng xuất
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
