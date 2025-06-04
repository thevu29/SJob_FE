'use client';

import { useState, useCallback, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent
} from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Notification } from '@/interfaces/notification';
import { useGet, usePut } from '@/hooks/use-queries';
import { NotificationItem } from '@/features/notification/components/notification-item';
import { JobSeeker, Recruiter, User } from '@/interfaces';

interface NotificationBellProps {
  user: User | JobSeeker | Recruiter;
}

export function NotificationBell({ user }: NotificationBellProps) {
  const [open, setOpen] = useState(false);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);
  const userId = 'userId' in user && user.userId;

  // Mock data for notifications since we can't access the API
  const { data, refetch } = useGet<Notification[]>(
    `notifications/${userId}/all`,
    [`notifications/${userId}/all`]
  );
  const mockNotifications = data?.data || [];

  const updateNotificationMutation = usePut<
    Notification,
    { id: string; read: boolean }
  >('notifications/read', {
    onSuccess: () => {
      refetch();
    }
  });

  // Calculate unread count
  const unreadCount = mockNotifications.filter(
    (notification) => !notification.read
  ).length;

  // State to track which notifications have been marked as read
  const [readNotifications, setReadNotifications] = useState<
    Record<string, boolean>
  >({});

  // Mark notification as read
  const markAsRead = useCallback(async (id: string) => {
    // In a real implementation, this would call the API
    // For now, we'll just update local state
    // setReadNotifications((prev) => ({ ...prev, [id]: true }));

    // In a real implementation with the API, you would do:
    // PUT to notifications/read{id}

    await updateNotificationMutation.mutateAsync({ id: id, read: true });
  }, []);

  // Set visual indicator for new notifications
  useEffect(() => {
    if (unreadCount > 0) {
      setHasNewNotifications(true);
    }
  }, [unreadCount]);

  // Reset new notification indicator when dropdown is opened
  useEffect(() => {
    if (open) {
      setHasNewNotifications(false);
    }
  }, [open]);

  // Get notifications with read status from state
  const notifications = mockNotifications.map((notification) => ({
    ...notification,
    read: readNotifications[notification.id] ? true : notification.read
  }));

  // Recalculate unread count based on state
  const currentUnreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='relative'
                aria-label='Notifications'
              >
                <Bell className='h-5 w-5' />
                {currentUnreadCount > 0 && (
                  <Badge
                    className='bg-primary text-primary-foreground absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs'
                    aria-label={`${currentUnreadCount} unread notifications`}
                  >
                    {currentUnreadCount > 99 ? '99+' : currentUnreadCount}
                  </Badge>
                )}
                {hasNewNotifications && (
                  <span className='bg-primary absolute top-1 right-1 h-2 w-2 rounded-full' />
                )}
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>Thông báo</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent align='end' className='w-80 md:w-96' sideOffset={8}>
        <DropdownMenuLabel>Thông báo</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className='h-[300px] md:h-[400px]'>
          {notifications.length === 0 ? (
            <div className='text-muted-foreground p-4 text-center'>
              Bạn không có thông báo nào.
            </div>
          ) : (
            notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onRead={markAsRead}
              />
            ))
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
