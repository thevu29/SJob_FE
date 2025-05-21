import { JSX } from 'react';
import { FileText, Briefcase, Settings } from 'lucide-react';

export interface NavItem {
  title: string;
  url: string;
  icon: JSX.Element;
  items?: NavItem[];
}

export const navUserItems: NavItem[] = [
  {
    title: 'Hồ sơ của tôi',
    url: '/user/profile',
    icon: <FileText className='mr-2 h-5 w-5 text-gray-500' />
  },
  {
    title: 'Việc làm của tôi',
    url: '#',
    icon: <Briefcase className='mr-2 h-5 w-5 text-gray-500' />
  },
  {
    title: 'Quản lý tài khoản',
    url: '/user/setting-accounts',
    icon: <Settings className='mr-2 h-5 w-5 text-gray-500' />
  }
];

export const navRecruiterItems: NavItem[] = [
  {
    title: 'Thông tin công ty',
    url: '/recruiter/company-general',
    icon: <FileText className='mr-2 h-5 w-5 text-gray-500' />
  },
  {
    title: 'Quản lý tài khoản',
    url: '/recruiter/my-account',
    icon: <Briefcase className='mr-2 h-5 w-5 text-gray-500' />
  }
];
