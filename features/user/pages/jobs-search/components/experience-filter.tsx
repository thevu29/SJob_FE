'use client';

import { useEffect, useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

type ExperienceOption = {
  label: string;
  value: string;
  id: string;
};

const experienceOptions: ExperienceOption[] = [
  { label: 'Tất cả', value: 'all', id: 'exp-all' },
  { label: 'Thực tập sinh', value: '<1', id: 'exp-intern' },
  { label: 'Fresher', value: '1', id: 'exp-fresher' },
  { label: 'Junior', value: '1-2', id: 'exp-junior' },
  { label: 'Middle', value: '2-4', id: 'exp-middle' },
  { label: 'Senior', value: '4-6', id: 'exp-senior' },
  { label: 'Lead', value: '6-8', id: 'exp-lead' },
  // { label: 'Expert', value: '>8', id: 'exp-expert' },
  { label: 'Khác', value: 'custom', id: 'exp-custom' }
];

interface ExperienceFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function ExperienceFilter({ value, onChange }: ExperienceFilterProps) {
  const [customRange, setCustomRange] = useState<number[]>([0, 10]);
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
      <h4 className='mb-2 font-medium'>Kinh nghiệm</h4>
      <RadioGroup
        value={selectedOption}
        onValueChange={handleValueChange}
        className='space-y-2'
      >
        {experienceOptions.map((option) => (
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
              <span>{customRange[0]} năm</span>
              <span>{customRange[1]} năm</span>
            </div>
            <Slider
              value={customRange}
              max={10}
              step={0.5}
              onValueChange={handleSliderChange}
              className='mt-2'
            />
          </div>
        </div>
      )}
    </div>
  );
}
