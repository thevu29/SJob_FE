import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export default function JobCardSkeleton() {
  return (
    <Card className='border-border mt-4 overflow-hidden border transition-shadow duration-300 hover:shadow-md'>
      <CardContent className='p-0'>
        <div className='grid grid-cols-12 gap-4'>
          <div className='col-span-12 p-4 md:col-span-9'>
            <div className='flex items-start gap-4'>
              <Skeleton className='h-20 w-20 rounded-md bg-gray-300' />
              <div className='min-w-0 flex-1'>
                <Skeleton className='mb-2 h-5 w-3/4 bg-gray-300' />
                <Skeleton className='mb-2 h-4 w-1/2 bg-gray-300' />
                <Skeleton className='mb-2 h-3 w-1/4 bg-gray-300' />
              </div>
            </div>
          </div>
          <div className='col-span-12 flex flex-col justify-between p-4 md:col-span-3'>
            <Skeleton className='h-6 w-3/4 bg-gray-300' />
            <div className='mt-auto flex justify-end gap-2'>
              <Skeleton className='h-10 w-24 bg-gray-300' />
              <Skeleton className='h-8 w-8 rounded-full bg-gray-300' />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
