'use client';

import React from 'react';
import { Footer } from '@/features/recruiter/components/navigation/footer';
import { Header } from '@/features/user/components/navigation/header';
import { Sidebar } from '@/features/user/components/navigation/sidebar';
import { JobSeekerProvider } from '@/features/user/contexts/job-seeker-context';

export default function UserLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <JobSeekerProvider>
      <div>
        <Header />
        <div className='bg-muted/30 flex min-h-screen flex-col md:flex-row'>
          <Sidebar />
          <main className='flex-1 p-4 md:p-6'>{children}</main>
        </div>
        <Footer />
      </div>
    </JobSeekerProvider>
  );
}
