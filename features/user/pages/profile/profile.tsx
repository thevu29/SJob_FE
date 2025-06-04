'use client';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ProfileSkeleton } from '@/features/user/components/skeleton/profile-skeleton';
import { useJobSeekerContext } from '@/features/user/contexts/job-seeker-context';
import { CertificationCard } from '@/features/user/pages/profile/components/certification-card';
import { EducationCard } from '@/features/user/pages/profile/components/education-card';
import { ExperienceCard } from '@/features/user/pages/profile/components/experience-card';
import { AddCertificationForm } from '@/features/user/pages/profile/components/forms/add-certification-form';
import { AddEducationForm } from '@/features/user/pages/profile/components/forms/add-education-form';
import { AddExperienceForm } from '@/features/user/pages/profile/components/forms/add-experience-form';
import { AddResumeForm } from '@/features/user/pages/profile/components/forms/add-resume-form';
import { AddSkillForm } from '@/features/user/pages/profile/components/forms/add-skill-form';
import { EditCertificationForm } from '@/features/user/pages/profile/components/forms/edit-certification-form';
import { EditEducationForm } from '@/features/user/pages/profile/components/forms/edit-education-form';
import { EditExperienceForm } from '@/features/user/pages/profile/components/forms/edit-experience-form';
import { EditResumeForm } from '@/features/user/pages/profile/components/forms/edit-resume-form';
import { EditSkillForm } from '@/features/user/pages/profile/components/forms/edit-skill-form';
import { GeneralInfoCard } from '@/features/user/pages/profile/components/general-info-card';
import { IntroduceCard } from '@/features/user/pages/profile/components/introduce-card';
import { ProfileCompletionCard } from '@/features/user/pages/profile/components/profile-completion-card';
import { ResumeCard } from '@/features/user/pages/profile/components/resume-card';
import { SkillCard } from '@/features/user/pages/profile/components/skill-card';
import { calculateProfileCompletion } from '@/features/user/pages/profile/utils/profile-completion';
import { JobSeeker } from '@/interfaces';
import { Certification } from '@/interfaces/certification';
import { Education } from '@/interfaces/education';
import { Experience } from '@/interfaces/experience';
import { Resume } from '@/interfaces/resume';
import { Skill } from '@/interfaces/skill';
import { useState, useEffect } from 'react';

