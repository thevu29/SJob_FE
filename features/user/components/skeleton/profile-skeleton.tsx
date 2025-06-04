import { GeneralInfoSkeletonCard } from './general-info-skeleton-card';
import { IntroduceSkeletonCard } from './introduce-skeleton-card';
import { ProfileCompletionSkeletonCard } from './profile-completion-skeleton-card';
import { ExperienceSkeletonCard } from './experience-skeleton-card';
import { EducationSkeletonCard } from './education-skeleton-card';
import { CertificationSkeletonCard } from './certification-skeleton-card';
import { SkillSkeletonCard } from './skill-skeleton-card';
import { ResumeSkeletonCard } from './resume-skeleton-card';

export function ProfileSkeleton() {
  return (
    <div className='container mx-auto space-y-6'>
      <GeneralInfoSkeletonCard />
      <IntroduceSkeletonCard />
      <ProfileCompletionSkeletonCard />
      <ExperienceSkeletonCard />
      <EducationSkeletonCard />
      <CertificationSkeletonCard />
      <SkillSkeletonCard />
      <ResumeSkeletonCard />
    </div>
  );
}
