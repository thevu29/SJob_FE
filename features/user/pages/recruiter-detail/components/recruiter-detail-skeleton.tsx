import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function RecruiterDetailSkeleton() {
  return (
    <div className='bg-background mx-auto min-h-screen max-w-7xl overflow-hidden rounded-lg md:rounded-xl'>
      {/* Header Skeleton */}
      <div className='bg-secondary relative h-48 md:h-64'>
        <div className='container mx-auto px-4'>
          <div className='absolute -bottom-20 flex flex-col items-start gap-4 md:-bottom-24 md:flex-row md:items-end'>
            {/* Avatar Skeleton */}
            <Skeleton className='border-background h-32 w-32 rounded-full border-4 md:h-48 md:w-48' />

            <div className='w-full p-4 md:w-auto'>
              <div className='flex flex-col items-start justify-between gap-2 md:flex-row md:items-center md:gap-8'>
                <div className='w-full space-y-3'>
                  {/* Name Skeleton */}
                  <Skeleton className='h-8 w-64 md:h-10 md:w-80' />

                  {/* Info Row Skeleton */}
                  <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6'>
                    <div className='flex items-center gap-2'>
                      <Skeleton className='h-4 w-4' />
                      <Skeleton className='h-4 w-32' />
                    </div>
                    <div className='flex items-center gap-2'>
                      <Skeleton className='h-4 w-4' />
                      <Skeleton className='h-4 w-24' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className='container mx-auto px-4 pt-24 pb-16 md:pt-32'>
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
          {/* Bio Section Skeleton */}
          <Card className='lg:col-span-3'>
            <CardContent className='space-y-6'>
              {/* About Section */}
              <div className='space-y-3'>
                <Skeleton className='h-6 w-32' />
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-3/4' />
                  <Skeleton className='h-4 w-5/6' />
                  <Skeleton className='h-4 w-2/3' />
                </div>
              </div>

              {/* Location Section */}
              <div className='space-y-3 pt-4'>
                <Skeleton className='h-6 w-40' />
                <div className='flex items-start gap-3'>
                  <Skeleton className='mt-0.5 h-5 w-5' />
                  <Skeleton className='h-4 w-64' />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
