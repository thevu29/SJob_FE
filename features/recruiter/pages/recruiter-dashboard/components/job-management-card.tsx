import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import IconEmptyListJob from '@/public/icon-empty-list-job.svg';

export function JobManagementCard() {
  return (
    <Card>
      <CardHeader className='pb-2'>
        <CardTitle className='text-lg font-medium'>
          Quản lý nhanh tin đăng
        </CardTitle>
      </CardHeader>
      <CardContent className='pt-4'>
        <div className='flex flex-col items-center justify-center space-y-2 py-8 text-center'>
          <div className='relative h-64 w-64'>
            <Image
              src={IconEmptyListJob}
              alt='No jobs'
              width={256}
              height={256}
              className='h-full w-full object-contain'
            />
          </div>
          <p className='text-gray-500'>Không có việc làm nào</p>
        </div>
      </CardContent>
    </Card>
  );
}
