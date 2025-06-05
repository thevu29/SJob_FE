import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export default function JobHeaderSkeleton() {
  return (
    <div className='mb-2 text-center'>
      <Skeleton className='mx-auto mb-4 h-9 w-3/4 max-w-2xl' />
      <Skeleton className='mx-auto h-6 w-1/2 max-w-lg' />
    </div>
  );
}
