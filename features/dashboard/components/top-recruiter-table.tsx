'use client';

import { useGet } from '@/hooks';
import type { IGetTopRecruiter } from '@/interfaces';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { TopRecruiterTableSkeleton } from './top-recruiter-tabke-skeleton';
import { shortenName } from '@/lib/utils';
import { LongText } from '@/components/common/long-text';

export function TopRecruiterTable() {
  const { data: recruiters, isLoading } = useGet<IGetTopRecruiter[]>(
    '/jobs/top-recruiters',
    ['top-recruiters']
  );

  if (isLoading) {
    return <TopRecruiterTableSkeleton />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top nhà tuyển dụng</CardTitle>
        <CardDescription>
          Các nhà tuyển dụng đăng việc làm nhiều nhất
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-8'>
          {recruiters &&
            recruiters.data &&
            recruiters.data.length > 0 &&
            recruiters.data.map((recruiter) => (
              <div key={recruiter.id} className='flex items-center'>
                <Avatar className='h-9 w-9'>
                  <AvatarImage src={recruiter.image} alt='Avatar' />
                  <AvatarFallback>{shortenName(recruiter.name)}</AvatarFallback>
                </Avatar>
                <div className='ml-4 space-y-1'>
                  <LongText className='max-w-[350px] text-sm'>{recruiter.name}</LongText>
                  <p className='text-muted-foreground text-sm'>
                    {recruiter.email}
                  </p>
                </div>
                <div className='ml-auto font-medium'>+{recruiter.jobs}</div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
