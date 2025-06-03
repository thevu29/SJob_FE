import { Job } from '@/interfaces/job';

export interface Application {
  id: string;
  jobId: string;
  jobSeekerId: string;
  resumeId: string;
  resumeUrl: string;
  status: string;
  message: string;
  job: Job;
}

export interface IHasAppliedJobData {
  jobId: string;
  jobSeekerId: string;
}
