import {
  TAddRecruiter,
  TRecruiterListRes
} from '@/features/recruiters/schemas/recruiter.schema';
import { get, post } from '@/lib/api';

const prefix = '/recruiters';

const recruiterAction = {
  getRecruiterList: () => get<TRecruiterListRes>(prefix),
  addRecruiter: (body: TAddRecruiter) => post<TAddRecruiter>(prefix, body)
};
export default recruiterAction;
