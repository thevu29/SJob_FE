'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  User,
  Briefcase,
  Building2,
  Bell,
  Settings,
  FileText
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { ProfileCompletionCircle } from '@/features/user/pages/profile/components/profile-completion-circle';
import {
  calculateProfileCompletion,
  isProfileCompleteEnough
} from '@/features/user/pages/profile/utils/profile-completion';

import { useJobSeekerContext } from '@/features/user/contexts/job-seeker-context';
import { usePatchFormData } from '@/hooks/use-queries';
import { JobSeeker } from '@/interfaces';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { useDebounce } from '@/hooks/use-debounce';
import { ROUTES } from '@/constants/routes';
import Image from 'next/image';
import placeholder from '@/public/placeholder.jpg';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const pathname = usePathname();
  const { data, isLoading, isError, error } = useJobSeekerContext();
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  const debouncedIsSeeking = useDebounce(isSeeking, 1000);
  const {
    jobSeeker,
    educations = [],
    skills = [],
    experiences = [],
    certifications = [],
    resumes = []
  } = data;
  const updateJobSeekerMutation = usePatchFormData<JobSeeker>(
    'job-seekers',
    {
      onSuccess: () => {
        // toast.success('Cập nhật thông tin hồ sơ thành công!');
      },
      onError: (error: AxiosError) => {
        toast.error(error?.message || 'Có lỗi xảy ra! Vui lòng thử lại!');
        console.error(error);
      }
    },
    jobSeeker?.id ? ['job-seekers', jobSeeker.id] : []
  );

  useEffect(() => {
    if (!jobSeeker) return;
    // Calculate profile completion
    const completion = calculateProfileCompletion(
      jobSeeker,
      experiences,
      educations,
      skills,
      resumes,
      certifications
    );
    setProfileCompletion(completion);
    setIsSeeking(jobSeeker.seeking);
  }, [jobSeeker, experiences, educations, skills, resumes, certifications]);

  const isProfileComplete = isProfileCompleteEnough(profileCompletion);

  const updateSeekingStatus = async (newSeeking: boolean) => {
    if (!jobSeeker || newSeeking === jobSeeker.seeking) return;

    try {
      await updateJobSeekerMutation.mutateAsync({
        id: jobSeeker.id,
        seeking: newSeeking
      } as any);
    } catch {
      if (jobSeeker.seeking !== isSeeking) {
        setIsSeeking(jobSeeker.seeking);
      }
    }
  };
  useEffect(() => {
    updateSeekingStatus(debouncedIsSeeking);
  }, [debouncedIsSeeking]);

  return (
    <aside className='bg-background border-border w-full border-r p-4 md:w-100'>
      <div className='flex h-full flex-col space-y-4'>
        {/* Profile Card */}
        <Card className='bg-primary text-primary-foreground border-none'>
          <CardContent className='p-4'>
            <div className='flex items-center gap-4'>
              {/* Avatar with surrounding completion circle */}
              <div className='relative flex h-24 w-24 items-center justify-center'>
                {/* Profile completion circle surrounding the avatar */}
                <div className='absolute inset-0'>
                  <ProfileCompletionCircle
                    percentage={profileCompletion}
                    size={96}
                    strokeWidth={4}
                    showText={false}
                    colorClass='text-amber-500'
                  />
                </div>

                {/* Avatar centered inside the completion circle */}
                <div className='relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-white/20'>
                  {/* <User className='h-10 w-10 text-white' /> */}
                  <Image
                    src={jobSeeker?.image || placeholder}
                    width={48}
                    height={48}
                    className='h-full w-full rounded-full object-cover'
                    alt='Avatar'
                  />
                </div>
              </div>

              <div>
                <h2 className='text-xl font-bold'>{jobSeeker?.name}</h2>
                <p className='text-sm'>{jobSeeker?.field}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Search Card */}
        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <span className='text-sm'>Cho phép tìm kiếm hồ sơ</span>
              <Switch
                checked={isSeeking}
                onCheckedChange={setIsSeeking}
                disabled={!isProfileComplete}
              />
            </div>
            <div className='mt-2 flex items-center gap-2 text-xs'>
              <div className='bg-muted h-2.5 w-full rounded-full'>
                <div
                  className='h-2.5 rounded-full bg-amber-500'
                  style={{ width: `${profileCompletion}%` }}
                />
              </div>
              <span className='whitespace-nowrap'>{profileCompletion}%</span>
            </div>
            <p className='text-muted-foreground mt-2 text-xs'>
              {!isProfileComplete
                ? 'Hoàn thiện hồ sơ ít nhất 75% để cho phép tìm kiếm'
                : 'Hồ sơ của bạn đã sẵn sàng để tìm kiếm việc làm'}
            </p>
          </CardContent>
        </Card>

        {/* Navigation Card */}
        <Card className='flex-1'>
          <CardContent className='p-2'>
            <nav>
              <ul className='space-y-1'>
                <li>
                  <Link
                    href={ROUTES.JOBSEEKER.PROFILE}
                    className={cn(
                      'hover:bg-accent text-foreground flex items-center gap-3 rounded-md p-3',
                      {
                        'bg-accent': pathname === ROUTES.JOBSEEKER.PROFILE
                      }
                    )}
                  >
                    <FileText className='h-5 w-5' />
                    <span>Hồ Sơ Của Tôi</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    className={cn(
                      'hover:bg-accent text-foreground flex items-center gap-3 rounded-md p-3',
                      {
                        'bg-accent': pathname === '#'
                      }
                    )}
                  >
                    <Briefcase className='h-5 w-5' />
                    <span>Việc Làm Của Tôi</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={ROUTES.JOBSEEKER.SETTINGS}
                    className={cn(
                      'hover:bg-accent text-foreground flex items-center gap-3 rounded-md p-3',
                      {
                        'bg-accent': pathname === ROUTES.JOBSEEKER.SETTINGS
                      }
                    )}
                  >
                    <Settings className='h-5 w-5' />
                    <span>Quản Lý Tài Khoản</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
}
