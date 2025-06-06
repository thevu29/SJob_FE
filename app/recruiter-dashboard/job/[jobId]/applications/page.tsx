import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import PageContainer from '@/components/layout/page-layout';
import ApplicationListingPage from '@/features/recruiter/pages/application-listing/application-listing';

export const metadata = {
  title: 'Đơn ứng tuyển'
};

export default function Page() {
  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading title='Quản lý đơn ứng tuyển' description='' />
        </div>
        <Separator />
        <ApplicationListingPage />
      </div>
    </PageContainer>
  );
}
