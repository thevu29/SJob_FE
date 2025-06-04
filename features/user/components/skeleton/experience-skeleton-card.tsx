import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function ExperienceSkeletonCard() {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <Skeleton className='h-6 w-48' />
        <Skeleton className='h-9 w-48' />
      </CardHeader>

      <CardContent>
        <div className='space-y-6'>
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className='flex gap-4'>
              <div className='flex flex-col gap-4 md:flex-row'>
                <div className='flex-shrink-0'>
                  <Skeleton className='h-11 w-11 rounded-full' />
                </div>
                <div className='flex-1 space-y-3'>
                  <div className='flex flex-col justify-between gap-2 md:flex-row md:items-center'>
                    <div className='space-y-2'>
                      <Skeleton className='h-6 w-40' />
                      <div className='flex flex-wrap gap-2'>
                        <Skeleton className='h-6 w-20 rounded-full' />
                        <Skeleton className='h-6 w-24 rounded-full' />
                      </div>
                    </div>
                  </div>

                  <div className='flex flex-col gap-2 md:flex-row md:items-center'>
                    <div className='flex items-center gap-1'>
                      <Skeleton className='h-4 w-4' />
                      <Skeleton className='h-4 w-32' />
                    </div>
                    <span className='hidden md:inline'>•</span>
                    <div className='flex items-center gap-1'>
                      <Skeleton className='h-4 w-4' />
                      <Skeleton className='h-4 w-28' />
                    </div>
                  </div>

                  <div className='flex items-center gap-1'>
                    <Skeleton className='h-4 w-4' />
                    <Skeleton className='h-4 w-36' />
                  </div>

                  <div className='space-y-2'>
                    <Skeleton className='h-4 w-full' />
                    <Skeleton className='h-4 w-3/4' />
                    <Skeleton className='h-4 w-1/2' />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
