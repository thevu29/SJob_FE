export enum LocationType {
  ONSITE = 'On-site',
  REMOTE = 'Remote',
  HYBRID = 'Hybrid'
}

export enum EmployeeType {
  FULL_TIME = 'Full-time',
  PART_TIME = 'Part-time',
  INTERN = 'Intern',
  FREELANCE = 'Freelance'
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  locationType: LocationType;
  description: string;
  employeeType: EmployeeType;
  startDate: string;
  endDate: string;
  jobSeekerId: string;
}
