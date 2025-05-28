'use client';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useJobParams } from '@/features/user/hooks/useJobParams';
import { ExperienceFilter } from '@/features/user/pages/jobs-search/components/experience-filter';
import { FieldFilter } from '@/features/user/pages/jobs-search/components/field-filter';
import { JobTypeFilter } from '@/features/user/pages/jobs-search/components/job-type-filter';
import { SalaryFilter } from '@/features/user/pages/jobs-search/components/salary-filter';
import { RefreshCw, Filter } from 'lucide-react';

export function AdvancedFilters() {
  const { resetFilters } = useJobParams();
  return (
    <div className=''>
      <div className='mb-4 flex items-center justify-between'>
        <h3 className='flex items-center gap-2 text-lg font-semibold'>
          <span className='text-primary'>
            <Filter className='fill-color-5 text-color-5 h-5 w-5' />
          </span>
          Lọc nâng cao
        </h3>
        <Button
          variant='ghost'
          size='sm'
          className='h-8 px-2 text-xs'
          onClick={resetFilters}
        >
          Xóa lọc
        </Button>
      </div>

      <div className='space-y-6'>
        <ExperienceFilter />

        <Separator />

        <SalaryFilter />

        <Separator />

        <FieldFilter />

        <Separator />

        <JobTypeFilter />
      </div>
    </div>
  );
}
