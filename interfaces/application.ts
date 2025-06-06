import { Job } from '@/interfaces/job';
import { JobSeeker } from '@/interfaces/user';

export interface Application {
  id: string;
  jobId: string;
  jobSeekerId: string;
  resumeId: string;
  resumeUrl: string;
  status: string;
  message: string;
  job: Job;
  jobSeeker: JobSeeker;
}

export interface IHasAppliedJobData {
  jobId: string;
  jobSeekerId: string;
}

export enum ApplicationStatus {
  PENDING = 'Đang chờ',
  ACCEPTED = 'Chấp nhận',
  REJECTED = 'Từ chối'
}

export interface IUpdateApplicationStatusData {
  status: ApplicationStatus;
}
