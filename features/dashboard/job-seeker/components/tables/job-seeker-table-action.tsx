'use client';

import { DataTableSearch } from '@/components/ui/table/data-table-search';
import { DataTableFilterBox } from '@/components/ui/table/data-table-filter-box';
import { DataTableResetFilter } from '@/components/ui/table/data-table-reset-filter';

import {
  STATUS_OPTIONS,
  userJobSeekerTable
} from '../../hooks/use-job-seeker-table';

export default function JobSeekerTableAction() {
  const {
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery,
    activeFilter,
    setActiveFilter
  } = userJobSeekerTable();

  return (
    <div className='flex flex-wrap items-center gap-4'>
      <DataTableSearch
        searchKey='email'
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
