'use client';

import React from 'react';
import { Options } from 'nuqs';
import { CheckIcon } from 'lucide-react';
import { PlusCircledIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';

import { Badge } from '../badge';
import { Button } from '../button';
import { Separator } from '../separator';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '../command';

interface FilterOption {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface FilterBoxProps {
  filterKey: string;
  title: string;
  options: FilterOption[];
  setFilterValue: (
    value: string | ((old: string) => string | null) | null,
    options?: Options | undefined
  ) => Promise<URLSearchParams>;
  filterValue: string;
  singleSelect?: boolean;
}

export function DataTableFilterBox({
  title,
  options,
  setFilterValue,
  filterValue,
  singleSelect = false
}: FilterBoxProps) {
  const selectedValuesSet = React.useMemo(() => {
    if (!filterValue) return new Set<string>();
    const values = filterValue.split('.');
    return new Set(values.filter((value) => value !== ''));
  }, [filterValue]);

  const handleSelect = (value: string) => {
    if (singleSelect) {
      const newValue = selectedValuesSet.has(value) ? null : value;
      setFilterValue(newValue);
    } else {
      const newSet = new Set(selectedValuesSet);
      if (newSet.has(value)) {
        newSet.delete(value);
      } else {
        newSet.add(value);
      }
      setFilterValue(Array.from(newSet).join('.') || null);
    }
  };

  const resetFilter = () => setFilterValue(null);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' className='border-dashed'>
          <PlusCircledIcon className='mr-2 h-4 w-4' />
          {title}
          {selectedValuesSet.size > 0 && (
            <>
              <Separator orientation='vertical' className='mx-2 h-4' />
              <Badge
                variant='secondary'
                className='rounded-xs px-1 font-normal lg:hidden'
              >
                {selectedValuesSet.size}
              </Badge>
              <div className='hidden space-x-1 lg:flex'>
                {selectedValuesSet.size > 2 ? (
                  <Badge
                    variant='secondary'
                    className='rounded-xs px-1 font-normal'
                  >
                    {selectedValuesSet.size} selected
                  </Badge>
                ) : (
                  Array.from(selectedValuesSet).map((value) => (
                    <Badge
                      variant='secondary'
                      key={value}
                      className='rounded-xs px-1 font-normal'
                    >
                      {options.find((option) => option.value === value)
                        ?.label || value}
                    </Badge>
                  ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0' align='start'>
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>Không có kết quả</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => handleSelect(option.value)}
                >
                  <div
                    className={cn(
                      'border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-xs border',
                      selectedValuesSet.has(option.value)
                        ? 'bg-primary text-white'
                        : 'opacity-50 [&_svg]:invisible'
                    )}
                  >
                    <CheckIcon
                      className='h-4 w-4 text-white'
                      aria-hidden='true'
                    />
                  </div>
                  {option.icon && (
                    <option.icon
                      className='text-muted-foreground mr-2 h-4 w-4'
                      aria-hidden='true'
                    />
                  )}
                  <span>{option.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            {selectedValuesSet.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={resetFilter}
                    className='justify-center text-center'
                  >
                    Xóa lọc
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
