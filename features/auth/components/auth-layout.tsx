'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import Logo from '@/public/icon.png';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  const pathname = usePathname();

  const isRecruiterSignup = pathname === '/sign-up/recruiter';

  return (
    <div
      className={cn(
        'grid min-h-svh overflow-hidden lg:grid-cols-2',
        isRecruiterSignup && 'lg:grid-cols-3'
      )}
    >
      <div
        className={cn(
          'flex flex-col gap-4 px-6 py-2 md:px-10',
          isRecruiterSignup && 'col-span-2'
        )}
      >
        <div className='mt-4 flex justify-center gap-2 md:justify-start'>
          <Link href='/' className='flex items-center gap-2 font-medium'>
            <Image src={Logo} alt='Logo' width={20} height={20} />
            SJob
          </Link>
        </div>
        <div className='flex flex-1 items-center justify-center'>
          <div
            className={cn('w-full max-w-xs', isRecruiterSignup && 'max-w-2xl')}
          >
            <div className='flex flex-col items-center gap-2 text-center'>
              <div className='mb-12'>
                <h1 className='text-2xl font-bold'>{title}</h1>
                {subtitle && (
                  <p className='text-muted-foreground text-sm text-balance'>
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
      <div className='bg-primary relative hidden items-center justify-center lg:flex'>
        <Image
          src='/auth-banner.png'
          alt='Authentication and security illustration'
          fill
          className='object-contain'
          priority={true}
          sizes='auto'
        />
      </div>
    </div>
  );
}
