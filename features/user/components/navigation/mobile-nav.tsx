'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ROUTES } from '@/constants/routes';

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
        <Button
          variant='ghost'
          className='text-primary-foreground h-9 w-9 p-0 md:hidden'
        >
          <Menu className='h-6 w-6' />
          <span className='sr-only'>Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='w-[250px] p-0'>
        <nav className='flex h-full flex-col'>
          <div className='border-b'>
            <Link
              href={ROUTES.RECRUITER.DASHBOARD}
              className='hover:bg-secondary/80 flex h-14 items-center px-4 font-medium'
              onClick={() => setOpen(false)}
            >
              Dashboard
            </Link>
          </div>
          <div className='border-b'>
            <button
              className='hover:bg-secondary/80 flex h-14 w-full items-center justify-between px-4 font-medium'
              onClick={() => toggleSubmenu('candidates')}
            >
              Việc làm
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
              <div className='py-2'>
                <Link
                  href='#'
                  className='hover:bg-secondary/80 flex h-10 items-center px-8 text-sm'
                  onClick={() => setOpen(false)}
                >
                  Việc làm đã lưu
                </Link>
                <Link
                  href='#'
                  className='hover:bg-secondary/80 flex h-10 items-center px-8 text-sm'
                  onClick={() => setOpen(false)}
                >
                  Việc làm đã ứng tuyển
                </Link>
              </div>
            )}
          </div>

          <div className='mt-auto space-y-3 p-4'>
            <Button
              className='bg-primary text-primary-foreground hover:bg-primary/90 w-full cursor-pointer'
              onClick={() => setOpen(false)}
              asChild
            >
              <Link href={ROUTES.RECRUITER.JOBS.CREATE}>Đăng Tuyển Dụng</Link>
            </Button>
            <Button
              className='bg-primary text-primary-foreground hover:bg-primary/90 w-full cursor-pointer'
              onClick={() => setOpen(false)}
              asChild
            >
              <Link href={ROUTES.RECRUITER.JOBSEEKER.SEARCH}>Tìm Ứng Viên</Link>
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
