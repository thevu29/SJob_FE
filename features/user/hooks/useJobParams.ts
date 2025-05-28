import { parseAsInteger, parseAsString, useQueryState } from 'nuqs';
import { useCallback, useTransition } from 'react';

export function useJobParams() {
  const [isPending, startTransition] = useTransition();

  const [query, setQuery] = useQueryState(
    'query',
    parseAsString
      .withOptions({ shallow: false, history: 'push', startTransition })
      .withDefault('')
  );

  const [currentPage, setCurrentPage] = useQueryState(
    'page',
    parseAsInteger
      .withOptions({ shallow: false, startTransition })
      .withDefault(1)
  );

  const [pageSize, setPageSize] = useQueryState(
    'limit',
    parseAsInteger
      .withOptions({ shallow: false, history: 'push', startTransition })
      .withDefault(10)
  );

  const [experience, setExperiece] = useQueryState(
    'experience',
    parseAsString
      .withOptions({ shallow: false, history: 'push', startTransition })
      .withDefault('')
  );

  const [salary, setSalary] = useQueryState(
    'salary',
    parseAsString
      .withOptions({ shallow: false, history: 'push', startTransition })
      .withDefault('')
  );

  const [fieldDetailIds, setFieldDetailIds] = useQueryState(
    'fieldDetailIds',
    parseAsString
      .withOptions({ shallow: false, history: 'push', startTransition })
      .withDefault('')
  );

  const [type, setType] = useQueryState(
    'type',
    parseAsString
      .withOptions({ shallow: false, history: 'push', startTransition })
      .withDefault('')
  );

  const resetFilters = useCallback(() => {
    setQuery(null);
    setCurrentPage(1);
    setPageSize(10);
    setExperiece(null);
    setSalary(null);
    setType(null);
    setFieldDetailIds(null);
  }, [
    setQuery,
    setCurrentPage,
    setPageSize,
    setExperiece,
    setSalary,
    setType,
    setFieldDetailIds
  ]);

  return {
    query,
    setQuery,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    experience,
    setExperiece,
    salary,
    setSalary,
    type,
    setType,
    fieldDetailIds,
    setFieldDetailIds,
    resetFilters,
    isPending
  };
}
