import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Check, ChevronsUpDown } from 'lucide-react';
import { ControllerRenderProps } from 'react-hook-form';

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import {
  Command,
  CommandList,
  CommandItem,
  CommandGroup,
  CommandInput,
  CommandEmpty
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { FormControl } from '@/components/ui/form';

import { InfiniteScroll } from './infinite-scroll';

interface ComboboxOption {
  value: string;
  label: string;
}

interface ComboboxProps {
  options: ComboboxOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  field: ControllerRenderProps<any, any>;
  className?: string;
  enableServerSideSearch?: boolean;
  onSearch?: (search: string) => Promise<void>;
  onLoadMore?: () => Promise<void>;
  isLoading?: boolean;
  hasMore?: boolean;
}

export function Combobox({
  field,
  onSearch,
  onLoadMore,
  options = [],
  isLoading = false,
  hasMore = false,
  enableServerSideSearch = false,
  searchPlaceholder = 'Tìm kiếm...',
  placeholder = 'Chọn một tùy chọn',
  emptyMessage = 'Không có kết quả nào',
  className = ''
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [data, setData] = useState<ComboboxOption[]>(options);
  const [loading, setLoading] = useState(false);

  const isLoadingData = isLoading !== undefined ? isLoading : loading;
  const hasMoreData = hasMore !== undefined ? hasMore : true;

  const debouncedSearch = useDebouncedCallback(async (searchValue: string) => {
    if (enableServerSideSearch && onSearch) {
      setLoading(true);
      try {
        await onSearch(searchValue);
      } finally {
        setLoading(false);
      }
    }
  }, 300);

  useEffect(() => {
    if (!enableServerSideSearch && search) {
      const filtered = options.filter((option) =>
        option.label.toLowerCase().includes(search.toLowerCase())
      );
      setData(filtered);
    } else if (!enableServerSideSearch) {
      setData(options);
    }
  }, [search, options, enableServerSideSearch]);

  useEffect(() => {
    setData(options);
  }, [options]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    if (enableServerSideSearch) {
      debouncedSearch(value);
    }
  };

  const handleLoadMore = async () => {
    if (!onLoadMore || isLoadingData || !hasMoreData) return;

    setLoading(true);
    try {
      await onLoadMore();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popover modal open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant='outline'
            role='combobox'
            className={cn(
              'justify-between sm:!h-10 sm:text-base',
              !field.value && 'text-muted-foreground',
              className
            )}
          >
            {field.value
              ? options.find((option) => option.value === field.value)?.label ||
                placeholder
              : placeholder}
            <ChevronsUpDown className='opacity-50' />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className='popover-content-width-full col-span-5 p-0 sm:col-span-4'>
        <Command>
          <CommandInput
            placeholder={searchPlaceholder}
            className='h-9'
            value={search}
            onValueChange={handleSearchChange}
          />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              <InfiniteScroll
                isLoading={isLoading}
                hasMore={hasMore}
                next={handleLoadMore}
              >
                {data.map((option) => (
                  <CommandItem
                    value={option.label}
                    key={option.value}
                    onSelect={() => {
                      field.onChange(option.value);
                      setOpen(false);
                    }}
                  >
                    {option.label}
                    <Check
                      className={cn(
                        'ml-auto h-4 w-4',
                        option.value === field.value
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
              </InfiniteScroll>
            </CommandGroup>
            {isLoading && data.length > 0 && (
              <div className='text-muted-foreground p-2 text-center text-sm'>
                Đang tải thêm...
              </div>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
