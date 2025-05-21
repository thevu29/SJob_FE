'use client';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { JobType } from '@/interfaces/job';

type JobTypeOption = {
  label: string;
  value: string;
  id: string;
};

const jobTypeOptions: JobTypeOption[] = [
  { label: 'Tất cả', value: 'all', id: 'type-all' },
  { label: JobType.FULL_TIME, value: 'full-time', id: 'type-full' },
  { label: JobType.PART_TIME, value: 'part-time', id: 'type-part' },
  { label: JobType.INTERNSHIP, value: 'internship', id: 'type-intern' },
  { label: JobType.FREELANCE, value: 'freelance', id: 'type-freelance' },
  { label: 'Khác', value: 'other', id: 'type-other' }
];

interface JobTypeFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function JobTypeFilter({ value, onChange }: JobTypeFilterProps) {
  return (
    <div>
      <h4 className='mb-2 font-medium'>Hình thức làm việc</h4>
      <RadioGroup value={value} onValueChange={onChange} className='space-y-2'>
        {jobTypeOptions.map((option) => (
          <div key={option.id} className='flex items-center space-x-2'>
            <RadioGroupItem
              value={option.value}
              id={option.id}
              className='border-color-5 text-color-5 checked:bg-color-5'
            />
            <Label htmlFor={option.id}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
