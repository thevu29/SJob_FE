import { Suspense } from 'react';
import { SearchParams } from 'nuqs/server';

import { searchParamsCache, serialize } from '@/lib/searchparams';
import { ReportProvider } from '@/context/admin/report/update-report-context';
import PageContainer from '@/components/layout/page-layout';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { ReportListingPage } from '@/features/dashboard/report/components/report-listing';
import { ReportTableAction } from '@/features/dashboard/report/components/tables/report-table-action';

type ReportPageProps = {
  searchParams: Promise<SearchParams>;
};

export const metadata = {
  title: 'Dashboard : Báo cáo'
};

export default async function ReportPage(props: ReportPageProps) {
  const searchParams = await props.searchParams;
  searchParamsCache.parse(searchParams);

  const key = serialize({ ...searchParams });

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4 overflow-hidden'>
        <div className='flex items-start justify-between'>
          <Heading title='Báo cáo' description='Quản lý báo cáo' />
        </div>
        <Separator />
        <ReportTableAction />
        <Suspense
          key={key}
          fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
        >
          <ReportProvider>
            <ReportListingPage />
          </ReportProvider>
        </Suspense>
      </div>
    </PageContainer>
  );
}
