import { Recruiter } from './user';

interface IGetCountInMonth {
  month: number;
  percentageChange: number;
}

export interface IGetJobSeekerCountInMonth extends IGetCountInMonth {
  jobSeekers: number;
}

export interface IGetRecruiterCountInMonth extends IGetCountInMonth {
  recruiters: number;
}

export interface IGetJobCountInMonth extends IGetCountInMonth {
  jobs: number;
}

export interface IGetApplicationCountInMonth extends IGetCountInMonth {
  applications: number;
}

export interface IGetTopRecruiter extends Recruiter {
  jobs: number;
}
