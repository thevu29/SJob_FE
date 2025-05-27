import { Suspense } from 'react';
import { SearchParams } from 'nuqs/server';

import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { searchParamsCache, serialize } from '@/lib/searchparams';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import PageContainer from '@/components/layout/page-layout';
import RecruiterListingPage from '@/features/dashboard/recruiter/components/recruiter-listing';
import RecruiterTableAction from '@/features/dashboard/recruiter/components/tables/recruiter-table-action';

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export const metadata = {
  title: 'Dashboard : Nhà tuyển dụng'
};

export default async function Page(props: pageProps) {
  const searchParams = await props.searchParams;
  searchParamsCache.parse(searchParams);

  const key = serialize({ ...searchParams });

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4 overflow-hidden'>
        <div className='flex items-start justify-between'>
          <Heading
            title='Nhà tuyển dụng'
            description='Quản lý nhà tuyển dụng'
          />
        </div>
        <Separator />
        <RecruiterTableAction />
        <Suspense
          key={key}
          fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
        >
          <RecruiterListingPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
