export interface Job {
  id: string;
  recruiterId: string;
  name: string;
  description: string;
  salary: number;
  requirement: string;
  benefit: string;
  deadline: string;
  slots: number;
  type: string;
  date: string;
  education: string;
  experience: string;
  closeWhenFull: boolean;
  status: boolean;
}

export enum JobType {
  FULL_TIME = 'Toàn thời gian',
  PART_TIME = 'Bán thời gian',
  INTERNSHIP = 'Thực tập',
  FREELANCE = 'Freelance'
}
