'use client';

import { Avatar } from '@/components/ui/avatar';
import { useGet } from '@/hooks/use-queries';
import { Recruiter } from '@/interfaces';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import placeholder from '@/public/placeholder.jpg';
import { formatEmployeeCount } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DOMPurify from 'isomorphic-dompurify';
import { LoadingPage } from '@/components/common/loading';
import { Building, MapPin, User } from 'lucide-react';
import Link from 'next/link';
import SearchInput from '@/features/user/components/common/search-input';
import JobListing from '@/features/user/components/common/job-listing';

export default function RecruiterDetailPage() {
  //   const params = useParams();
  //   const recruiterId = params.recruiterId as string;
  const recruiterId = '68144e36647b71355acf11d1';
  const { data: recruiterData, isLoading } = useGet<Recruiter>(
    'recruiters/' + recruiterId,
    ['recruiterId', recruiterId]
  );

  const recruiter = recruiterData?.data as Recruiter;
  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className='bg-background mx-auto min-h-screen max-w-7xl overflow-hidden rounded-lg md:rounded-xl'>
      {/* Header */}
      <div className='bg-secondary relative h-48 md:h-64'>
        <div className='container mx-auto px-4'>
          <div className='absolute -bottom-20 flex flex-col items-start gap-4 md:-bottom-24 md:flex-row md:items-end'>
            <Avatar className='border-background h-32 w-32 rounded-full border-4 md:h-48 md:w-48'>
              <Image
                src={recruiter?.image || placeholder}
                alt='Profile picture'
                loading='eager'
                quality={100}
                width={200}
                height={200}
                className='h-full w-full rounded-full object-cover'
              />
            </Avatar>
            <div className='w-full p-4 md:w-auto'>
              {/* <div className='bg-card w-full rounded-lg p-4 shadow-md md:w-auto'> */}
              <div className='flex flex-col items-start justify-between gap-2 md:flex-row md:items-center md:gap-8'>
                <div>
                  <h1 className='text-2xl font-bold md:text-3xl'>
                    {recruiter?.name}
                  </h1>
                  <div className='mt-2 flex items-center justify-center gap-6'>
                    <Link
                      href={recruiter?.website}
                      target='_blank'
                      className='text-muted-foreground flex items-center'
                    >
                      <Building className='mr-2 h-4 w-4' />
                      <span>{recruiter?.website}</span>
                    </Link>
                    <div className='text-muted-foreground flex items-center'>
                      <User className='mr-2 h-4 w-4' />
                      <span>{formatEmployeeCount(recruiter?.members)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className='container mx-auto px-4 pt-24 pb-16 md:pt-32'>
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
          {/* Bio */}
          <Card className='lg:col-span-3'>
            {/* <CardHeader>
              <CardTitle className='text-xl'>Giới thiệu</CardTitle>
            </CardHeader> */}
            <CardContent>
              <div className='space-y-2'>
                <h3 className='text-lg font-semibold'>Giới thiệu</h3>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(recruiter?.about)
                  }}
                ></div>
              </div>
              <div className='space-y-2'>
                <h3 className='pt-4 text-lg font-semibold'>
                  Địa điểm làm việc
                </h3>
                <div className='flex items-start gap-3'>
                  <MapPin className='text-muted-foreground mt-0.5 h-5 w-5' />
                  <p>{recruiter?.address}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bio */}
          <Card className='lg:col-span-3'>
            {/* <CardHeader>
              <CardTitle className='text-xl'>Giới thiệu</CardTitle>
            </CardHeader> */}
            <CardContent>
              <div className='space-y-2'>
                <h3 className='text-lg font-semibold'>Tuyển dụng</h3>
                <div>
                  <SearchInput />
                  <JobListing />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
