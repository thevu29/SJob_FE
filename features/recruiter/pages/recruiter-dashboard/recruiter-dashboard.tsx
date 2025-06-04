import { JobManagementCard } from '@/features/recruiter/pages/recruiter-dashboard/components/job-management-card';
import { JobStatusCard } from '@/features/recruiter/pages/recruiter-dashboard/components/job-status-card';
import { ReportCard } from '@/features/recruiter/pages/recruiter-dashboard/components/report-card';
import { WelcomeCard } from '@/features/recruiter/pages/recruiter-dashboard/components/welcome-card';

export function RecruiterDashboardPage() {
  return (
    <div className='mx-auto max-w-7xl space-y-6'>
      <div className='grid gap-6 md:grid-cols-2'>
        <WelcomeCard />
        <ReportCard />
      </div>
      <div className='grid gap-6 md:grid-cols-1'>
        <JobManagementCard />
      </div>
      <div className='grid gap-6 md:grid-cols-1'>
        <JobStatusCard />
      </div>
    </div>
  );
}
