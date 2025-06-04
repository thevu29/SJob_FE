import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function IntroduceSkeletonCard() {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <Skeleton className='h-6 w-32' />
        <Skeleton className='h-8 w-8' />
      </CardHeader>

      <CardContent>
        <div className='space-y-3'>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-5/6' />
          <Skeleton className='h-4 w-4/5' />
          <Skeleton className='h-4 w-3/4' />
          <Skeleton className='h-4 w-2/3' />
        </div>
      </CardContent>
    </Card>
  );
}
