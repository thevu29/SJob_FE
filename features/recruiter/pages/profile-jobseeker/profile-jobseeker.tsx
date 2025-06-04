'use client';

import EducationCard from '@/features/recruiter/pages/profile-jobseeker/components/education-card';
import SkillsCard from '@/features/recruiter/pages/profile-jobseeker/components/skills-card';
import { useGet } from '@/hooks/use-queries';
import { JobSeeker } from '@/interfaces/user';
import { Avatar } from '@radix-ui/react-avatar';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Education } from '@/interfaces/education';
import { Skill } from '@/interfaces/skill';
import { Experience } from '@/interfaces/experience';
import ExperienceCard from '@/features/recruiter/pages/profile-jobseeker/components/experience-card';
import { Certification } from '@/interfaces/certification';
import CertificationCard from '@/features/recruiter/pages/profile-jobseeker/components/certification-card';
import { Resume } from '@/interfaces/resume';
import ResumeCard from '@/features/recruiter/pages/profile-jobseeker/components/resume-card';
import { JobInvitationModal } from '@/features/recruiter/pages/profile-jobseeker/components/job-invitation-modal';
import placeholder from '@/public/placeholder.jpg';

export default function ProfileJobSeeker() {
  const params = useParams();
  const jobSeekerId = params.jobSeekerId as string;

  const { data: jobSeekerData } = useGet<JobSeeker>(
    'job-seekers/' + jobSeekerId,
    ['job-seekers', jobSeekerId]
  );

  const { data: educationData } = useGet<Education>(
    'educations/job-seeker/' + jobSeekerId,
    ['educations/job-seeker/', jobSeekerId]
  );

  const { data: skillData } = useGet<Skill>(
    'skills/job-seeker/' + jobSeekerId,
    ['skills/job-seeker/', jobSeekerId]
  );

  const { data: experienceData } = useGet<Experience>(
    'experiences/job-seeker/' + jobSeekerId,
    ['experiences/job-seeker/', jobSeekerId]
  );

  const { data: certificationData } = useGet<Certification>(
    'certifications/job-seeker/' + jobSeekerId,
    ['certifications/job-seeker/', jobSeekerId]
  );

  const { data: resumeData } = useGet<Resume>(
    'resumes/job-seeker/' + jobSeekerId,
    ['resumes/job-seeker/', jobSeekerId]
  );

  const jobSeeker = jobSeekerData?.data as JobSeeker;
  const educations = educationData?.data as unknown as Education[];
  const skills = skillData?.data as unknown as Skill[];
  const experiences = experienceData?.data as unknown as Experience[];
  const certifications = certificationData?.data as unknown as Certification[];
  const resumes = resumeData?.data as unknown as Resume[];

  return (
    <div className='bg-background mx-auto min-h-screen max-w-7xl overflow-hidden rounded-lg md:rounded-xl'>
      {/* Header */}
      <div className='bg-secondary relative h-48 md:h-64'>
        <div className='container mx-auto px-4'>
          <div className='absolute -bottom-20 flex flex-col items-start gap-4 md:-bottom-24 md:flex-row md:items-end'>
            <Avatar className='border-background h-32 w-32 rounded-full border-4 md:h-48 md:w-48'>
              <Image
                src={jobSeeker?.image || placeholder}
                alt='Profile picture'
                loading='eager'
                quality={100}
                width={200}
                height={200}
                className='h-full w-full rounded-full object-cover'
              />
            </Avatar>
            <div className='w-full p-4 md:w-auto'>
              {/* <div className='bg-card w-full rounded-lg p-4 shadow-md md:w-auto'> */}
              <div className='flex flex-col items-start justify-between gap-2 md:flex-row md:items-center md:gap-8'>
                <div>
                  <h1 className='text-2xl font-bold md:text-3xl'>
                    {jobSeeker?.name}
                  </h1>
                  <p className='text-muted-foreground'>{jobSeeker?.field}</p>
                </div>
                <JobInvitationModal />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className='container mx-auto px-4 pt-24 pb-16 md:pt-32'>
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
          {/* Bio */}
          <Card className='lg:col-span-3'>
            <CardHeader>
              <CardTitle className='text-xl'>Giới thiệu</CardTitle>
            </CardHeader>
            <CardContent>
              {jobSeeker?.about ? (
                <p className='text-foreground'>{jobSeeker?.about}</p>
              ) : (
                <div className='text-muted-foreground py-8 text-center'>
                  <p>Chưa có thông tin giới thiệu nào được thêm vào</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Education */}
          <EducationCard educations={educations} />

          {/* Skills */}
          <SkillsCard skills={skills} />

          {/* Experiences  */}
          <ExperienceCard experiences={experiences} />

          {/* Certifications  */}
          <CertificationCard certifications={certifications} />

          {/* Resumes */}
          <ResumeCard resumes={resumes} />
        </div>
      </div>
    </div>
  );
}
