'use client';

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { useGet } from '@/hooks';
import type { IGetJobCountInMonth } from '@/interfaces';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { AreaChartSkeleton } from '@/components/common/area-chart-skeleton';

export const description = 'An area chart with gradient fill';

const chartConfig = {
  jobs: {
    label: 'Việc làm',
    color: 'var(--chart-1)'
  }
} satisfies ChartConfig;

const year = new Date().getFullYear();

export function JobChart() {
  const { data: jobStats, isLoading } = useGet<IGetJobCountInMonth[]>(
    '/jobs/stats',
    ['job-stats']
  );

  if (isLoading) {
    return <AreaChartSkeleton />;
  }

  if (!jobStats) {
    return null;
  }

  const chartData = jobStats.data.map((jobStat) => ({
    month: `T${jobStat.month}`,
    jobs: jobStat.jobs
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Biểu đồ thống kê số lượng việc làm đăng tuyển</CardTitle>
        <CardDescription>Tháng 1 - 12, {year}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className='aspect-auto h-[310px] w-full'
          config={chartConfig}
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='month'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id='fillJobs' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-jobs)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-jobs)'
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey='jobs'
              type='natural'
              fill='url(#fillJobs)'
              fillOpacity={0.4}
              stroke='var(--color-jobs)'
              stackId='a'
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
