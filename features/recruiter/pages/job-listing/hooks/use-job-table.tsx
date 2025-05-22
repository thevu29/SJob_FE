import { useCallback, useMemo } from 'react';
import { useQueryState } from 'nuqs';

import { searchParams } from '@/lib/searchparams';
import { JobStatus, JobType } from '@/interfaces/job';

export const STATUS_OPTIONS = Object.entries(JobStatus).map(([key, value]) => ({
  value: key,
  label: value
}));
export const TYPE_OPTIONS = Object.entries(JobType).map(([key, value]) => ({
  value: key,
  label: value
}));

export function useJobTable() {
  const [searchQuery, setSearchQuery] = useQueryState(
    'query',
    searchParams.q
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault('')
  );

  const [recruiterId, setRecruiterId] = useQueryState(
    'recruiterId',
    searchParams.q
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault('')
  );

  const [page, setPage] = useQueryState(
    'page',
    searchParams.page.withDefault(1)
  );

  const [typeFilter, setTypeFilter] = useQueryState(
    'type',
    searchParams.categories.withOptions({ shallow: false }).withDefault('')
  );
  const [statusFilter, setStatusFilter] = useQueryState(
    'status',
    searchParams.categories.withOptions({ shallow: false }).withDefault('')
  );

  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery || !!typeFilter || !!statusFilter;
  }, [searchQuery, typeFilter, statusFilter]);

  const resetFilters = useCallback(() => {
    setPage(1);
    setSearchQuery(null);
    setTypeFilter(null);
    setStatusFilter(null);
  }, [setSearchQuery, setPage]);

  return {
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    isAnyFilterActive,
    typeFilter,
    setTypeFilter,
    statusFilter,
    setStatusFilter,
    recruiterId,
    setRecruiterId,
    resetFilters
  };
}
