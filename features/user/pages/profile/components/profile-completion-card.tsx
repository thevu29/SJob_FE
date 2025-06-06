'use client';

import { CheckCircle2, Circle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProfileCompletionCircle } from '@/features/user/pages/profile/components/profile-completion-circle';

interface ProfileCompletionCardProps {
  percentage: number;
  personal: boolean;
  experience: boolean;
  education: boolean;
  skills: boolean;
  resumes: boolean;
  certifications: boolean;
  profilePicture: boolean;
}

export function ProfileCompletionCard({
  percentage,
  personal,
  experience,
  education,
  skills,
  resumes,
  certifications,
  profilePicture
}: ProfileCompletionCardProps) {
  const sections = [
    { name: 'Thông tin cá nhân', completed: personal, weight: '20%' },
    { name: 'Kinh nghiệm làm việc', completed: experience, weight: '20%' },
    { name: 'Học vấn', completed: education, weight: '10%' },
    { name: 'Kỹ năng', completed: skills, weight: '10%' },
    { name: 'Hồ sơ đính kèm', completed: resumes, weight: '20%' },
    { name: 'Chứng chỉ', completed: certifications, weight: '10%' },
    { name: 'Ảnh đại diện', completed: profilePicture, weight: '10%' }
  ];

  const getIcon = (completed: boolean) => {
    if (completed) {
      return <CheckCircle2 className='h-5 w-5 text-green-500' />;
    }
    return <Circle className='h-5 w-5 text-red-500' />;
  };

  const isComplete = percentage >= 75;

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-xl'>Mức độ hoàn thiện hồ sơ</CardTitle>
        <div
          className={`text-lg font-medium ${isComplete ? 'text-green-500' : 'text-red-500'}`}
        >
          {percentage}%
        </div>
      </CardHeader>

      <CardContent>
        <div className='flex flex-col items-center gap-6 md:flex-row'>
          <div className='flex-shrink-0'>
            <ProfileCompletionCircle
              percentage={percentage}
              size={120}
              strokeWidth={4}
            />
          </div>

          <div className='w-full flex-1'>
            <div className='w-full space-y-3'>
              {sections.map((section, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between gap-2'
                >
                  <div className='flex items-center gap-2'>
                    {getIcon(section.completed)}
                    <span>{section.name}</span>
                  </div>
                </div>
              ))}
            </div>

            {!isComplete && (
              <div className='mt-4 flex items-center gap-2 rounded-md bg-amber-500/10 p-3 text-amber-500'>
                <AlertCircle className='h-5 w-5' />
                <span>
                  Hoàn thiện hồ sơ ít nhất 75% để cho phép tìm kiếm việc làm.
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
