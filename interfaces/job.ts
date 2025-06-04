export interface Job {
  id: string;
  recruiterId: string;
  recruiterName: string;
  recruiterImage: string;
  recruiterAddress: string;
  recruiterMembers: number;
  name: string;
  description: string;
  salary: string;
  requirement: string;
  benefit: string;
  deadline: string;
  slots: number;
  type: string;
  date: string;
  education: string;
  experience: string;
  closeWhenFull: boolean;
  status: JobStatus;
}

export enum JobType {
  FULL_TIME = 'Toàn thời gian',
  PART_TIME = 'Bán thời gian',
  INTERNSHIP = 'Thực tập',
  FREELANCE = 'Freelance'
}

export enum JobStatus {
  OPEN = 'Đang tuyển',
  CLOSED = 'Đã đóng',
  EXPIRED = 'Hết hạn'
}

export interface SavedJob {
  id: string;
  job: Job;
  jobSeekerId: string;
}

export interface ViewedJob {
  id: string;
  jobSeekerId: string;
  job: Job;
}

export interface IHasSavedJobData {
  jobId: string;
  jobSeekerId: string;
}

export interface ISavedJobData {
  jobId: string;
  jobSeekerId: string;
}
export interface IUnSavedJobData {
  id: string;
}
