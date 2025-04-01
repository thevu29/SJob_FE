'use client';

import { Button } from '../button';

type DataTableResetFilterProps = {
  isFilterActive: boolean;
  onReset: () => void;
};

export function DataTableResetFilter({
  isFilterActive,
  onReset
}: DataTableResetFilterProps) {
  return (
    <>
      {isFilterActive ? (
        <Button variant='outline' onClick={onReset}>
          Xóa bộ lọc
        </Button>
      ) : null}
    </>
  );
}
