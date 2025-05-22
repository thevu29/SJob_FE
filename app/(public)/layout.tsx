import { Footer } from '@/features/recruiter/components/navigation/footer';
import { Header } from '@/features/user/components/navigation/header';
import React from 'react';

export default function UserLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className='bg-background flex min-h-screen flex-col'>
        <Header />
        <main className='relative flex-1 py-4 md:py-6'>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
