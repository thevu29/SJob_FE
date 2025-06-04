import JobSeekerSearch from '@/features/recruiter/pages/jobseeker-search/jobseeker-search';

import { Suspense } from 'react';
import { SearchParams } from 'nuqs/server';

import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { searchParamsCache, serialize } from '@/lib/searchparams';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import PageContainer from '@/components/layout/page-layout';
import JobSeekerSearchTableAction from '@/features/recruiter/pages/jobseeker-search/components/tables/jobseeker-search-table-action';

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export const metadata = {
  title: 'Tìm ứng viên'
};

export default async function Page(props: pageProps) {
  const searchParams = await props.searchParams;
  searchParamsCache.parse(searchParams);

  const key = serialize({ ...searchParams });

  return (
    <PageContainer scrollable={false}>
      <div className='bg-background flex flex-1 flex-col space-y-4 overflow-auto rounded-sm p-4 md:rounded-lg md:p-6'>
        <div className='flex w-full items-start justify-between'>
          <Heading title='Tìm ứng viên' description='' />
        </div>
        <Separator />
        <JobSeekerSearchTableAction />
        <Suspense
          key={key}
          fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
        >
          <JobSeekerSearch />
        </Suspense>
      </div>
    </PageContainer>
  );
}
