'use client';
import { Avatar } from '@/components/ui/avatar';
import Image from 'next/image';
import placeholder from '@/public/placeholder.jpg';
import { formatEmployeeCount } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import DOMPurify from 'isomorphic-dompurify';
import { Building, MapPin, User } from 'lucide-react';
import Link from 'next/link';
import { useGet } from '@/hooks';
import { Recruiter } from '@/interfaces';
import { RecruiterDetailSkeleton } from '@/features/user/pages/recruiter-detail/components/recruiter-detail-skeleton';

interface RecruiterDetailInfoProps {
  recruiterId: string;
}
export default function RecruiterDetailInfo({
  recruiterId
}: RecruiterDetailInfoProps) {
  const { data, isLoading } = useGet<Recruiter>('recruiters/' + recruiterId, [
    'recruiters',
    recruiterId
  ]);
  const recruiter = data && data.data;
  if (isLoading) {
    return <RecruiterDetailSkeleton />;
  }
  return (
    recruiter && (
      <div>
        {/* Header */}
        <div className='bg-secondary relative h-48 md:h-64'>
          <div className='container mx-auto px-4'>
            <div className='absolute -bottom-20 flex flex-col items-start gap-4 md:-bottom-24 md:flex-row md:items-end'>
              <Avatar className='border-background h-32 w-32 rounded-full border-4 md:h-48 md:w-48'>
                <Image
                  src={recruiter.image || placeholder}
                  alt='Profile picture'
                  loading='eager'
                  quality={100}
                  width={200}
                  height={200}
                  className='h-full w-full rounded-full object-cover'
                />
              </Avatar>

              <div className='w-full p-4 md:w-auto'>
                <div className='flex flex-col items-start justify-between gap-2 md:flex-row md:items-center md:gap-8'>
                  <div>
                    <h1 className='text-2xl font-bold md:text-3xl'>
                      {recruiter.name}
                    </h1>

                    <div className='mt-2 flex items-center justify-start gap-6'>
                      {recruiter.website && recruiter.website.trim() ? (
                        <Link
                          href={recruiter.website}
                          target='_blank'
                          className='text-muted-foreground flex items-center'
                        >
                          <Building className='mr-2 h-4 w-4' />
                          <span>{recruiter.website}</span>
                        </Link>
                      ) : (
                        <div className='text-muted-foreground flex items-center'>
                          <Building className='mr-2 h-4 w-4' />
                          <span>Chưa có thông tin website</span>
                        </div>
                      )}
                      {recruiter.members > 0 ? (
                        <div className='text-muted-foreground flex items-center'>
                          <User className='mr-2 h-4 w-4' />
                          <span>{formatEmployeeCount(recruiter.members)}</span>
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
                {recruiter.about && recruiter.about.trim() ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(recruiter.about)
                    }}
                  ></div>
                ) : (
                  <p className='text-muted-foreground text-center'>
                    Chưa có thông tin giới thiệu
                  </p>
                )}
              </div>
              <div className='space-y-4'>
                <h3 className='pt-4 text-lg font-semibold'>
                  Địa điểm làm việc
                </h3>
                {recruiter.address && recruiter.address.trim() ? (
                  <div className='flex items-start gap-3'>
                    <MapPin className='text-muted-foreground mt-0.5 h-5 w-5' />
                    <p>{recruiter.address}</p>
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
      </div>
    )
  );
}
