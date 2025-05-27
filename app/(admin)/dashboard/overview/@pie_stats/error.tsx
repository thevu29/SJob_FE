'use client';

import { AlertCircle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function StatsError({ error }: { error: Error }) {
  return (
    <Alert variant='destructive'>
      <AlertCircle className='h-4 w-4' />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Failed to load statistics: {error.message}
      </AlertDescription>
    </Alert>
  );
}
