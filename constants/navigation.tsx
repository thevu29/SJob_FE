import { JSX } from 'react';
import {
  FileText,
  Briefcase,
  Settings,
  BookmarkCheck,
  History,
  Send
} from 'lucide-react';
import { ROUTES } from '@/constants/routes';

export interface NavItem {
  title: string;
  url: string;
  icon: JSX.Element;
  items?: NavItem[];
}

export const navUserItems: NavItem[] = [
  {
    title: 'Hồ sơ của tôi',
    url: ROUTES.JOBSEEKER.PROFILE,
    icon: <FileText className='mr-2 h-5 w-5 text-gray-500' />
  },
  {
    title: 'Việc làm đã lưu',
    url: ROUTES.JOBSEEKER.JOBS.SAVED,
    icon: <BookmarkCheck className='mr-2 h-5 w-5 text-gray-500' />
  },
  {
    title: 'Việc làm đã xem',
    url: ROUTES.JOBSEEKER.JOBS.VIEWED,
    icon: <History className='mr-2 h-5 w-5 text-gray-500' />
  },
  {
    title: 'Việc làm đã ứng tuyển',
    url: ROUTES.JOBSEEKER.JOBS.APPLIED,
    icon: <Send className='mr-2 h-5 w-5 text-gray-500' />
  },
  {
    title: 'Quản lý tài khoản',
    url: ROUTES.JOBSEEKER.SETTINGS,
    icon: <Settings className='mr-2 h-5 w-5 text-gray-500' />
  }
];

export const navRecruiterItems: NavItem[] = [
  {
    title: 'Thông tin công ty',
    url: ROUTES.RECRUITER.SETTINGS.COMPANY_GENERAL,
    icon: <FileText className='mr-2 h-5 w-5 text-gray-500' />
  },
  {
    title: 'Quản lý tài khoản',
    url: ROUTES.RECRUITER.SETTINGS.MY_ACCOUNT,
    icon: <Briefcase className='mr-2 h-5 w-5 text-gray-500' />
  }
];
