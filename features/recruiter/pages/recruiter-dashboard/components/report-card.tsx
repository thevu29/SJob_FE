import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import Image from 'next/image';
import IconEmptyCurrenStatus from '@/public/icon-empty-current-status.svg';

export function ReportCard() {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-lg font-medium'>
          Tổng số lượng hồ sơ trong 7 ngày
        </CardTitle>
        <Select defaultValue='all'>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Tất cả công việc' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>Tất cả công việc</SelectItem>
            <SelectItem value='active'>Công việc đang hiển thị</SelectItem>
            <SelectItem value='expired'>Công việc hết hạn</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className='pt-4'>
        <div className='text-4xl font-bold'>0</div>
        <div className='mt-8 flex flex-col items-center justify-center space-y-2 text-center'>
          <div className='relative h-64 w-64'>
            <Image
              src={IconEmptyCurrenStatus}
              alt='No data'
              width={256}
              height={256}
              className='object-contain'
            />
          </div>
          <p className='text-gray-500'>Không có dữ liệu cho báo cáo này</p>
        </div>
      </CardContent>
    </Card>
  );
}
