import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function EducationSkeletonCard() {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <Skeleton className='h-6 w-32' />
        <Skeleton className='h-9 w-36' />
      </CardHeader>

      <CardContent>
        <div className='space-y-6'>
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className='flex gap-4'>
              <div className='flex h-16 w-16 shrink-0 items-center justify-center rounded'>
                <Skeleton className='h-16 w-16 rounded' />
              </div>

              <div className='flex-1 space-y-2'>
                <Skeleton className='h-6 w-48' />
                <Skeleton className='h-5 w-64' />
                <Skeleton className='h-4 w-32' />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
