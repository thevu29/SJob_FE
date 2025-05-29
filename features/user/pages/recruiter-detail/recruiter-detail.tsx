'use client';

import RecruiterDetailInfo from '@/features/user/pages/recruiter-detail/components/recruiter-detail-info';
import RecruiterDetailJobs from '@/features/user/pages/recruiter-detail/components/recruiter-detail-jobs';
import { useParams } from 'next/navigation';

export default function RecruiterDetailPage() {
  const params = useParams();
  const recruiterId = params.recruiterId as string;

  return (
    <div className='bg-background container mx-auto min-h-screen overflow-hidden rounded-lg md:rounded-xl'>
      <RecruiterDetailInfo recruiterId={recruiterId} />
      <RecruiterDetailJobs recruiterId={recruiterId} />
    </div>
  );
}
