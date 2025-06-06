'use client';

import { useQueryState } from 'nuqs';
import { useCallback, useMemo } from 'react';

import { searchParams } from '@/lib/searchparams';

export const ACTIVE_OPTIONS = [
  { value: 'true', label: 'Active' },
  { value: 'false', label: 'Blocked' }
];

export function useAdminTable() {
  const [searchQuery, setSearchQuery] = useQueryState(
    'query',
    searchParams.q
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault('')
  );

  const [activeFilter, setActiveFilter] = useQueryState(
    'active',
    searchParams.categories.withOptions({ shallow: false }).withDefault('')
  );

  const [page, setPage] = useQueryState(
    'page',
    searchParams.page.withDefault(1)
  );

  const resetFilters = useCallback(() => {
    setSearchQuery(null);
    setActiveFilter(null);
    setPage(1);
  }, [setSearchQuery, setPage, setActiveFilter]);

  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery || !!activeFilter;
  }, [searchQuery, activeFilter]);

  return {
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    resetFilters,
    isAnyFilterActive,
    activeFilter,
    setActiveFilter
  };
}
