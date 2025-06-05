import type { NavItem } from '@/interfaces/navigation';

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: []
  },
  {
    title: 'Người dùng',
    url: '#',
    icon: 'user',
    isActive: false,
    items: [
      {
        title: 'Admin',
        url: '/dashboard/admin',
        shortcut: ['m', 'm']
      },
      {
        title: 'Ứng viên',
        url: '/dashboard/job-seeker',
        shortcut: ['l', 'l']
      },
      {
        title: 'Nhà tuyển dụng',
        url: '/dashboard/recruiter',
        shortcut: ['o', 'o']
      }
    ]
  }
];
