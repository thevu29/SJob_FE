import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function ResumeSkeletonCard() {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <Skeleton className='h-6 w-24' />
        <Skeleton className='h-9 w-32' />
      </CardHeader>

      <CardContent>
        <div className='space-y-4'>
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className='flex items-center gap-4 rounded-md border p-3'
            >
              <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded'>
                <Skeleton className='h-10 w-10 rounded' />
              </div>

              <div className='flex-1 space-y-2'>
                <div className='flex items-center gap-2'>
                  <Skeleton className='h-5 w-32' />
                  {index === 0 && (
                    <Skeleton className='h-5 w-12 rounded-full' />
                  )}
                </div>
                <Skeleton className='h-3 w-24' />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
