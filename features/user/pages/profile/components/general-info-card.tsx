'use client';

import { useState } from 'react';
import { Pencil, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { EditGeneralInfoForm } from '@/features/user/pages/profile/components/forms/edit-general-info-form';
import { JobSeeker } from '@/interfaces';
import { usePatchFormData, usePutFormData } from '@/hooks/use-queries';
import { TUpdateJobSeekerSchema } from '@/features/user/schemas/job-seeker.schema';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

interface GeneralInfoCardProps {
  jobSeeker: JobSeeker;
}

export function GeneralInfoCard({ jobSeeker }: GeneralInfoCardProps) {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const updateJobSeekerMutation = usePatchFormData<
    JobSeeker,
    TUpdateJobSeekerSchema
  >(
    'job-seekers',
    {
      onSuccess: () => {
        toast.success('Cập nhật thông tin hồ sơ thành công!');
      },
      onError: (error: AxiosError) => {
        toast.error(error?.message || 'Có lỗi xảy ra! Vui lòng thử lại!');
        console.error(error);
      }
    },
    ['job-seekers', jobSeeker?.id]
  );

  const handleEditProfile = () => {
    setIsEditProfileOpen(true);
  };

  const handleProfileUpdate = async (updatedProfile: any) => {
    await updateJobSeekerMutation.mutateAsync(updatedProfile);
    setIsEditProfileOpen(false);
  };

  return (
    <Card>
      <CardContent className='relative p-6'>
        <Button
          variant='ghost'
          size='icon'
          className='absolute top-4 right-4'
          onClick={handleEditProfile}
        >
          <Pencil className='h-4 w-4' />
          <span className='sr-only'>Chỉnh sửa hồ sơ</span>
        </Button>

        <div className='flex flex-col items-start gap-6 md:flex-row'>
          <div className='flex-1'>
            <h1 className='text-2xl font-bold'>{jobSeeker?.name}</h1>
            <p className='text-muted-foreground'>{jobSeeker?.field}</p>

            <div className='mt-4 space-y-2'>
              <div className='flex items-center gap-2 text-sm'>
                <Mail className='text-muted-foreground h-4 w-4' />
                <span>{jobSeeker?.email}</span>
              </div>
              <div className='flex items-center gap-2 text-sm'>
                <MapPin className='text-muted-foreground h-4 w-4' />
                <span>{jobSeeker?.address}</span>
              </div>
              <div className='flex items-center gap-2 text-sm'>
                <Phone className='text-muted-foreground h-4 w-4' />
                <span>{jobSeeker?.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Profile Modal */}
        <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
          <DialogContent className='sm:max-w-[600px]'>
            <EditGeneralInfoForm
              jobSeeker={jobSeeker}
              onSubmit={handleProfileUpdate}
              onCancel={() => setIsEditProfileOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
