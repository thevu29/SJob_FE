'use client';
import { Card, CardContent } from '@/components/ui/card';
import AppliedJobsListing from '@/features/user/pages/applied-jobs/components/applied-jobs-listing';
import { useGetCurrentUser } from '@/hooks';

export default function AppliedJobs() {
  const { data: user } = useGetCurrentUser();

  return (
    <div className='space-y-8 px-4 pb-16'>
      <Card className='lg:col-span-3'>
        <CardContent>
          <h2 className='text-3xl font-bold'>Việc Làm Của Tôi </h2>
        </CardContent>
      </Card>
      <Card className='lg:col-span-3'>
        <CardContent>
          <div className='space-y-2'>
            <h3 className='text-lg font-semibold'>Việc làm đã ứng tuyển</h3>
            {user && user.data && <AppliedJobsListing user={user.data} />}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
