'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const [activeSubmenu, setActiveSubmenu] = React.useState<string | null>(null);

  // Đóng menu khi resize màn hình
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // md breakpoint
        setOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Xử lý hiển thị/ẩn submenu
  const toggleSubmenu = (menu: string) => {
    if (activeSubmenu === menu) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(menu);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant='ghost' className='h-9 w-9 p-0 text-white md:hidden'>
          <Menu className='h-6 w-6' />
          <span className='sr-only'>Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='w-[250px] p-0'>
        <nav className='flex h-full flex-col'>
          <div className='border-b'>
            <Link
              href='/'
              className='flex h-14 items-center px-4 font-medium hover:text-[#ff5c30]'
              onClick={() => setOpen(false)}
            >
              Dashboard
            </Link>
          </div>
          <div className='border-b'>
            <Link
              href='#'
              className='flex h-14 items-center px-4 font-medium hover:text-[#ff5c30]'
              onClick={() => setOpen(false)}
            >
              Việc Làm
            </Link>
          </div>
          <div className='border-b'>
            <button
              className='flex h-14 w-full items-center justify-between px-4 font-medium hover:text-[#ff5c30]'
              onClick={() => toggleSubmenu('candidates')}
            >
              Ứng viên
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className={`h-4 w-4 transition-transform ${activeSubmenu === 'candidates' ? 'rotate-90' : ''}`}
              >
                <polyline points='9 18 15 12 9 6' />
              </svg>
            </button>
            {activeSubmenu === 'candidates' && (
              <div className='bg-gray-50 py-2'>
                <Link
                  href='#'
                  className='flex h-10 items-center px-8 text-sm hover:bg-gray-100 hover:text-[#ff5c30]'
                  onClick={() => setOpen(false)}
                >
                  Tìm kiếm ứng viên
                </Link>
                <Link
                  href='#'
                  className='flex h-10 items-center px-8 text-sm hover:bg-gray-100 hover:text-[#ff5c30]'
                  onClick={() => setOpen(false)}
                >
                  Quản lý ứng viên
                </Link>
              </div>
            )}
          </div>
          <div className='border-b'>
            {/* <Link
              href='#'
              className='flex h-14 items-center px-4 font-medium hover:text-[#ff5c30]'
              onClick={() => setOpen(false)}
            >
              Báo cáo
            </Link> */}
          </div>
          <div className='mt-auto space-y-3 p-4'>
            <Button
              className='w-full cursor-pointer bg-[#ff7d55] text-white hover:bg-[#ff5c30]'
              onClick={() => setOpen(false)}
            >
              Đăng Tuyển Dụng
            </Button>
            <Button
              className='w-full cursor-pointer bg-[#ff7d55] text-white hover:bg-[#ff5c30]'
              onClick={() => setOpen(false)}
            >
              Tìm Ứng Viên
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
