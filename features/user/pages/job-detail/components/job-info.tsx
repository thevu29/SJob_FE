import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { generateJobDetails } from '@/features/user/pages/job-detail/utils/generate-job-details';
import { Job } from '@/interfaces/job';
import { formatSalary, getExpirationMessage } from '@/lib/utils';
import { Clock } from 'lucide-react';
import DOMPurify from 'isomorphic-dompurify';

interface JobInfoProps {
  job: Job;
}

export default function JobInfo({ job }: JobInfoProps) {
  const details = generateJobDetails(job);

  return (
    <Card>
      <CardContent className='space-y-4'>
        <div className='space-y-4'>
          <h1 className='text-2xl font-bold md:text-3xl'>{job.name}</h1>

          <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
            <div className='text-color-5 flex items-center text-lg font-semibold'>
              {formatSalary(job.salary)}
            </div>
          </div>

          <div className='flex flex-wrap gap-4'>
            <div className='text-muted-foreground flex items-center gap-1 text-sm'>
              <Clock className='h-4 w-4' />
              <span>{getExpirationMessage(job.deadline)}</span>
            </div>
          </div>

          <div className='mt-4 flex w-full gap-2 sm:w-auto'>
            <Button className='flex-1 bg-[#ff7a59] text-white hover:bg-[#ff7a59]/90 sm:flex-none'>
              Nộp đơn
            </Button>
            <Button variant='outline' className='flex-1 sm:flex-none'>
              Lưu công việc này
            </Button>
          </div>
        </div>

        <h3 className='pt-4 text-lg font-semibold'>Mô tả công việc</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(job.description)
          }}
        ></div>

        <h3 className='pt-4 text-lg font-semibold'>Yêu cầu công việc</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(job.requirement)
          }}
        ></div>

        <h3 className='pt-4 text-lg font-semibold'>
          Các phúc lợi dành cho bạn
        </h3>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(job.benefit)
          }}
        ></div>

        <h3 className='pt-4 text-lg font-semibold'>Thông tin việc làm</h3>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          {details.map((detail, index) => (
            <div key={index} className='flex items-start gap-3'>
              <div className='bg-muted flex h-8 w-8 shrink-0 items-center justify-center rounded-full'>
                <span>{detail.icon}</span>
              </div>
              <div>
                <p className='text-muted-foreground text-xs'>{detail.label}</p>
                <p className='font-medium'>{detail.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
