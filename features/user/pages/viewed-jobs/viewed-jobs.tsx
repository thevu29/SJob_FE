'use client';

import { Card, CardContent } from '@/components/ui/card';
import ViewedJobsListing from '@/features/user/pages/viewed-jobs/components/viewed-jobs-listing';
import { useGetCurrentUser } from '@/hooks';

export default function ViewedJobs() {
  const { data: user } = useGetCurrentUser();

  return (
    <div className='space-y-8 px-4 pb-16'>
      <Card className='lg:col-span-3'>
        <CardContent>
          <h1 className='text-3xl font-bold'>Việc Làm Của Tôi </h1>
        </CardContent>
      </Card>
      <Card className='lg:col-span-3'>
        <CardContent>
          <div className='space-y-2'>
            <h3 className='text-lg font-semibold'>Việc làm đã xem</h3>
            {user && user.data && <ViewedJobsListing user={user.data} />}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
