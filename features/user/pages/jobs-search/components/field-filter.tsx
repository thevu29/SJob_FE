'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { ChevronDown, ChevronUp, Search, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import { useJobParams } from '@/features/user/hooks/useJobParams';
import { Field, FieldDetail } from '@/interfaces/field';
import { useGetPublic } from '@/hooks';

interface GroupedField extends Field {
  fieldDetails: FieldDetail[];
  count: number;
}

const ITEMS_PER_PAGE = 5;

export function FieldFilter() {
  const { fieldDetailIds, setFieldDetailIds } = useJobParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFields, setExpandedFields] = useState<Set<string>>(new Set());
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { data: fieldsData, isLoading: fieldsLoading } = useGetPublic<Field[]>(
    'fields',
    ['fields']
  );
  const { data: fieldDetailsData, isLoading: fieldDetailsLoading } =
    useGetPublic<FieldDetail[]>('field-details', ['field-details']);

  const isLoading = fieldsLoading || fieldDetailsLoading;

  // Parse selected field detail IDs
  const selectedFieldDetailIds = useMemo(() => {
    return fieldDetailIds ? fieldDetailIds.split(',').filter(Boolean) : [];
  }, [fieldDetailIds]);

  // Group field details by field
  const groupedFields = useMemo(() => {
    if (!fieldsData?.data || !fieldDetailsData?.data) return [];

    const grouped: GroupedField[] = fieldsData.data.map((field) => {
      const fieldDetails = fieldDetailsData.data.filter(
        (detail) => detail.fieldId === field.id
      );
      return {
        ...field,
        fieldDetails,
        count: fieldDetails.length
      };
    });

    return grouped.filter((field) => field.fieldDetails.length > 0);
  }, [fieldsData?.data, fieldDetailsData?.data]);

  // Filter fields based on search term
  const filteredFields = useMemo(() => {
    if (!searchTerm) return groupedFields;

    return groupedFields.filter(
      (field) =>
        field.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        field.fieldDetails.some((detail) =>
          detail.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
  }, [groupedFields, searchTerm]);

  // Get visible fields for pagination
  const visibleFields = useMemo(() => {
    return filteredFields.slice(0, visibleCount);
  }, [filteredFields, visibleCount]);

  const hasMoreItems = filteredFields.length > visibleCount;

  // Handle field selection (select all field details in a field)
  const handleFieldToggle = useCallback(
    (field: GroupedField) => {
      const fieldDetailIdsInField = field.fieldDetails.map(
        (detail) => detail.id
      );
      const allSelected = fieldDetailIdsInField.every((id) =>
        selectedFieldDetailIds.includes(id)
      );

      let newSelectedIds: string[];
      if (allSelected) {
        // Deselect all field details in this field
        newSelectedIds = selectedFieldDetailIds.filter(
          (id) => !fieldDetailIdsInField.includes(id)
        );
      } else {
        // Select all field details in this field
        const idsToAdd = fieldDetailIdsInField.filter(
          (id) => !selectedFieldDetailIds.includes(id)
        );
        newSelectedIds = [...selectedFieldDetailIds, ...idsToAdd];
      }

      setFieldDetailIds(
        newSelectedIds.length > 0 ? newSelectedIds.join(',') : ''
      );
    },
    [selectedFieldDetailIds, setFieldDetailIds]
  );

  // Handle individual field detail selection
  const handleFieldDetailToggle = useCallback(
    (fieldDetailId: string) => {
      let newSelectedIds: string[];
      if (selectedFieldDetailIds.includes(fieldDetailId)) {
        newSelectedIds = selectedFieldDetailIds.filter(
          (id) => id !== fieldDetailId
        );
      } else {
        newSelectedIds = [...selectedFieldDetailIds, fieldDetailId];
      }

      setFieldDetailIds(
        newSelectedIds.length > 0 ? newSelectedIds.join(',') : ''
      );
    },
    [selectedFieldDetailIds, setFieldDetailIds]
  );

  // Handle load more with loading state
  const handleLoadMore = useCallback(async () => {
    setIsLoadingMore(true);
    // Simulate loading delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 300));
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
    setIsLoadingMore(false);
  }, []);

  // Toggle field expansion
  const toggleFieldExpansion = useCallback((fieldId: string) => {
    setExpandedFields((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(fieldId)) {
        newSet.delete(fieldId);
      } else {
        newSet.add(fieldId);
      }
      return newSet;
    });
  }, []);

  // Check if field is partially or fully selected
  const getFieldSelectionState = useCallback(
    (field: GroupedField) => {
      const fieldDetailIdsInField = field.fieldDetails.map(
        (detail) => detail.id
      );
      const selectedCount = fieldDetailIdsInField.filter((id) =>
        selectedFieldDetailIds.includes(id)
      ).length;

      if (selectedCount === 0) return 'none';
      if (selectedCount === fieldDetailIdsInField.length) return 'all';
      return 'partial';
    },
    [selectedFieldDetailIds]
  );

  // Reset visible count when search changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [searchTerm]);

  if (isLoading) {
    return (
      <div className='space-y-4'>
        <div>
          <Skeleton className='mb-2 h-4 w-32' />
          <Skeleton className='h-10 w-full' />
        </div>
        <div className='space-y-3'>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className='space-y-2'>
              <Skeleton className='h-8 w-full' />
              <div className='space-y-1 pl-6'>
                <Skeleton className='h-6 w-3/4' />
                <Skeleton className='h-6 w-2/3' />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      <div>
        <h4 className='text-foreground mb-2 font-medium'>Lĩnh vực công việc</h4>

        {/* Search Input */}
        <div className='relative mb-4'>
          <Search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform' />
          <Input
            placeholder='Tìm kiếm lĩnh vực...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='pl-10'
          />
        </div>
      </div>

      {/* Fields List */}
      <div className='max-h-[360px] space-y-2 overflow-y-auto'>
        {visibleFields.length === 0 ? (
          <div className='text-muted-foreground py-8 text-center'>
            {searchTerm ? 'Không tìm thấy lĩnh vực nào' : 'Không có dữ liệu'}
          </div>
        ) : (
          visibleFields.map((field) => {
            const selectionState = getFieldSelectionState(field);
            const isExpanded = expandedFields.has(field.id);

            return (
              <Collapsible
                key={field.id}
                open={isExpanded}
                onOpenChange={() => toggleFieldExpansion(field.id)}
              >
                <div className='border-border overflow-hidden rounded-lg border'>
                  {/* Field Header */}
                  <div className='bg-muted/30 hover:bg-muted/50 flex items-center gap-3 p-3 transition-colors'>
                    <Checkbox
                      checked={selectionState === 'all'}
                      ref={(el) => {
                        if (el && 'indeterminate' in el) {
                          (el as HTMLInputElement).indeterminate =
                            selectionState === 'partial';
                        }
                      }}
                      onCheckedChange={() => handleFieldToggle(field)}
                      className='data-[state=checked]:bg-primary data-[state=checked]:border-primary'
                    />

                    <CollapsibleTrigger asChild>
                      <Button
                        variant='ghost'
                        className='h-auto flex-1 justify-between p-0 text-left font-medium hover:bg-transparent'
                      >
                        <div className='flex items-center gap-2'>
                          <span className='text-primary truncate font-medium'>
                            {field.name}
                          </span>
                          <span className='text-muted-foreground text-sm'>
                            ({field.count})
                          </span>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className='text-muted-foreground h-4 w-4' />
                        ) : (
                          <ChevronDown className='text-muted-foreground h-4 w-4' />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                  </div>

                  {/* Field Details */}
                  <CollapsibleContent className='border-border border-t'>
                    <div className='bg-background space-y-2 p-3'>
                      {field.fieldDetails.map((detail) => (
                        <div
                          key={detail.id}
                          className='hover:bg-muted/30 flex items-center gap-3 rounded-md p-2 transition-colors'
                        >
                          <Checkbox
                            checked={selectedFieldDetailIds.includes(detail.id)}
                            onCheckedChange={() =>
                              handleFieldDetailToggle(detail.id)
                            }
                            className='data-[state=checked]:bg-primary data-[state=checked]:border-primary'
                          />
                          <label
                            htmlFor={detail.id}
                            className='text-foreground flex-1 cursor-pointer text-sm select-none'
                          >
                            {detail.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            );
          })
        )}

        {/* Load More Button */}
        {hasMoreItems && (
          <div className='flex justify-center pt-4'>
            <Button
              variant='outline'
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className='w-full sm:w-auto'
            >
              {isLoadingMore ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Đang tải...
                </>
              ) : (
                `Xem thêm (${filteredFields.length - visibleCount} còn lại)`
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Selected Count */}
      {selectedFieldDetailIds.length > 0 && (
        <div className='text-muted-foreground border-border border-t pt-3 text-sm'>
          Đã chọn: {selectedFieldDetailIds.length} lĩnh vực
        </div>
      )}
    </div>
  );
}
