import type { NavItem } from '@/interfaces/navigation';

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

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
    title: 'Product',
    url: '/dashboard/product',
    icon: 'product',
    shortcut: ['p', 'p'],
    isActive: false,
    items: []
  },
  {
    title: 'User',
    url: '#',
    icon: 'user',
    isActive: true,

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
