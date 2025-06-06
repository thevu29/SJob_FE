'use client';
import { Card, CardContent } from '@/components/ui/card';
import SavedJobsListing from '@/features/user/pages/saved-jobs/components/saved-jobs-listing';
import { useGetCurrentUser } from '@/hooks';

export default function SavedJobs() {
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
            <h3 className='text-lg font-semibold'>Việc làm đã lưu</h3>
            {user && user.data && <SavedJobsListing user={user.data} />}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
