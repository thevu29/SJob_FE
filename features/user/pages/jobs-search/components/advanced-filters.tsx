'use client';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ExperienceFilter } from '@/features/user/pages/jobs-search/components/experience-filter';
import { FieldFilter } from '@/features/user/pages/jobs-search/components/field-filter';
import { JobTypeFilter } from '@/features/user/pages/jobs-search/components/job-type-filter';
import { SalaryFilter } from '@/features/user/pages/jobs-search/components/salary-filter';
import { RefreshCw, Filter } from 'lucide-react';

export interface FilterValues {
  experience: string;
  salary: string;
  field: string;
  jobType: string;
}

interface AdvancedFiltersProps {
  filters: FilterValues;
  onChange: (filters: FilterValues) => void;
  onReset: () => void;
}

export function AdvancedFilters({
  filters,
  onChange,
  onReset
}: AdvancedFiltersProps) {
  const updateFilter = (key: keyof FilterValues, value: string) => {
    onChange({
      ...filters,
      [key]: value
    });
  };

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
          onClick={onReset}
        >
          Xóa lọc
        </Button>
      </div>

      <div className='space-y-6'>
        <ExperienceFilter
          value={filters.experience}
          onChange={(value) => updateFilter('experience', value)}
        />

        <Separator />

        <SalaryFilter
          value={filters.salary}
          onChange={(value) => updateFilter('salary', value)}
        />

        <Separator />

        <FieldFilter
          value={filters.field}
          onChange={(value) => updateFilter('field', value)}
        />

        <Separator />

        <JobTypeFilter
          value={filters.jobType}
          onChange={(value) => updateFilter('jobType', value)}
        />
      </div>
    </div>
  );
}
