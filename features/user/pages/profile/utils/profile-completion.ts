import { JobSeeker } from '@/interfaces';
import { Certification } from '@/interfaces/certification';
import { Education } from '@/interfaces/education';
import { Experience } from '@/interfaces/experience';
import { Resume } from '@/interfaces/resume';
import { Skill } from '@/interfaces/skill';

const WEIGHTS = {
  personalInfo: 0.2,
  experience: 0.2,
  education: 0.1,
  skills: 0.1,
  resumes: 0.2,
  certifications: 0.1,
  profilePicture: 0.1
};

/**
 * Calculate the completion percentage of personal information
 */
const calculatePersonalInfoCompletion = (profile: JobSeeker): number => {
  const requiredFields = ['name', 'email', 'phone', 'field'];
  const availableFields = requiredFields.filter((field) =>
    Boolean(profile[field as keyof JobSeeker])
  );

  return availableFields.length / requiredFields.length;
};

/**
 * Calculate profile completion percentage
 */
export const calculateProfileCompletion = (
  profile: JobSeeker,
  experiences: Experience[],
  educations: Education[],
  skills: Skill[],
  resumes: Resume[],
  certifications: Certification[]
): number => {
  // Calculate completion for each section
  const personalInfoCompletion =
    calculatePersonalInfoCompletion(profile) * WEIGHTS.personalInfo;

  const experienceCompletion = experiences.length > 0 ? WEIGHTS.experience : 0;

  const educationCompletion = educations.length > 0 ? WEIGHTS.education : 0;

  const skillsCompletion = skills.length > 0 ? WEIGHTS.skills : 0;

  const resumesCompletion = resumes.length > 0 ? WEIGHTS.resumes : 0;

  const certificationsCompletion =
    certifications.length > 0 ? WEIGHTS.certifications : 0;

  const profilePictureCompletion = profile.image ? WEIGHTS.profilePicture : 0;

  // Calculate total completion percentage
  const totalCompletion =
    (personalInfoCompletion +
      experienceCompletion +
      educationCompletion +
      skillsCompletion +
      resumesCompletion +
      certificationsCompletion +
      profilePictureCompletion) *
    100;

  return Math.round(totalCompletion);
};

/**
 * Check if profile completion meets the required threshold
 */
export const isProfileCompleteEnough = (
  completion: number,
  threshold = 75
): boolean => {
  return completion >= threshold;
};
