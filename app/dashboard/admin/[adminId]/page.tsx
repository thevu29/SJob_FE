import { Suspense } from 'react';

import PageContainer from '@/components/layout/page-layout';
import FormCardSkeleton from '@/components/common/form-card-skeleton';
import AdminForm from '@/features/dashboard/admin/components/admin-form';

export const metadata = {
  title: 'Dashboard : Tạo admin'
};

export default async function Page() {
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<FormCardSkeleton />}>
          <AdminForm />
        </Suspense>
      </div>
    </PageContainer>
  );
}
