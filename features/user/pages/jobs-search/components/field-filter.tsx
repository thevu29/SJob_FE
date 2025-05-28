'use client';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useJobParams } from '@/features/user/hooks/useJobParams';
import { useGet } from '@/hooks/useQueries';
import { FieldDetail } from '@/interfaces/field';

export function FieldFilter() {
  const { fieldDetailIds, setFieldDetailIds } = useJobParams();
  const { data, isLoading } = useGet<FieldDetail[]>('field-details', [
    'field-details'
  ]);

  if (isLoading) {
    return (
      <div>
        <Skeleton className='mb-2 h-4 w-32' />
        <div className='relative'>
          <Skeleton className='h-10 w-full rounded-md' />
        </div>
      </div>
    );
  }
  return (
    <div>
      <h4 className='mb-2 font-medium'>Lĩnh vực công việc</h4>
      <div className='relative'>
        <Select onValueChange={setFieldDetailIds} value={fieldDetailIds}>
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='Chọn lĩnh vực công việc' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Lĩnh vực công việc</SelectLabel>
              {data &&
                data.data &&
                data.data.length > 0 &&
                data.data.map((fieldDetail) => (
                  <SelectItem key={fieldDetail.id} value={fieldDetail.id}>
                    {fieldDetail.name}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
