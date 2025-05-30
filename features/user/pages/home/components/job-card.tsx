import { Card, CardContent } from '@/components/ui/card';
import { ROUTES } from '@/constants/routes';
import { useGetCurrentUser, usePost } from '@/hooks';
import { Job, ViewedJob } from '@/interfaces/job';
import { formatSalary } from '@/lib/utils';
import { AxiosError } from 'axios';
import Image from 'next/image';
import Link from 'next/link';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const { data: user } = useGetCurrentUser();
  const createViewJobMutation = usePost<ViewedJob>('viewed-jobs', {
    onError: (error: AxiosError) => {
      console.error('Failed to create view job:', error);
    }
  });

  const onClickViewJob = async () => {
    if (!user?.data.id) return;
    const payload = {
      jobSeekerId: user.data.id,
      jobId: job.id
    };
    await createViewJobMutation.mutateAsync(payload);
  };
  return (
    <Card
      className='overflow-hidden border transition-shadow duration-300 hover:shadow-md'
      onClick={onClickViewJob}
    >
      <CardContent className='p-4'>
        <Link
          href={ROUTES.JOBSEEKER.JOBS.DETAIL(job.id)}
          className='flex items-start gap-4'
        >
          {job.recruiterImage ? (
            <div className='relative h-12 w-12 flex-shrink-0'>
              <Image
                src={job.recruiterImage || '/placeholder.svg'}
                alt={job.recruiterName}
                width={48}
                height={48}
                className='object-contain'
              />
            </div>
          ) : (
            <div className='bg-muted/20 flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-md'>
              <div className='bg-muted h-12 w-12 rounded-md'></div>
            </div>
          )}

          <div className='min-w-0 flex-1'>
            <div className='flex items-start justify-between gap-2'>
              <h3 className='line-clamp-1 text-sm font-medium'>{job.name}</h3>
              {/* {job.hot && (
                <Badge
                  variant='destructive'
                  className='shrink-0 px-1.5 py-0 text-xs'
                >
                  Hot
                </Badge>
              )} */}
            </div>
            <p className='text-muted-foreground mt-1 line-clamp-1 text-sm'>
              {job.recruiterName}
            </p>
            <p className='text-color-5 mt-1 text-sm'>
              {job.salary && formatSalary(job.salary)}
            </p>
            {/* <p className='text-muted-foreground mt-1 line-clamp-1 text-sm'>
              {job.location}
            </p> */}
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}