export function Profile() {
  const { data, isLoading } = useJobSeekerContext(); //useJobSeekerProfile(jobSeekerId);

  const {
    jobSeeker,
    educations,
    skills,
    experiences,
    certifications,
    resumes
  } = data;

  // Modal states
  const [isAddExperienceOpen, setIsAddExperienceOpen] = useState(false);
  const [isEditExperienceOpen, setIsEditExperienceOpen] = useState(false);
  const [isAddEducationOpen, setIsAddEducationOpen] = useState(false);
  const [isEditEducationOpen, setIsEditEducationOpen] = useState(false);
  const [isAddCertificationOpen, setIsAddCertificationOpen] = useState(false);
  const [isEditCertificationOpen, setIsEditCertificationOpen] = useState(false);
  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false);
  const [isEditSkillOpen, setIsEditSkillOpen] = useState(false);
  const [isAddResumeOpen, setIsAddResumeOpen] = useState(false);
  const [isEditResumeOpen, setIsEditResumeOpen] = useState(false);

  // Selected item states for editing
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null);
  const [selectedEducation, setSelectedEducation] = useState<Education | null>(
    null
  );
  const [selectedCertification, setSelectedCertification] =
    useState<Certification | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);

  const [profileCompletion, setProfileCompletion] = useState(0);

  // Calculate profile completion on component mount and when data changes
  useEffect(() => {
    const completion = calculateProfileCompletion(
      jobSeeker,
      experiences,
      educations,
      skills,
      resumes,
      certifications
    );
    setProfileCompletion(completion);
  }, [jobSeeker, experiences, educations, skills, resumes, certifications]);

  // Handler functions
  const handleAddExperience = () => {
    setIsAddExperienceOpen(true);
  };

  const handleEditExperience = (experience: Experience) => {
    setSelectedExperience(experience);
    setIsEditExperienceOpen(true);
  };

  const handleAddEducation = () => {
    setIsAddEducationOpen(true);
  };

  const handleEditEducation = (education: Education) => {
    setSelectedEducation(education);
    setIsEditEducationOpen(true);
  };

  const handleAddCertification = () => {
    setIsAddCertificationOpen(true);
  };

  const handleEditCertification = (certification: Certification) => {
    setSelectedCertification(certification);
    setIsEditCertificationOpen(true);
  };

  const handleAddSkill = () => {
    setIsAddSkillOpen(true);
  };

  const handleEditSkill = (skill: Skill) => {
    setSelectedSkill(skill);
    setIsEditSkillOpen(true);
  };

  const handleAddResume = () => {
    setIsAddResumeOpen(true);
  };

  const handleEditResume = (resume: Resume) => {
    setSelectedResume(resume);
    setIsEditResumeOpen(true);
  };

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className='container mx-auto space-y-6'>
      <GeneralInfoCard jobSeeker={jobSeeker} />
      <IntroduceCard about={jobSeeker?.about} />

      {/* Profile Completion Card */}
      <ProfileCompletionCard
        percentage={profileCompletion}
        personal={Boolean(
          jobSeeker?.name &&
            jobSeeker?.email &&
            jobSeeker?.phone &&
            jobSeeker?.field
        )}
        experience={(experiences && experiences.length > 0) ?? false}
        education={(educations && educations.length > 0) ?? false}
        skills={(skills && skills.length > 0) ?? false}
        resumes={(resumes && resumes.length > 0) ?? false}
        certifications={(certifications && certifications.length > 0) ?? false}
        profilePicture={Boolean(jobSeeker?.image)}
      />

      <ExperienceCard
        experiences={experiences}
        jobSeekerId={jobSeeker?.id}
        onAdd={handleAddExperience}
        onEdit={handleEditExperience}
      />

      <EducationCard
        educations={educations}
        jobSeekerId={jobSeeker?.id}
        onAdd={handleAddEducation}
        onEdit={handleEditEducation}
      />

      <CertificationCard
        certifications={certifications}
        jobSeekerId={jobSeeker?.id}
        onAdd={handleAddCertification}
        onEdit={handleEditCertification}
      />

      <SkillCard
        skills={skills}
        jobSeekerId={jobSeeker?.id}
        onAdd={handleAddSkill}
        onEdit={handleEditSkill}
      />

      <ResumeCard
        resumes={resumes}
        jobSeekerId={jobSeeker?.id}
        onAdd={handleAddResume}
        onEdit={handleEditResume}
      />

      {/* Experience Modals */}
      {jobSeeker && (
        <Dialog
          open={isAddExperienceOpen}
          onOpenChange={setIsAddExperienceOpen}
        >
          <DialogContent className='sm:max-w-[500px]'>
            <AddExperienceForm
              onClose={() => setIsAddExperienceOpen(false)}
              jobSeekerId={jobSeeker.id}
            />
          </DialogContent>
        </Dialog>
      )}

      {jobSeeker && (
        <Dialog
          open={isEditExperienceOpen}
          onOpenChange={setIsEditExperienceOpen}
        >
          <DialogContent className='sm:max-w-[500px]'>
            {selectedExperience && (
              <EditExperienceForm
                experience={selectedExperience}
                jobSeekerId={jobSeeker.id}
                onClose={() => setIsEditExperienceOpen(false)}
              />
            )}
          </DialogContent>
        </Dialog>
      )}

      {jobSeeker && (
        <Dialog open={isAddEducationOpen} onOpenChange={setIsAddEducationOpen}>
          <DialogContent className='sm:max-w-[500px]'>
            <AddEducationForm
              onClose={() => setIsAddEducationOpen(false)}
              jobSeekerId={jobSeeker.id}
            />
          </DialogContent>
        </Dialog>
      )}

      {jobSeeker && (
        <Dialog
          open={isEditEducationOpen}
          onOpenChange={setIsEditEducationOpen}
        >
          <DialogContent className='sm:max-w-[500px]'>
            {selectedEducation && (
              <EditEducationForm
                education={selectedEducation}
                jobSeekerId={jobSeeker.id}
                onClose={() => setIsEditEducationOpen(false)}
              />
            )}
          </DialogContent>
        </Dialog>
      )}

      {jobSeeker && (
        <Dialog
          open={isAddCertificationOpen}
          onOpenChange={setIsAddCertificationOpen}
        >
          <DialogContent className='sm:max-w-[500px]'>
            <AddCertificationForm
              jobSeekerId={jobSeeker.id}
              onClose={() => setIsAddCertificationOpen(false)}
            />
          </DialogContent>
        </Dialog>
      )}

      {jobSeeker && (
        <Dialog
          open={isEditCertificationOpen}
          onOpenChange={setIsEditCertificationOpen}
        >
          <DialogContent className='sm:max-w-[500px]'>
            {selectedCertification && (
              <EditCertificationForm
                certification={selectedCertification}
                jobSeekerId={jobSeeker.id}
                onClose={() => setIsEditCertificationOpen(false)}
              />
            )}
          </DialogContent>
        </Dialog>
      )}

      {jobSeeker && (
        <Dialog open={isAddSkillOpen} onOpenChange={setIsAddSkillOpen}>
          <DialogContent className='sm:max-w-[500px]'>
            <AddSkillForm
              onClose={() => setIsAddSkillOpen(false)}
              jobSeekerId={jobSeeker.id}
            />
          </DialogContent>
        </Dialog>
      )}

      {jobSeeker && (
        <Dialog open={isEditSkillOpen} onOpenChange={setIsEditSkillOpen}>
          <DialogContent className='sm:max-w-[500px]'>
            {selectedSkill && (
              <EditSkillForm
                skill={selectedSkill}
                jobSeekerId={jobSeeker.id}
                onClose={() => setIsEditSkillOpen(false)}
              />
            )}
          </DialogContent>
        </Dialog>
      )}

      {jobSeeker && (
        <Dialog open={isAddResumeOpen} onOpenChange={setIsAddResumeOpen}>
          <DialogContent className='sm:max-w-[500px]'>
            <AddResumeForm
              onClose={() => setIsAddResumeOpen(false)}
              jobSeekerId={jobSeeker.id}
            />
          </DialogContent>
        </Dialog>
      )}

      {jobSeeker && (
        <Dialog open={isEditResumeOpen} onOpenChange={setIsEditResumeOpen}>
          <DialogContent className='sm:max-w-[500px]'>
            {selectedResume && (
              <EditResumeForm
                resume={selectedResume}
                jobSeekerId={jobSeeker.id}
                onClose={() => setIsEditResumeOpen(false)}
              />
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
