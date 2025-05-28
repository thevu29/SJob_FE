import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';

import Logo from '@/public/icon.png';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className='grid min-h-svh lg:grid-cols-2'>
      <div className='flex flex-col gap-4 p-6 md:p-10'>
        <div className='flex justify-center gap-2 md:justify-start'>
          <Link href='/' className='flex items-center gap-2 font-medium'>
            <Image src={Logo} alt='Logo' width={20} height={20} />
            SJob
          </Link>
        </div>
        <div className='flex flex-1 items-center justify-center'>
          <div className='w-full max-w-xs'>
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
          src='/auth-banner.jpg'
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
