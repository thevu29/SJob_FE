'use client';

import { DataTableSearch } from '@/components/ui/table/data-table-search';
import { DataTableFilterBox } from '@/components/ui/table/data-table-filter-box';
import { DataTableResetFilter } from '@/components/ui/table/data-table-reset-filter';

import {
  STATUS_OPTIONS,
  useJobSeekerSearchTable
} from '../../hooks/use-jobseeker-search-table';

export default function JobSeekerSearchTableAction() {
  const {
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery,
    activeFilter,
    setActiveFilter
  } = useJobSeekerSearchTable();

  return (
    <div className='flex flex-wrap items-center gap-4'>
      <DataTableSearch
        searchKey='từ khóa tìm kiếm'
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setPage={setPage}
      />
      <DataTableFilterBox
        filterKey='active'
        title='Tình trạng'
        options={STATUS_OPTIONS}
        filterValue={activeFilter}
        setFilterValue={setActiveFilter}
        singleSelect={true}
      />
      <DataTableResetFilter
        isFilterActive={isAnyFilterActive}
        onReset={resetFilters}
      />
    </div>
  );
}
