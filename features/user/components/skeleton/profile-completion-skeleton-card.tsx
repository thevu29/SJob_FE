import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function ProfileCompletionSkeletonCard() {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <Skeleton className='h-6 w-48' />
        <Skeleton className='h-6 w-12' />
      </CardHeader>

      <CardContent>
        <div className='flex flex-col items-center gap-6 md:flex-row'>
          <div className='flex-shrink-0'>
            <Skeleton className='h-30 w-30 rounded-full' />
          </div>

          <div className='w-full flex-1'>
            <div className='w-full space-y-3'>
              {Array.from({ length: 7 }).map((_, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between gap-2'
                >
                  <div className='flex items-center gap-2'>
                    <Skeleton className='h-5 w-5 rounded-full' />
                    <Skeleton className='h-4 w-32' />
                  </div>
                </div>
              ))}
            </div>

            <div className='mt-4'>
              <Skeleton className='h-12 w-full rounded-md' />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
