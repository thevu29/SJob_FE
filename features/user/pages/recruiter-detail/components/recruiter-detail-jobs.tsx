'use client';
import { Card, CardContent } from '@/components/ui/card';
import SearchInput from '@/features/user/components/common/search-input';
import JobListing from '@/features/user/components/common/job-listing';
import JobCardSkeleton from '@/features/user/components/common/job-card-skeleton';
import { useSearchParams } from 'next/navigation';
import { useGetPaginatedPublic } from '@/hooks';
import { Job } from '@/interfaces/job';

interface RecruiterDetailJobsProps {
  recruiterId: string;
}

export default function RecruiterDetailJobs({
  recruiterId
}: RecruiterDetailJobsProps) {
  const searchParams = useSearchParams();

  const query = searchParams.get('query') || '';
  const currentPage = Number(searchParams.get('page') || '1');
  const pageSize = Number(searchParams.get('limit') || '10');

  const { data: jobs, isLoading } = useGetPaginatedPublic<Job>(
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

  return (
    <div className='px-4 pb-16'>
      <Card className='lg:col-span-3'>
        <CardContent>
          <div className='space-y-2'>
            <h3 className='text-lg font-semibold'>Tuyển dụng</h3>
            <div>
              <SearchInput />
              {isLoading
                ? Array(3)
                    .fill(0)
                    .map((_, index) => <JobCardSkeleton key={index} />)
                : jobs &&
                  jobs.data && (
                    <JobListing
                      data={jobs.data}
                      currentPage={currentPage}
                      totalPages={jobs.meta.totalPages}
                    />
                  )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
