import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatsCard } from '@/features/recruiter/pages/recruiter-dashboard/components/stats-card';

export function JobStatusCard() {
  return (
    <Card>
      <CardHeader className='pb-2'>
        <CardTitle className='text-lg font-medium'>
          Trạng thái tin đăng
        </CardTitle>
      </CardHeader>
      <CardContent className='pt-4'>
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          <StatsCard
            title='Đang hiển thị'
            value='0'
            description='Đang hiển thị'
          />
          <StatsCard title='Đang ẩn' value='0' description='Đang ẩn' />
          <StatsCard
            title='Việc làm ảo'
            value='0'
            description='Việc làm ảo'
          />{' '}
          */
          <StatsCard title='Hết hạn' value='0' description='Hết hạn' />
        </div>
      </CardContent>
    </Card>
  );
}
