'use client';

import { Input } from '@/components/ui/input';
import { ChevronDown } from 'lucide-react';

interface FieldFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function FieldFilter({ value, onChange }: FieldFilterProps) {
  return (
    <div>
      <h4 className='mb-2 font-medium'>Lĩnh vực công việc</h4>
      <div className='relative'>
        <Input
          placeholder='Tất cả lĩnh vực'
          className='pr-8'
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <ChevronDown className='text-muted-foreground absolute top-2.5 right-3 h-4 w-4' />
      </div>
    </div>
  );
}
