import React, { Suspense } from 'react';
import HeroBanner from '@/components/common/hero-banner';
import { Job } from '@/interfaces/job';
import JobListing from '@/features/user/pages/home/components/job-listing';
import HomePage from '@/features/user/pages/home/home';

export const metadata = {
  title: 'Trang chủ'
};

export default async function Page() {
  return <HomePage />;
}
