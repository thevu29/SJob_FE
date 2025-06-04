'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { JobSeeker } from '@/interfaces';
import { CheckCircle, Clock, MapPin, User, Mail, Phone } from 'lucide-react';
import React from 'react';
import placeholder from '@/public/placeholder.jpg';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface JobSeekerSuggestedCardProps {
  jobSeeker: JobSeeker;
}
export default function JobSeekerSuggestedCard({
  jobSeeker
}: JobSeekerSuggestedCardProps) {
  const router = useRouter();
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };
  const viewProfile = () => {
    router.push(`/recruiter-dashboard/job-seeker/${jobSeeker.id}`);
  };
  return (
    <Card
      key={jobSeeker.id}
      className='border-border/50 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg'
    >
      <CardContent className='p-6'>
        {/* Header with Avatar and Status */}
        <div className='mb-4 flex items-start justify-between'>
          <div className='flex min-w-0 flex-1 items-center space-x-3'>
            <Avatar className='ring-primary/10 h-12 w-12 flex-shrink-0 ring-2'>
              <AvatarImage
                src={jobSeeker.image ?? placeholder}
                alt={jobSeeker.name}
              />
              <AvatarFallback className='bg-primary/10 text-primary text-sm font-semibold'>
                {getInitials(jobSeeker.name)}
              </AvatarFallback>
            </Avatar>
            <div className='min-w-0 flex-1'>
              <h3
                className='text-foreground truncate text-base font-semibold'
                title={jobSeeker.name}
              >
                {jobSeeker.name}
              </h3>
              {jobSeeker.field && (
                <p
                  className='text-primary truncate text-sm font-medium'
                  title={jobSeeker.field}
                >
                  {jobSeeker.field}
                </p>
              )}
            </div>
          </div>
          <Badge
            variant={jobSeeker.seeking ? 'default' : 'secondary'}
            className='ml-2 flex flex-shrink-0 items-center gap-1 text-xs'
          >
            <CheckCircle className='h-3 w-3' />
            Đang tìm việc
            {/* {jobSeeker.seeking ? (
              <>
                
              </>
            ) : (
              <>
                <Clock className='h-3 w-3' />
                Busy
              </>
            )} */}
          </Badge>
        </div>

        {/* Location */}
        {jobSeeker.address && (
          <div className='text-muted-foreground mb-4 flex items-center'>
            <MapPin className='mr-2 h-4 w-4 flex-shrink-0' />
            <span className='truncate text-sm'>{jobSeeker.address}</span>
          </div>
        )}

        {/* About */}
        <div className='mb-6'>
          <p className='text-muted-foreground text-sm leading-relaxed'>
            {truncateText(jobSeeker.about || '', 100)}
          </p>
        </div>

        {/* Contact Actions */}
        <div className='flex gap-2'>
          <Button
            size='sm'
            className='flex-1'
            disabled={!jobSeeker.seeking}
            asChild
          >
            <Link href={`/recruiter-dashboard/job-seeker/${jobSeeker.id}`}>
              <User className='mr-2 h-4 w-4' />
              Hồ sơ chi tiết
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
