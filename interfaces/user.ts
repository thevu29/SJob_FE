import { UserRole } from '@/constants/enums';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface JobSeeker extends User {
  userId: string;
  name: string;
  field: string;
  phone: string;
  image: string;
  gender: boolean | string;
  address: string;
  about?: string;
  seeking: boolean;
}

export interface Recruiter extends User {
  userId: string;
  fieldId: string;
  name: string;
  about: string;
  image: string;
  website: string;
  address: string;
  members: number;
  status: boolean;
  fieldName: string;
}
