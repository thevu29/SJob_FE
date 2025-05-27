import Link from 'next/link';
import { Suspense } from 'react';
import { Plus } from 'lucide-react';
import { SearchParams } from 'nuqs/server';

import { cn } from '@/lib/utils';
import { searchParamsCache, serialize } from '@/lib/searchparams';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { buttonVariants } from '@/components/ui/button';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import PageContainer from '@/components/layout/page-layout';
import AdminListingPage from '@/features/dashboard/admin/components/admin-listing';
import AdminTableAction from '@/features/dashboard/admin/components/tables/admin-table-action';

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export const metadata = {
  title: 'Dashboard : Admin'
};

export default async function Page(props: pageProps) {
  const searchParams = await props.searchParams;
  searchParamsCache.parse(searchParams);

  const key = serialize({ ...searchParams });

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading title='Admin' description='Quản lý admins' />
          <Link
            href='/dashboard/admin/new'
            className={cn(buttonVariants(), 'text-xs md:text-sm')}
          >
            <Plus className='mr-2 h-4 w-4' /> Tạo mới
          </Link>
        </div>
        <Separator />
        <AdminTableAction />
        <Suspense
          key={key}
          fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
        >
          <AdminListingPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
