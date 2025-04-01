import { Gender, UserRole } from '@/constants/enum';

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
  phone: string;
  image: string;
  gender: Gender;
  address: string;
  about?: string;
  seeking: boolean;
}
