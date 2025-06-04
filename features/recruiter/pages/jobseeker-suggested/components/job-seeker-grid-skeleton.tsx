import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

// Job Seeker Card Skeleton Component
const JobSeekerCardSkeleton = () => (
  <Card className='border-border/50 h-full'>
    <CardContent className='p-6'>
      {/* Header with Avatar and Status */}
      <div className='mb-4 flex items-start justify-between'>
        <div className='flex min-w-0 flex-1 items-center space-x-3'>
          <Skeleton className='h-12 w-12 flex-shrink-0 rounded-full' />
          <div className='min-w-0 flex-1 space-y-2'>
            <Skeleton className='h-4 w-3/4' />
            <Skeleton className='h-3 w-1/2' />
          </div>
        </div>
        <Skeleton className='ml-2 h-6 w-20 flex-shrink-0 rounded-full' />
      </div>

      {/* Location */}
      <div className='mb-4 flex items-center'>
        <Skeleton className='mr-2 h-4 w-4 flex-shrink-0' />
        <Skeleton className='h-3 w-2/3' />
      </div>

      {/* About */}
      <div className='mb-6 space-y-2'>
        <Skeleton className='h-3 w-full' />
        <Skeleton className='h-3 w-4/5' />
        <Skeleton className='h-3 w-3/5' />
      </div>

      {/* Contact Actions */}
      <div className='flex gap-2'>
        <Skeleton className='h-8 flex-1' />
        <Skeleton className='h-8 w-8' />
        <Skeleton className='h-8 w-8' />
      </div>
    </CardContent>
  </Card>
);

const CARDS_PER_SLIDE = 6; // 2 rows × 3 columns on large screens

// Job Seeker Cards Grid Skeleton
export default function JobSeekerGridSkeleton() {
  return (
    <div className='grid grid-cols-1 gap-6 px-2 sm:grid-cols-2 lg:grid-cols-3'>
      {Array.from({ length: CARDS_PER_SLIDE }, (_, index) => (
        <JobSeekerCardSkeleton key={index} />
      ))}
    </div>
  );
}
