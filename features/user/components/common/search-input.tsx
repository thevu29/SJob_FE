'use client';

import { LoadingSpinner } from '@/components/common/loading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useJobParams } from '@/features/user/hooks/useJobParams';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

interface SearchInputProps {
  redirectTo?: string;
}

export default function SearchInput({ redirectTo }: SearchInputProps) {
  const router = useRouter();
  const { query, setQuery, isPending } = useJobParams();

  const handleSearch = () => {
    if (redirectTo) {
      const currentParams = new URLSearchParams(window.location.search);
      currentParams.set('query', query);
      const queryString = currentParams.toString();
      router.replace(`${redirectTo}?${queryString}`);
    } else {
      setQuery(query);
    }
  };

  return (
    <div className='relative flex flex-col gap-2 md:flex-row'>
      <div className='relative flex-grow'>
        {isPending ? (
          <LoadingSpinner className='absolute top-1/2 left-3 -translate-y-1/2 transform border text-gray-400' />
        ) : (
          <Search className='absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400' />
        )}

        <Input
          type='text'
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
          placeholder='Nhập từ khóa tìm kiếm'
          className='w-full rounded-md bg-white py-6 pr-4 pl-10 text-black'
        />
      </div>
      <div className='flex items-center gap-2'>
        <Button
          onClick={handleSearch}
          className='bg-color-5 hover:bg-color-5/80 h-12 text-white'
        >
          Tìm kiếm
        </Button>
      </div>
    </div>
  );
}
