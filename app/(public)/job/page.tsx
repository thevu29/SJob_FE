import JobsSearch from '@/features/user/pages/jobs-search/jobs-search';
import React, { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense>
      <JobsSearch />
    </Suspense>
  );
}
