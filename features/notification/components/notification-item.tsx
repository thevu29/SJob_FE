'use client';
import { Notification } from '@/interfaces/notification';
import { cn } from '@/lib/utils';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { useRouter } from 'next/navigation';

interface NotificationItemProps {
  notification: Notification;
  onRead: (id: string) => void;
}

export function NotificationItem({
  notification,
  onRead
}: NotificationItemProps) {
  const router = useRouter();
  const handleClick = () => {
    if (!notification.read) {
      onRead(notification.id);
    }
    // Navigate to the notification URL if needed
    if (notification.url != '') {
      router.push(notification.url);
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();

      // If today, show time
      if (date.toDateString() === now.toDateString()) {
        return date.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        });
      }

      // If this year, show month and day
      if (date.getFullYear() === now.getFullYear()) {
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
      }

      // Otherwise show full date
      return date.toLocaleDateString();
    } catch (e) {
      return dateString;
    }
  };

  return (
    <DropdownMenuItem
      className={cn(
        'focus:bg-accent flex cursor-pointer gap-2 p-3',
        !notification.read && 'bg-accent/50'
      )}
      onClick={handleClick}
    >
      <div className='flex-shrink-0 pt-1'>
        {!notification.read && (
          <span className='bg-primary block h-2 w-2 rounded-full' />
        )}
      </div>
      <div className='flex-1 space-y-1'>
        <p className='text-sm leading-none font-medium'>
          {notification.message}
        </p>
        <div className='flex items-center justify-end'>
          <p className='text-muted-foreground text-xs'>
            {formatDate(notification.createdAt)}
          </p>
        </div>
      </div>
    </DropdownMenuItem>
  );
}
