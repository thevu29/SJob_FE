import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import RecruiterViewPage from '@/features/recruiters/components/recruiter-view-page';
import { Suspense } from 'react';

export const metadata = {
  title: 'Dashboard : Recruiter View'
};

type PageProps = { params: Promise<{ recruiterId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<FormCardSkeleton />}>
          <RecruiterViewPage recruiterId={params.recruiterId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
