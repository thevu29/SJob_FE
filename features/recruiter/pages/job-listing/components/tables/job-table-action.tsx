'use client';

import { DataTableSearch } from '@/components/ui/table/data-table-search';
import { DataTableFilterBox } from '@/components/ui/table/data-table-filter-box';
import { DataTableResetFilter } from '@/components/ui/table/data-table-reset-filter';

import {
  STATUS_OPTIONS,
  TYPE_OPTIONS,
  useJobTable
} from '../../hooks/use-job-table';

export default function JobTableAction() {
  const {
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery,
    typeFilter,
    setTypeFilter,
    statusFilter,
    setStatusFilter
  } = useJobTable();

  return (
    <div className='flex flex-wrap items-center gap-4'>
      <DataTableSearch
        searchKey='chức danh công việc'
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setPage={setPage}
      />
      <DataTableFilterBox
        filterKey='type'
        title='Loại hình'
        options={TYPE_OPTIONS}
        filterValue={typeFilter}
        setFilterValue={setTypeFilter}
        singleSelect={true}
      />
      <DataTableFilterBox
        filterKey='status'
        title='Tình trạng'
        options={STATUS_OPTIONS}
        filterValue={statusFilter}
        setFilterValue={setStatusFilter}
        singleSelect={true}
      />
      <DataTableResetFilter
        isFilterActive={isAnyFilterActive}
        onReset={resetFilters}
      />
    </div>
  );
}
