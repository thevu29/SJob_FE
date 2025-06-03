import type { Metadata } from 'next';

import PageContainer from '@/components/layout/page-layout';
import { DashboardForm } from '@/features/dashboard/components/dash-board-form';

export const metadata: Metadata = {
  title: 'Dashboard'
};

export default function DashboardPage() {
  return (
    <PageContainer>
      <DashboardForm />
    </PageContainer>
  );
}
