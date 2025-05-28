'use client';

import { Avatar } from '@/components/ui/avatar';
import { useGet, useGetPaginated } from '@/hooks/useQueries';
import { Recruiter } from '@/interfaces';
import Image from 'next/image';
import { useParams, useSearchParams } from 'next/navigation';
import placeholder from '@/public/placeholder.jpg';
import { formatEmployeeCount } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DOMPurify from 'isomorphic-dompurify';
import { LoadingPage } from '@/components/common/loading';
import { Building, MapPin, User } from 'lucide-react';
import Link from 'next/link';
import SearchInput from '@/features/user/components/common/search-input';
import JobListing from '@/features/user/components/common/job-listing';
import { Job } from '@/interfaces/job';
import { RecruiterDetailSkeleton } from '@/features/user/pages/recruiter-detail/components/recruiter-detail-skeleton';
import JobCardSkeleton from '@/features/user/components/common/job-card-skeleton';

export default function RecruiterDetailPage() {
  const searchParams = useSearchParams();
  const params = useParams();
  const recruiterId = params.recruiterId as string;
  // const recruiterId = '68144e36647b71355acf11d1';

  const query = searchParams.get('query') || '';
  const currentPage = Number(searchParams.get('page') || '1');
  const pageSize = Number(searchParams.get('limit') || '10');

  const { data: JobsData, isLoading: isJobsLoading } = useGetPaginated<Job>(
    'jobs',
    currentPage,
    pageSize,
    ['jobs', query, recruiterId],
    {
      params: {
        ...(query && { query }),
        ...(recruiterId && { recruiterId })
      }
    }
  );
  const { data: RecruiterData, isLoading: isRecruiterLoading } =
    useGet<Recruiter>('recruiters/' + recruiterId, ['recruiters', recruiterId]);

  const recruiter = RecruiterData?.data;

  // Show skeleton while recruiter data is loading
  if (isRecruiterLoading) {
    return <RecruiterDetailSkeleton />;
  }

  return (
    <div className='bg-background mx-auto min-h-screen max-w-7xl overflow-hidden rounded-lg md:rounded-xl'>
      {/* Header */}
      <div className='bg-secondary relative h-48 md:h-64'>
        <div className='container mx-auto px-4'>
          <div className='absolute -bottom-20 flex flex-col items-start gap-4 md:-bottom-24 md:flex-row md:items-end'>
            {recruiter && recruiter.image && (
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
            )}
            <div className='w-full p-4 md:w-auto'>
              {/* <div className='bg-card w-full rounded-lg p-4 shadow-md md:w-auto'> */}
              <div className='flex flex-col items-start justify-between gap-2 md:flex-row md:items-center md:gap-8'>
                <div>
                  {recruiter && recruiter.name && (
                    <h1 className='text-2xl font-bold md:text-3xl'>
                      {recruiter.name}
                    </h1>
                  )}

                  <div className='mt-2 flex items-center justify-center gap-6'>
                    {recruiter && recruiter.website && (
                      <Link
                        href={recruiter.website}
                        target='_blank'
                        className='text-muted-foreground flex items-center'
                      >
                        <Building className='mr-2 h-4 w-4' />
                        <span>{recruiter.website}</span>
                      </Link>
                    )}
                    <div className='text-muted-foreground flex items-center'>
                      <User className='mr-2 h-4 w-4' />
                      {recruiter && recruiter.members && (
                        <span>{formatEmployeeCount(recruiter.members)}</span>
                      )}
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
                {recruiter && recruiter.about && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(recruiter.about)
                    }}
                  ></div>
                )}
              </div>
              <div className='space-y-2'>
                <h3 className='pt-4 text-lg font-semibold'>
                  Địa điểm làm việc
                </h3>
                <div className='flex items-start gap-3'>
                  <MapPin className='text-muted-foreground mt-0.5 h-5 w-5' />
                  {recruiter && recruiter.address && (
                    <p>{recruiter?.address}</p>
                  )}
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
                  {JobsData && JobsData.data && JobsData.data.length > 0 ? (
                    <JobListing
                      jobs={JobsData.data}
                      currentPage={currentPage}
                      totalPages={JobsData?.meta.totalPages as number}
                    />
                  ) : (
                    Array(3)
                      .fill(0)
                      .map((_, index) => <JobCardSkeleton key={index} />)
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
