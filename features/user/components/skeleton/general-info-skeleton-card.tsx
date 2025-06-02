import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function GeneralInfoSkeletonCard() {
  return (
    <Card>
      <CardContent className='relative p-6'>
        <Skeleton className='absolute top-4 right-4 h-8 w-8' />

        <div className='flex flex-col items-start gap-6 md:flex-row'>
          <div className='flex-1 space-y-4'>
            <div className='space-y-2'>
              <Skeleton className='h-8 w-48' />
              <Skeleton className='h-5 w-32' />
            </div>

            <div className='space-y-3'>
              <div className='flex items-center gap-2'>
                <Skeleton className='h-4 w-4' />
                <Skeleton className='h-4 w-40' />
              </div>
              <div className='flex items-center gap-2'>
                <Skeleton className='h-4 w-4' />
                <Skeleton className='h-4 w-48' />
              </div>
              <div className='flex items-center gap-2'>
                <Skeleton className='h-4 w-4' />
                <Skeleton className='h-4 w-32' />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
