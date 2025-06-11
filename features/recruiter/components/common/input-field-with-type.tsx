'use client';

import { useEffect, useState } from 'react';
import { type Control, useController } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

type OperatorType = '>=' | '<=' | '=' | 'x-y';

interface EnhancedFieldProps {
  name: string;
  control: Control<any>;
  placeholder?: string;
  value?: string; // <-- NEW
}

export function InputFieldWithType({
  name,
  control,
  placeholder,
  value
}: EnhancedFieldProps) {
  const [operator, setOperator] = useState<OperatorType>('>=');
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');

  const { field } = useController({
    name,
    control
  });

  // Parse value on mount or when value prop changes
  setTimeout(() => {
    if (!value) return;

    let operator: OperatorType = '>=';
    let val1 = '';
    let val2 = '';
    if (value.startsWith('>=')) {
      operator = '>=';
      val1 = value.slice(2);
    } else if (value.startsWith('<=')) {
      operator = '<=';
      val1 = value.slice(2);
    } else if (value.startsWith('=')) {
      operator = '=';
      val1 = value.slice(1);
    } else if (value.includes('-')) {
      operator = 'x-y';
      [val1, val2] = value.split('-');
    }

    setOperator(operator);
    setValue1(val1);
    setValue2(val2);
  }, 0);

  const updateFieldValue = (
    newOperator: OperatorType,
    newValue1: string,
    newValue2 = ''
  ) => {
    let fieldValue = '';

    if (newOperator === 'x-y') {
      fieldValue = newValue1 && newValue2 ? `${newValue1}-${newValue2}` : '';
    } else {
      fieldValue = newValue1 ? `${newOperator}${newValue1}` : '';
    }

    field.onChange(fieldValue);
  };

  const handleOperatorChange = (newOperator: OperatorType) => {
    setOperator(newOperator);
    updateFieldValue(newOperator, value1, value2);
  };

  const handleValue1Change = (newValue: string) => {
    setValue1(newValue);
    updateFieldValue(operator, newValue, value2);
  };

  const handleValue2Change = (newValue: string) => {
    setValue2(newValue);
    updateFieldValue(operator, value1, newValue);
  };

  return (
    <div className='space-y-2'>
      <div className='flex gap-2'>
        <Select value={operator} onValueChange={handleOperatorChange}>
          <SelectTrigger className='flex w-24 items-start justify-center'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='>='>≥</SelectItem>
            <SelectItem value='<='>≤</SelectItem>
            <SelectItem value='='>=</SelectItem>
            <SelectItem value='x-y'>x-y</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type='number'
          min={0}
          value={value1}
          onChange={(e) => handleValue1Change(e.target.value)}
          placeholder={
            operator === 'x-y' ? 'Từ' : placeholder || 'Nhập giá trị'
          }
          className='flex-1'
        />
        {operator === 'x-y' && (
          <>
            <span className='text-muted-foreground flex items-center px-2'>
              -
            </span>
            <Input
              value={value2}
              min={0}
              type='number'
              onChange={(e) => handleValue2Change(e.target.value)}
              placeholder='Đến'
              className='flex-1'
            />
          </>
        )}
      </div>
    </div>
  );
}
