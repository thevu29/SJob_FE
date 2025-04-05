import Link from 'next/link';
import { Suspense } from 'react';
import { Plus } from 'lucide-react';
import { SearchParams } from 'nuqs/server';

import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { searchParamsCache, serialize } from '@/lib/searchparams';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import PageContainer from '@/components/layout/page-layout';
import JobSeekerListingPage from '@/features/dashboard/job-seeker/components/job-seeker-listing';
import JobSeekerTableAction from '@/features/dashboard/job-seeker/components/tables/job-seeker-table-action';

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export const metadata = {
  title: 'Dashboard : Ứng viên'
};

export default async function Page(props: pageProps) {
  const searchParams = await props.searchParams;
  searchParamsCache.parse(searchParams);

  const key = serialize({ ...searchParams });

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading title='Ứng viên' description='Quản lý ứng viên' />
        </div>
        <Separator />
        <JobSeekerTableAction />
        <Suspense
          key={key}
          fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
        >
          <JobSeekerListingPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
