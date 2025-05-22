import { parseAsInteger, parseAsString, useQueryState } from 'nuqs';
import { useTransition } from 'react';

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

  return {
    query,
    setQuery,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    isPending
  };
}
