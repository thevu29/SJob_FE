export enum InvitationStatus {
  PENDING = 'Đang chờ',
  ACCEPTED = 'Đã chấp nhận',
  REJECTED = 'Từ chối'
}

export interface Invitation {
  id: string;
  jobId: string;
  jobName: string;
  recruiterId: string;
  jobSeekerId: string;
  jobSeekerName: string;
  message: string;
  status: InvitationStatus;
  createdAt: string;
  updatedAt: string;
}
