import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import placeholder from '@/public/placeholder.jpg';
import { FieldDetail } from '@/interfaces';
import { useGetPaginatedPublic } from '@/hooks';
import { Job } from '@/interfaces/job';
import qs from 'qs';
import { formatSalary } from '@/lib/utils';
import { ROUTES } from '@/constants/routes';

interface SimilarJob {
  id: string;
  title: string;
  company: string;
  logo: string;
  salary: string;
  location: string;
}

interface SimilarJobsProps {
  fieldDetails: FieldDetail[];
}

export default function SimilarJobs({ fieldDetails }: SimilarJobsProps) {
  const currentPage = 1;
  const pageSize = 10;
  const fieldDetailIds = fieldDetails.map((field) => field.id);
  const { data, isLoading } = useGetPaginatedPublic<Job>(
    'jobs',
    currentPage,
    pageSize,
    ['jobs', ...fieldDetailIds],
    {
      params: {
        ...(fieldDetailIds.length > 0 && { fieldDetailIds })
      },
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: 'repeat' })
    }
  );
  return (
    <Card>
      <CardHeader className='pb-3'>
        <CardTitle className='text-lg'>Việc làm tương tự</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {data &&
          data.data &&
          data.data.map((job) => (
            <Link
              key={job.id}
              href={ROUTES.JOBSEEKER.JOBS.DETAIL(job.id)}
              className='hover:bg-muted flex gap-3 rounded-md p-3 transition-colors'
            >
              <div className='shrink-0'>
                <Image
                  src={job.recruiterImage || placeholder}
                  alt={job.recruiterName}
                  width={48}
                  height={48}
                  className='bg-muted rounded-md object-contain'
                />
              </div>
              <div className='min-w-0 flex-1'>
                <h3 className='line-clamp-1 text-sm font-medium'>{job.name}</h3>
                <p className='text-muted-foreground line-clamp-1 text-xs'>
                  {job.recruiterName}
                </p>
                <p className='text-primary mt-1 text-xs font-medium'>
                  {formatSalary(job.salary)}
                </p>
                <p className='text-muted-foreground text-xs'>
                  {job.recruiterAddress}
                </p>
              </div>
            </Link>
          ))}
      </CardContent>
    </Card>
  );
}
