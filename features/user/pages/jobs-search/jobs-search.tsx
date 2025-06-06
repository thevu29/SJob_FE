'use client';

import { AdvancedFilters } from '@/features/user/pages/jobs-search/components/advanced-filters';
import { Job } from '@/interfaces/job';
import SearchInput from '@/features/user/components/common/search-input';
import JobListing from '@/features/user/components/common/job-listing';
import { useSearchParams } from 'next/navigation';
import { useGetPaginatedPublic } from '@/hooks';
import { useEffect } from 'react';
import JobCardSkeleton from '@/features/user/components/common/job-card-skeleton';
import qs from 'qs';

export default function JobsSearch() {
  const searchParams = useSearchParams();

  const query = searchParams.get('query') || '';
  const currentPage = Number(searchParams.get('page') || '1');
  const pageSize = Number(searchParams.get('limit') || '10');
  const experience = searchParams.get('experience') || '';
  const salary = searchParams.get('salary') || '';
  const type = searchParams.get('type') || '';
  const originalFieldDetailIds = searchParams.get('fieldDetailIds') || '';
  const fieldDetailIds = originalFieldDetailIds
    ? originalFieldDetailIds.split(',').filter((id) => id.trim() !== '')
    : [];

  const isBrowser = () => typeof window !== 'undefined';

  const { data: jobsData, isLoading } = useGetPaginatedPublic<Job>(
    'jobs',
    currentPage,
    pageSize,
    ['jobs', query, experience, salary, type, ...fieldDetailIds],
    {
      params: {
        ...(query && { query }),
        ...(experience && { experience }),
        ...(salary && { salary }),
        ...(type && { type }),
        ...(fieldDetailIds.length > 0 && { fieldDetailIds })
      },
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: 'repeat' })
    }
  );

  useEffect(() => {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className='container mx-auto px-4 py-4 md:px-6 lg:px-8'>
      <div className='bg-primary/5 mb-6 rounded-lg p-4'>
        <SearchInput />
      </div>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-12'>
        <div className='w-full lg:col-span-4'>
          <div className='w-full space-y-6 py-4'>
            <AdvancedFilters />
          </div>
        </div>

        <div className='min-h-[600px] space-y-4 lg:col-span-8'>
          {isLoading
            ? Array(10)
                .fill(0)
                .map((_, index) => <JobCardSkeleton key={index} />)
            : jobsData &&
              jobsData.data && (
                <JobListing
                  data={jobsData.data}
                  currentPage={currentPage}
                  totalPages={jobsData.meta.totalPages as number}
                />
              )}
        </div>
      </div>
    </div>
  );
}
