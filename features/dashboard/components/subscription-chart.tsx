'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import type {
  IGetJobSeekerCountInMonth,
  IGetRecruiterCountInMonth
} from '@/interfaces';
import { useGet } from '@/hooks';
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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { BarChartSkeleton } from '@/components/common/bar-chart-skeleton';

const chartConfig = {
  jobSeekers: {
    label: 'Ứng viên',
    color: 'var(--chart-1)'
  },
  recruiters: {
    label: 'Nhà tuyển dụng',
    color: 'var(--chart-2)'
  }
} satisfies ChartConfig;

const year = new Date().getFullYear();

export function SubscriptionChart() {
  const { data: jobSeekerStats, isLoading: isGettingJobSeeker } = useGet<
    IGetJobSeekerCountInMonth[]
  >('/job-seekers/stats', ['job-seeker-stats']);

  const { data: recruiterStats, isLoading: isGettingRecruiter } = useGet<
    IGetRecruiterCountInMonth[]
  >('/recruiters/stats', ['recruiter-stats']);

  const isLoading = isGettingJobSeeker || isGettingRecruiter;

  if (isLoading) {
    return <BarChartSkeleton />;
  }

  if (!jobSeekerStats || !recruiterStats) {
    return null;
  }

  const chartData = jobSeekerStats.data.map((jobSeekerStat, index) => ({
    month: `Tháng ${jobSeekerStat.month}`,
    jobSeekers: jobSeekerStat.jobSeekers,
    recruiters: recruiterStats.data[index].recruiters
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Biểu đồ thống kê số lượng người dùng đăng ký</CardTitle>
        <CardDescription>Tháng 1 - 12, {year}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className='aspect-auto h-[280px] w-full'
          config={chartConfig}
        >
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='month'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent className='w-[170px]' hideLabel />}
            />
            <Bar
              dataKey='jobSeekers'
              fill='var(--color-jobSeekers)'
              radius={4}
            />
            <Bar
              dataKey='recruiters'
              fill='var(--color-recruiters)'
              radius={4}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
