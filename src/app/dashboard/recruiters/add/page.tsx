import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import RecruiterViewPage from '@/features/recruiters/components/recruiter-view-page';
import { Suspense } from 'react';

export const metadata = {
  title: 'Thêm mới nhà tuyển dụng'
};

// type PageProps = { params: Promise<{ recruiterId: string }> };

export default async function Page() {
  let recruiterId = 'add';
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<FormCardSkeleton />}>
          <RecruiterViewPage recruiterId={recruiterId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
