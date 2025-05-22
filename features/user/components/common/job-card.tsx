import { Heart } from 'lucide-react';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Job } from '@/interfaces/job';
import placeholder from '@/public/placeholder.jpg';
import { Recruiter } from '@/interfaces';

interface JobCardProps {
  job: Job;
  recruiter: Recruiter;
}

export function JobCard({ job, recruiter }: JobCardProps) {
  return (
    <Card className='border-border mt-4 overflow-hidden border transition-shadow duration-300 hover:shadow-md'>
      <CardContent className='p-0'>
        <div className='grid grid-cols-12 gap-4'>
          <div className='col-span-12 p-4 md:col-span-9'>
            <div className='flex items-start gap-4'>
              <div className='hidden flex-shrink-0 sm:block'>
                <Image
                  src={recruiter?.image || placeholder}
                  alt={recruiter?.name || 'Recruiter Logo'}
                  width={80}
                  height={80}
                  loading='lazy'
                  className='rounded-md border bg-white object-contain p-2'
                />
              </div>
              <div className='min-w-0 flex-1'>
                <h3 className='mb-1 line-clamp-2 text-lg font-semibold'>
                  {job?.name}
                </h3>
                <p className='text-muted-foreground mb-2 text-sm'>
                  {recruiter?.name}
                </p>
                <div className='mb-2 flex'>
                  {job.experience && (
                    <Badge variant='outline' className='bg-muted/50'>
                      {job.experience}
                    </Badge>
                  )}
                </div>
                <div className='text-muted-foreground flex items-center text-sm'>
                  <span>Đăng {job.date}</span>
                  <span className='mx-2'>•</span>
                  <span>Đã xem</span>
                </div>
              </div>
            </div>
          </div>
          <div className='col-span-12 flex flex-col justify-between p-4 md:col-span-3'>
            <div className='flex items-center justify-items-start md:justify-end'>
              <Badge variant='outline' className='bg-muted/50 text-green-600'>
                Thoả thuận
              </Badge>
            </div>
            <div className='mt-auto flex justify-end gap-2'>
              <Button size='sm' variant='outline'>
                Ứng tuyển
              </Button>
              <Button
                variant='ghost'
                size='icon'
                className='h-8 w-8 rounded-full'
              >
                <Heart className='h-5 w-5' />
                <span className='sr-only'>Add to favorites</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
