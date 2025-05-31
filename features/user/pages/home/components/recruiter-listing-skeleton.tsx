'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function RecruiterListingSkeleton() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // These functions won't do anything in the skeleton but are kept for structure
  const scrollLeft = () => {};
  const scrollRight = () => {};

  // Create an array of 6 placeholder items
  const skeletonItems = Array(6).fill(null);

  return (
    <section className='container mx-auto px-4 py-8'>
      <Card className='border-border border'>
        <CardHeader className='pb-0'>
          <CardTitle className='text-2xl font-bold'>
            <div className='bg-muted h-8 w-48 animate-pulse rounded-md'></div>
          </CardTitle>
        </CardHeader>
        <CardContent className='pt-6'>
          <div className='relative'>
            <div
              ref={scrollContainerRef}
              className='scrollbar-hide flex gap-4 overflow-x-hidden pb-4'
            >
              {skeletonItems.map((_, index) => (
                <Card
                  key={index}
                  className='border-border w-48 flex-shrink-0 border'
                >
                  <CardContent className='flex flex-col items-center p-4'>
                    <div className='bg-muted mb-4 flex h-16 w-16 animate-pulse items-center justify-center rounded-full'>
                      {/* Placeholder for icon */}
                    </div>
                    <div className='bg-muted mb-2 h-4 w-24 animate-pulse rounded-md'></div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <button
              className='bg-background hover:bg-secondary active:bg-secondary/80 border-border absolute top-1/2 left-0 z-10 -translate-y-1/2 transform rounded-full border p-2 shadow-md transition-colors'
              onClick={scrollLeft}
              aria-label='Scroll left'
              disabled
            >
              <ChevronLeft className='text-muted h-5 w-5' />
            </button>

            <button
              className='bg-background hover:bg-secondary active:bg-secondary/80 border-border absolute top-1/2 right-0 z-10 -translate-y-1/2 transform rounded-full border p-2 shadow-md transition-colors'
              onClick={scrollRight}
              aria-label='Scroll right'
              disabled
            >
              <ChevronRight className='text-muted h-5 w-5' />
            </button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
