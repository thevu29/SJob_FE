import Image from 'next/image';
import { MapPin, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { formatEmployeeCount } from '@/lib/utils';
import placeholder from '@/public/placeholder.jpg';
import Link from 'next/link';
import { Job } from '@/interfaces/job';

interface CompanyInfoProps {
  job: Job;
}

export default function CompanyInfo({ job }: CompanyInfoProps) {
  return (
    <Card>
      <CardContent className='p-6'>
        <div className='flex flex-col items-center text-center'>
          <div className='relative mb-4 h-24 w-24 overflow-hidden'>
            <Image
              src={job.recruiterImage || placeholder}
              alt={job.recruiterName}
              width={96}
              height={96}
              className='object-contain'
            />
          </div>
          <Link href={`/recruiter/${job.recruiterId}`} className='w-full'>
            <h2 className='text-xl font-bold'>{job.recruiterName}</h2>
          </Link>

          <div className='mt-4 w-full space-y-3'>
            {job.recruiterAddress && (
              <div className='flex items-start gap-2 text-sm'>
                <MapPin className='mt-0.5 h-4 w-4 shrink-0' />
                <div className='text-left'>
                  <span>{job.recruiterAddress}</span>
                </div>
              </div>
            )}

            <div className='flex items-center gap-2 text-sm'>
              <Users className='h-4 w-4 shrink-0' />
              <span>{formatEmployeeCount(job.recruiterMembers)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
