import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import JobTableAction from '@/features/recruiter/pages/job-listing/components/tables/job-table-action';
import JobListingPage from '@/features/recruiter/pages/job-listing/job-listing';
import { searchParamsCache, serialize } from '@/lib/searchparams';
import { SearchParams } from 'nuqs/server';
import React, { Suspense } from 'react';
import PageContainer from '@/components/layout/page-layout';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export const metadata = {
  title: 'Quản lý công việc đăng tuyển'
};

export default async function Page(props: pageProps) {
  const searchParams = await props.searchParams;
  searchParamsCache.parse(searchParams);

  const key = serialize({ ...searchParams });

  return (
    <PageContainer scrollable={false}>
      <div className='bg-background flex flex-1 flex-col space-y-4 overflow-auto rounded-sm p-4 md:rounded-lg md:p-6'>
        <div className='flex w-full items-start justify-between'>
          <Heading
            title='Quản lý các công việc đã đăng tuyển'
            description=''
            // description='Quản lý các công việc đã đăng tuyển'
          />
        </div>
        <Separator />
        <JobTableAction />
        <Suspense
          key={key}
          fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
        >
          <JobListingPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
