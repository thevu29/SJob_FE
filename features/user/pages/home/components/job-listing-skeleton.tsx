'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface JobListingSkeletonProps {
  itemCount?: number;
  showTitle?: boolean;
  showViewAll?: boolean;
}

function JobCardSkeleton() {
  return (
    <Card className='overflow-hidden border'>
      <CardContent className='p-4'>
        <div className='flex items-start gap-4'>
          {/* Avatar skeleton */}
          <div className='bg-muted h-12 w-12 flex-shrink-0 animate-pulse rounded-md'></div>

          <div className='min-w-0 flex-1 space-y-2'>
            {/* Job title skeleton */}
            <div className='bg-muted h-4 w-3/4 animate-pulse rounded'></div>

            {/* Company name skeleton */}
            <div className='bg-muted h-3 w-1/2 animate-pulse rounded'></div>

            {/* Salary skeleton */}
            <div className='bg-muted h-3 w-2/3 animate-pulse rounded'></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function JobListingSkeleton({
  itemCount = 9,
  showTitle = true,
  showViewAll = true
}: JobListingSkeletonProps) {
  const itemsPerPage = 9;
  const totalDesktopPages = Math.ceil(itemCount / itemsPerPage);
  const mobileSlideCount = Math.max(itemCount, 1);

  return (
    <section className='w-full py-8'>
      <div className='container mx-auto px-4'>
        <Card className='overflow-hidden border shadow-sm'>
          <CardContent className='p-6'>
            {/* Header skeleton */}
            <div className='mb-6 flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <div className='mr-2 h-12 w-3 rounded-sm bg-gradient-to-b from-orange-500 to-blue-500'></div>
                {showTitle ? (
                  <div className='bg-muted h-6 w-48 animate-pulse rounded md:h-8 md:w-64'></div>
                ) : null}
              </div>
              {showViewAll ? (
                <div className='bg-muted h-4 w-20 animate-pulse rounded'></div>
              ) : null}
            </div>

            {/* Desktop view - Grid layout skeleton */}
            <div className='hidden gap-4 lg:grid lg:grid-cols-3'>
              {Array.from({ length: Math.min(itemCount, itemsPerPage) }).map(
                (_, index) => (
                  <JobCardSkeleton key={`desktop-${index}`} />
                )
              )}
            </div>

            {/* Mobile view - Carousel skeleton */}
            <div className='lg:hidden'>
              <div className='overflow-hidden'>
                <div className='flex'>
                  {Array.from({ length: Math.min(itemCount, 6) }).map(
                    (_, index) => (
                      <div
                        key={`mobile-${index}`}
                        className='min-w-0 flex-[0_0_100%] pl-4 first:pl-0 md:flex-[0_0_50%]'
                      >
                        <JobCardSkeleton />
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Mobile pagination dots skeleton */}
              <div className='mt-4 flex flex-wrap items-center justify-center'>
                <Button
                  variant='ghost'
                  size='icon'
                  className='h-8 w-8'
                  disabled
                >
                  <ChevronLeft className='h-4 w-4' />
                </Button>

                {Array.from({ length: Math.min(mobileSlideCount, 5) }).map(
                  (_, i) => (
                    <Button
                      key={`mobile-dot-${i}`}
                      variant='ghost'
                      size='icon'
                      className={cn(
                        'mx-1 h-2 w-2 rounded-full p-0 transition-colors duration-200',
                        i === 0 ? 'bg-primary' : 'bg-muted'
                      )}
                      disabled
                    />
                  )
                )}

                <Button
                  variant='ghost'
                  size='icon'
                  className='h-8 w-8'
                  disabled
                >
                  <ChevronRight className='h-4 w-4' />
                </Button>
              </div>
            </div>

            {/* Desktop pagination dots skeleton */}
            <div className='mt-8 hidden items-center justify-center lg:flex'>
              <Button variant='ghost' size='icon' className='h-8 w-8' disabled>
                <ChevronLeft className='h-4 w-4' />
              </Button>

              {Array.from({ length: Math.min(totalDesktopPages, 5) }).map(
                (_, i) => (
                  <Button
                    key={`desktop-dot-${i}`}
                    variant='ghost'
                    size='icon'
                    className={cn(
                      'mx-1 h-2 w-2 rounded-full p-0 transition-colors duration-200',
                      i === 0 ? 'bg-primary' : 'bg-muted'
                    )}
                    disabled
                  />
                )
              )}

              <Button variant='ghost' size='icon' className='h-8 w-8' disabled>
                <ChevronRight className='h-4 w-4' />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
