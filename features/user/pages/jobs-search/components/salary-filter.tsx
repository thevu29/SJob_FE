'use client';

import { useEffect, useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/lib/utils';

type SalaryOption = {
  label: string;
  value: string;
  id: string;
};

const salaryOptions: SalaryOption[] = [
  { label: 'Tất cả', value: 'all', id: 'salary-all' },
  { label: 'Dưới 10 triệu', value: '<10', id: 'salary-under-10' },
  { label: '10 - 15 triệu', value: '10-15', id: 'salary-10-15' },
  { label: '15 - 20 triệu', value: '15-20', id: 'salary-15-20' },
  { label: '20 - 25 triệu', value: '20-25', id: 'salary-20-25' },
  { label: '25 - 30 triệu', value: '25-30', id: 'salary-25-30' },
  { label: '30 - 50 triệu', value: '30-50', id: 'salary-30-50' },
  { label: 'Trên 50 triệu', value: '>50', id: 'salary-over-50' },
  { label: 'Thoả thuận', value: 'negotiable', id: 'salary-negotiable' },
  { label: 'Khác', value: 'custom', id: 'salary-custom' }
];

interface SalaryFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function SalaryFilter({ value, onChange }: SalaryFilterProps) {
  const [customRange, setCustomRange] = useState<number[]>([0, 100]);
  const [showCustomRange, setShowCustomRange] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('all');

  // Update showCustomRange only when the selected option changes
  useEffect(() => {
    // Initialize the selected option based on the initial value
    if (value === 'custom' || value.includes('-')) {
      setSelectedOption('custom');
      setShowCustomRange(true);

      // If value is a range (contains "-"), parse it to set the slider
      if (value.includes('-')) {
        const [min, max] = value.split('-').map(Number);
        if (!isNaN(min) && !isNaN(max)) {
          setCustomRange([min, max]);
        }
      }
    } else {
      setSelectedOption(value);
      setShowCustomRange(value === 'custom');
    }
  }, []);

  const handleValueChange = (newValue: string) => {
    setSelectedOption(newValue);
    setShowCustomRange(newValue === 'custom');

    if (newValue === 'custom') {
      // When selecting "custom", use the current slider range
      onChange(`${customRange[0]}-${customRange[1]}`);
    } else {
      // For other options, pass the option value directly
      onChange(newValue);
    }
  };

  const handleSliderChange = (newValues: number[]) => {
    setCustomRange(newValues);
    // When slider changes, we're still in "custom" mode
    onChange(`${newValues[0]}-${newValues[1]}`);
  };

  return (
    <div>
      <h4 className='mb-2 font-medium'>Mức lương</h4>
      <RadioGroup
        value={selectedOption}
        onValueChange={handleValueChange}
        className='space-y-2'
      >
        {salaryOptions.map((option) => (
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

      {showCustomRange && (
        <div className='mt-4 space-y-4'>
          <Separator />
          <div className='space-y-2'>
            <div className='flex justify-between text-sm'>
              <span>{formatCurrency(customRange[0] * 1000000)}</span>
              <span>{formatCurrency(customRange[1] * 1000000)}</span>
            </div>
            <Slider
              value={customRange}
              max={100}
              step={1}
              onValueChange={handleSliderChange}
              className='mt-2'
            />
          </div>
        </div>
      )}
    </div>
  );
}
