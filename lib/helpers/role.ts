import { UserRole } from '@/constants/enums';

export function getRole(roles: string[]): UserRole {
  if (roles.includes(UserRole.ADMIN)) {
    return UserRole.ADMIN;
  }

  if (roles.includes(UserRole.RECRUITER)) {
    return UserRole.RECRUITER;
  }

  return UserRole.JOB_SEEKER;
}
