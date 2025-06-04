import { LucideIcon } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  percentageChange: number;
  icon: LucideIcon;
}

export function StatCard({
  title,
  value,
  percentageChange,
  icon: Icon
}: StatCardProps) {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        <Icon className='text-muted-foreground size-4' />
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>+{value}</div>
        <p className='text-muted-foreground text-xs'>
          {percentageChange > 0 && '+'}
          {percentageChange}% so với tháng trước
        </p>
      </CardContent>
    </Card>
  );
}
