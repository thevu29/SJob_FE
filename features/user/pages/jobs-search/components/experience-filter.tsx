'use client';

import { useEffect, useMemo, useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useJobParams } from '@/features/user/hooks/useJobParams';

type ExperienceOption = {
  label: string;
  value: string;
  id: string;
};

const experienceOptions: ExperienceOption[] = [
  { label: 'Tất cả', value: '', id: 'exp-all' },
  { label: 'Thực tập sinh', value: '<=1', id: 'exp-intern' },
  { label: 'Fresher', value: '1', id: 'exp-fresher' },
  { label: 'Junior', value: '1-2', id: 'exp-junior' },
  { label: 'Middle', value: '2-4', id: 'exp-middle' },
  { label: 'Senior', value: '4-6', id: 'exp-senior' },
  { label: 'Lead', value: '>=6', id: 'exp-lead' },
  // { label: 'Expert', value: '>8', id: 'exp-expert' },
  { label: 'Khác', value: 'custom', id: 'exp-custom' }
];

export function ExperienceFilter() {
  const { experience, setExperiece } = useJobParams();
  const [customRange, setCustomRange] = useState<number[]>([0, 10]);
  const [showCustomRange, setShowCustomRange] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('');

  useEffect(() => {
    const isCustomValue =
      experience &&
      !experienceOptions.some(
        (opt) => opt.value === experience && opt.value !== 'custom'
      );

    if (isCustomValue) {
      setSelectedOption('custom');
      setShowCustomRange(true);

      if (experience.includes('-')) {
        const [min, max] = experience.split('-').map(Number);
        if (!isNaN(min) && !isNaN(max)) {
          setCustomRange([min, max]);
        }
      }
    } else {
      setSelectedOption(experience);
      setShowCustomRange(false);
      setCustomRange([0, 10]);
    }
  }, [experience]);

  const handleValueChange = (newValue: string) => {
    setSelectedOption(newValue);

    if (newValue === 'custom') {
      setShowCustomRange(true);
      setExperiece(`${customRange[0]}-${customRange[1]}`);
    } else {
      setShowCustomRange(false);
      setExperiece(newValue);
      setCustomRange([0, 10]);
    }
  };

  const handleSliderChange = (newValues: number[]) => {
    setCustomRange(newValues);
    if (selectedOption === 'custom') {
      setExperiece(`${newValues[0]}-${newValues[1]}`);
    }
  };

  return (
    <div>
      <h4 className='mb-2 font-medium'>Kinh nghiệm</h4>
      <RadioGroup
        value={selectedOption}
        onValueChange={handleValueChange}
        className='grid grid-cols-2 gap-x-2 gap-y-4'
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
