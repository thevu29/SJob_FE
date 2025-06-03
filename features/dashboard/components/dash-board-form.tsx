'use client';

import { User, Users, FileUser, NotepadText } from 'lucide-react';

import type {
  IGetJobCountInMonth,
  IGetRecruiterCountInMonth,
  IGetJobSeekerCountInMonth,
  IGetApplicationCountInMonth
} from '@/interfaces';
import { useGet } from '@/hooks';

import { StatCard } from './stat-card';
import { JobChart } from './job-chart';
import { SubscriptionChart } from './subscription-chart';
import { TopRecruiterTable } from './top-recruiter-table';

export function DashboardForm() {
  const { data: jobSeekerCount } = useGet<IGetJobSeekerCountInMonth>(
    '/job-seekers/count-in-month',
    ['job-seeker-count-in-month']
  );

  const { data: recruiterCount } = useGet<IGetRecruiterCountInMonth>(
    '/recruiters/count-in-month',
    ['recruiter-count-in-month']
  );

  const { data: jobCount } = useGet<IGetJobCountInMonth>(
    '/jobs/count-in-month',
    ['job-count-in-month']
  );

  const { data: applicationCount } = useGet<IGetApplicationCountInMonth>(
    '/applications/count-in-month',
    ['application-count-in-month']
  );

  return (
    <div className='flex flex-1 flex-col space-y-2'>
      <div className='flex items-center justify-between space-y-2'>
        <h2 className='text-2xl font-bold tracking-tight'>
          Chào mừng trở lại 👋
        </h2>
      </div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {jobSeekerCount && jobSeekerCount.data && (
          <StatCard
            title='Ứng viên đăng ký'
            value={jobSeekerCount.data.jobSeekers}
            percentageChange={Math.floor(jobSeekerCount.data.percentageChange)}
            icon={User}
          />
        )}
        {recruiterCount && recruiterCount.data && (
          <StatCard
            title='Nhà tuyển dụng đăng ký'
            value={recruiterCount.data.recruiters}
            percentageChange={Math.floor(recruiterCount.data.percentageChange)}
            icon={Users}
          />
        )}
        {jobCount && jobCount.data && (
          <StatCard
            title='Việc làm đăng tuyển'
            value={jobCount.data.jobs}
            percentageChange={Math.floor(jobCount.data.percentageChange)}
            icon={NotepadText}
          />
        )}
        {applicationCount && applicationCount.data && (
          <StatCard
            title='Đơn ứng tuyển'
            value={applicationCount.data.applications}
            percentageChange={Math.floor(
              applicationCount.data.percentageChange
            )}
            icon={FileUser}
          />
        )}
      </div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7'>
        <div className='col-span-7'>
          <SubscriptionChart />
        </div>
        <div className='col-span-4'>
          <JobChart />
        </div>
        <div className='col-span-3'>
          <TopRecruiterTable />
        </div>
      </div>
    </div>
  );
}
