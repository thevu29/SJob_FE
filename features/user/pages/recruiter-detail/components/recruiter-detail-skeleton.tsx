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

          {/* Jobs Section Skeleton */}
          <Card className='lg:col-span-3'>
            <CardContent className='space-y-6'>
              <div className='space-y-4'>
                <Skeleton className='h-6 w-32' />

                {/* Search Input Skeleton */}
                <Skeleton className='h-10 w-full rounded-md' />

                {/* Job Listings Skeleton */}
                <div className='space-y-4'>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <JobCardSkeleton key={index} />
                  ))}
                </div>

                {/* Pagination Skeleton */}
                <div className='flex items-center justify-center gap-2 pt-4'>
                  <Skeleton className='h-9 w-20' />
                  <Skeleton className='h-9 w-9' />
                  <Skeleton className='h-9 w-9' />
                  <Skeleton className='h-9 w-9' />
                  <Skeleton className='h-9 w-20' />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function JobCardSkeleton() {
  return (
    <Card className='w-full'>
      <CardContent className='p-4 sm:p-6'>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
          <div className='flex flex-col gap-3 sm:flex-row sm:gap-4'>
            {/* Company Logo Skeleton */}
            <Skeleton className='h-12 w-12 rounded-lg sm:h-16 sm:w-16' />

            <div className='flex-1 space-y-2'>
              {/* Job Title */}
              <Skeleton className='h-5 w-48 sm:h-6 sm:w-64' />

              {/* Company Name */}
              <Skeleton className='h-4 w-32 sm:w-40' />

              {/* Job Details */}
              <div className='flex flex-wrap gap-2'>
                <Skeleton className='h-4 w-20' />
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-4 w-16' />
              </div>
            </div>
          </div>

          <div className='flex flex-col items-start gap-2 sm:items-end'>
            {/* Salary */}
            <Skeleton className='h-5 w-24 sm:w-32' />

            {/* Posted Date */}
            <Skeleton className='h-4 w-20' />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
