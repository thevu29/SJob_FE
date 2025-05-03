import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  color?: string;
}

export function StatsCard({
  title,
  value,
  description,
  color = 'text-orange-500'
}: StatsCardProps) {
  return (
    <Card className='bg-gray-50'>
      <CardHeader className='pb-2'>
        <CardTitle className='text-sm font-medium text-gray-500'>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className='text-3xl font-bold'
          style={{ color: color === 'text-orange-500' ? '#ff7452' : color }}
        >
          {value}
        </div>
        <p className='text-xs text-gray-500'>{description}</p>
      </CardContent>
    </Card>
  );
}
