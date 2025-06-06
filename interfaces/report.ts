import { ReportStatus } from '@/constants/enums';

export interface Report {
  id: string;
  jobSeekerId: string;
  jobSeekerEmail: string;
  recruiterId: string;
  recruiterEmail: string;
  message: string;
  reason: string;
  status: ReportStatus;
  evidence: string;
  date: Date;
}

export interface IUpdateReportData {
  status: ReportStatus;
}

export interface ICreateReportData
  extends Partial<Omit<Report, 'id' | 'status' | 'evidence'>> {
  evidenceFile: File;
}
