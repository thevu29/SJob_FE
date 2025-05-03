import { Sidebar } from '@/features/recruiter/components/navigation/sidebar';
import React from 'react';

export default function RecruiterSettingsLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='bg-secondary flex min-h-screen flex-col gap-4 p-4 md:flex-row'>
      <Sidebar />
      <div className='mt-12 flex-1 md:mt-0'>{children}</div>
    </main>
  );
}
