'use client';

import { useParams } from 'next/navigation';

import RecruiterDetailInfo from '@/features/user/pages/recruiter-detail/components/recruiter-detail-info';
import RecruiterDetailJobs from '@/features/user/pages/recruiter-detail/components/recruiter-detail-jobs';

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
