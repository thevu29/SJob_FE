import Image from 'next/image';
import { MapPin, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Recruiter } from '@/interfaces';
import { formatEmployeeCount } from '@/lib/utils';
import placeholder from '@/public/placeholder.jpg';

interface CompanyInfoProps {
  recruiter: Recruiter;
}

export default function CompanyInfo({ recruiter }: CompanyInfoProps) {
  return (
    <Card>
      <CardContent className='p-6'>
        <div className='flex flex-col items-center text-center'>
          <div className='relative mb-4 h-24 w-24 overflow-hidden'>
            <Image
              src={recruiter.image || placeholder}
              alt='1C Vietnam LLC'
              width={96}
              height={96}
              className='object-contain'
            />
          </div>
          <h2 className='text-xl font-bold'>{recruiter.name}</h2>

          <div className='mt-4 w-full space-y-3'>
            <div className='flex items-start gap-2 text-sm'>
              <MapPin className='mt-0.5 h-4 w-4 shrink-0' />
              <div className='text-left'>
                <span>{recruiter.address}</span>
              </div>
            </div>

            <div className='flex items-center gap-2 text-sm'>
              <Users className='h-4 w-4 shrink-0' />
              <span>{formatEmployeeCount(recruiter.members)}</span>
            </div>

            {/* <div className='flex items-center gap-2 text-sm'>
              <span className='bg-primary/10 flex h-4 w-4 shrink-0 items-center justify-center rounded text-xs'>
                HR
              </span>
              <span>Hr Department</span>
            </div> */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
