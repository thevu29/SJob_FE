import { useCallback, useMemo } from 'react';
import { useQueryState } from 'nuqs';

import { searchParams } from '@/lib/searchparams';

export const STATUS_OPTIONS = [
  { value: 'true', label: 'Active' },
  { value: 'false', label: 'Blocked' }
];

export function useJobSeekerSearchTable() {
  const [searchQuery, setSearchQuery] = useQueryState(
    'query',
    searchParams.q
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault('')
  );

  const [page, setPage] = useQueryState(
    'page',
    searchParams.page.withDefault(1)
  );

  const [activeFilter, setActiveFilter] = useQueryState(
    'active',
    searchParams.categories.withOptions({ shallow: false }).withDefault('')
  );

  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery || !!activeFilter;
  }, [searchQuery, activeFilter]);

  const resetFilters = useCallback(() => {
    setPage(1);
    setSearchQuery(null);
    setActiveFilter(null);
  }, [setSearchQuery, setPage]);

  return {
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    activeFilter,
    setActiveFilter,
    isAnyFilterActive,
    resetFilters
  };
}
