'use client';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { JobType } from '@/interfaces/job';
import { useJobParams } from '@/features/user/hooks/useJobParams';

type JobTypeOption = {
  label: string;
  value: string;
  id: string;
};

const jobTypeOptions: JobTypeOption[] = [
  { label: 'Tất cả', value: '', id: 'type-all' },
  { label: JobType.FULL_TIME, value: 'FULL_TIME', id: 'type-full' },
  { label: JobType.PART_TIME, value: 'PART_TIME', id: 'type-part' },
  { label: JobType.INTERNSHIP, value: 'INTERNSHIP', id: 'type-intern' },
  { label: JobType.FREELANCE, value: 'FREELANCE', id: 'type-freelance' }
];

export function JobTypeFilter() {
  const { type, setType } = useJobParams();
  return (
    <div>
      <h4 className='mb-2 font-medium'>Hình thức làm việc</h4>
      <RadioGroup
        value={type}
        onValueChange={setType}
        className='grid grid-cols-2 gap-x-2 gap-y-4'
      >
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
