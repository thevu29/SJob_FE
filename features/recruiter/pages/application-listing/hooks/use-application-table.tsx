import { useCallback, useMemo } from 'react';
import { useQueryState } from 'nuqs';

import { searchParams } from '@/lib/searchparams';
import { ApplicationStatus } from '@/interfaces/application';

export const STATUS_OPTIONS = Object.entries(ApplicationStatus).map(
  ([key, value]) => ({
    value: key,
    label: value
  })
);

export function useApplicationTable() {
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
  const [statusFilter, setStatusFilter] = useQueryState(
    'status',
    searchParams.categories.withOptions({ shallow: false }).withDefault('')
  );

  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery || !!statusFilter;
  }, [searchQuery, statusFilter]);

  const resetFilters = useCallback(() => {
    setPage(1);
    setSearchQuery(null);
    setStatusFilter(null);
  }, [setSearchQuery, setPage]);

  return {
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    isAnyFilterActive,
    statusFilter,
    setStatusFilter,
    resetFilters
  };
}
