import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function SidebarSkeleton() {
  return (
    <aside className='bg-background border-border w-full border-r p-4 md:w-100'>
      <div className='flex h-full flex-col space-y-4'>
        {/* Profile Card Skeleton */}
        <Card className='bg-primary text-primary-foreground border-none'>
          <CardContent className='p-4'>
            <div className='flex items-center gap-4'>
              {/* Avatar with completion circle skeleton */}
              <div className='relative flex h-24 w-24 items-center justify-center'>
                <Skeleton className='h-24 w-24 rounded-full bg-white/20' />
              </div>

              <div className='flex-1 space-y-2'>
                <Skeleton className='h-6 w-32 bg-white/20' />
                <Skeleton className='h-4 w-24 bg-white/20' />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Search Card Skeleton */}
        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <Skeleton className='h-4 w-40' />
              <Skeleton className='h-6 w-11 rounded-full' />
            </div>
            <div className='mt-2 flex items-center gap-2'>
              <Skeleton className='h-2.5 flex-1 rounded-full' />
              <Skeleton className='h-4 w-8' />
            </div>
            <Skeleton className='mt-2 h-8 w-full' />
          </CardContent>
        </Card>

        {/* Navigation Card Skeleton */}
        <Card className='flex-1'>
          <CardContent className='p-2'>
            <nav>
              <ul className='space-y-1'>
                {Array.from({ length: 6 }).map((_, index) => (
                  <li key={index}>
                    <div className='flex items-center gap-3 rounded-md p-3'>
                      <Skeleton className='h-5 w-5' />
                      <Skeleton className='h-4 w-24' />
                    </div>
                  </li>
                ))}
              </ul>
            </nav>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
}
