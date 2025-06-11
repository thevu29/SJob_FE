'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import DOMPurify from 'isomorphic-dompurify';
import { Building, Mail, MapPin, TriangleAlert, User } from 'lucide-react';

import type { Recruiter } from '@/interfaces';
import { useAuthToken, useGet } from '@/hooks';
import { formatEmployeeCount } from '@/lib/utils';
import placeholder from '@/public/placeholder.jpg';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ReportModal } from '@/components/report/report-modal';
import { RecruiterDetailSkeleton } from '@/features/user/pages/recruiter-detail/components/recruiter-detail-skeleton';

interface RecruiterDetailInfoProps {
  recruiterId: string;
}

export default function RecruiterDetailInfo({
  recruiterId
}: RecruiterDetailInfoProps) {
  const { getAccessToken } = useAuthToken();
  const accessToken = getAccessToken();

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const { data: recruiter, isLoading } = useGet<Recruiter>(
    'recruiters/' + recruiterId,
    ['recruiters', recruiterId]
  );

  if (isLoading) {
    return <RecruiterDetailSkeleton />;
  }

  if (!recruiter) {
    return null;
  }

  return (
    <>
      <div className='bg-secondary relative h-48 md:h-64'>
        <div className='container mx-auto px-4'>
          <div className='absolute -bottom-20 flex flex-col items-start gap-4 md:-bottom-24 md:flex-row md:items-end'>
            <Avatar className='border-background h-32 w-32 rounded-full border-4 md:h-48 md:w-48'>
              <Image
                src={recruiter.data.image || placeholder}
                alt='Profile picture'
                loading='eager'
                quality={100}
                width={200}
                height={200}
                className='h-full w-full rounded-full object-cover'
              />
            </Avatar>

            <div className='w-full md:w-auto'>
              <div className='flex flex-col items-start justify-between gap-2 md:flex-row md:items-center md:gap-8'>
                <div>
                  <div className='flex items-center gap-4'>
                    <h1 className='text-2xl font-bold md:text-3xl'>
                      {recruiter.data.name}
                    </h1>
                    {accessToken && (
                      <Button
                        variant='ghost'
                        title='Báo cáo nhà tuyển dụng'
                        onClick={() => setIsReportModalOpen(true)}
                      >
                        <TriangleAlert className='text-red-500' />
                      </Button>
                    )}
                  </div>
                  <div className='flex items-center gap-2'>
                    <Mail className='size-3' />
                    <p className='text-muted-foreground text-sm md:text-base'>
                      {recruiter.data.email}
                    </p>
                  </div>
                  <div className='mt-2 flex items-center justify-start gap-6'>
                    {recruiter.data.website && recruiter.data.website.trim() ? (
                      <Link
                        href={recruiter.data.website}
                        target='_blank'
                        className='text-muted-foreground flex items-center'
                      >
                        <Building className='mr-2 h-4 w-4' />
                        <span>{recruiter.data.website}</span>
                      </Link>
                    ) : (
                      <div className='text-muted-foreground flex items-center'>
                        <Building className='mr-2 h-4 w-4' />
                        <span>Chưa có thông tin website</span>
                      </div>
                    )}
                    {recruiter.data.members > 0 ? (
                      <div className='text-muted-foreground flex items-center'>
                        <User className='mr-2 h-4 w-4' />
                        <span>
                          {formatEmployeeCount(recruiter.data.members)}
                        </span>
                      </div>
                    ) : (
                      <div className='text-muted-foreground flex items-center'>
                        <User className='mr-2 h-4 w-4' />
                        <span>Chưa có thông tin số lượng nhân sự</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className='px-4 pt-24 pb-8 md:pt-32'>
        <Card>
          <CardContent>
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold'>Giới thiệu</h3>
              {recruiter.data.about && recruiter.data.about.trim() ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(recruiter.data.about)
                  }}
                ></div>
              ) : (
                <p className='text-muted-foreground text-center'>
                  Chưa có thông tin giới thiệu
                </p>
              )}
            </div>
            <div className='space-y-4'>
              <h3 className='pt-4 text-lg font-semibold'>Địa điểm làm việc</h3>
              {recruiter.data.address && recruiter.data.address.trim() ? (
                <div className='flex items-start gap-3'>
                  <MapPin className='text-muted-foreground mt-0.5 h-5 w-5' />
                  <p>{recruiter.data.address}</p>
                </div>
              ) : (
                <p className='text-muted-foreground text-center'>
                  Chưa có thông tin địa chỉ làm việc
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <ReportModal
        reportdUser='recruiter'
        reportedId={recruiter.data.id}
        open={isReportModalOpen}
        onOpenChange={setIsReportModalOpen}
      />
    </>
  );
}
