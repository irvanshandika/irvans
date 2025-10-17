'use client';

import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { useIsMobile } from '@/src/hooks/use-mobile';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/src/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/src/components/ui/toggle-group';

export const description = 'An interactive area chart';

const chartData = [
  { date: '2024-04-01', projects: 12, users: 150 },
  { date: '2024-04-02', projects: 13, users: 180 },
  { date: '2024-04-03', projects: 14, users: 120 },
  { date: '2024-04-04', projects: 14, users: 260 },
  { date: '2024-04-05', projects: 15, users: 290 },
  { date: '2024-04-06', projects: 16, users: 340 },
  { date: '2024-04-07', projects: 17, users: 180 },
  { date: '2024-04-08', projects: 18, users: 320 },
  { date: '2024-04-09', projects: 18, users: 110 },
  { date: '2024-04-10', projects: 19, users: 190 },
  { date: '2024-04-11', projects: 20, users: 350 },
  { date: '2024-04-12', projects: 21, users: 210 },
  { date: '2024-04-13', projects: 22, users: 380 },
  { date: '2024-04-14', projects: 22, users: 220 },
  { date: '2024-04-15', projects: 23, users: 170 },
  { date: '2024-04-16', projects: 24, users: 190 },
  { date: '2024-04-17', projects: 25, users: 360 },
  { date: '2024-04-18', projects: 26, users: 410 },
  { date: '2024-04-19', projects: 27, users: 180 },
  { date: '2024-04-20', projects: 28, users: 150 },
  { date: '2024-04-21', projects: 28, users: 200 },
  { date: '2024-04-22', projects: 29, users: 170 },
  { date: '2024-04-23', projects: 30, users: 230 },
  { date: '2024-04-24', projects: 31, users: 290 },
  { date: '2024-04-25', projects: 32, users: 250 },
  { date: '2024-04-26', projects: 33, users: 130 },
  { date: '2024-04-27', projects: 34, users: 420 },
  { date: '2024-04-28', projects: 35, users: 180 },
  { date: '2024-04-29', projects: 36, users: 240 },
  { date: '2024-04-30', projects: 37, users: 380 },
  { date: '2024-05-01', projects: 38, users: 220 },
  { date: '2024-05-02', projects: 39, users: 310 },
  { date: '2024-05-03', projects: 40, users: 190 },
  { date: '2024-05-04', projects: 41, users: 420 },
  { date: '2024-05-05', projects: 42, users: 390 },
  { date: '2024-05-06', projects: 43, users: 520 },
  { date: '2024-05-07', projects: 44, users: 300 },
  { date: '2024-05-08', projects: 45, users: 210 },
  { date: '2024-05-09', projects: 46, users: 180 },
  { date: '2024-05-10', projects: 47, users: 330 },
  { date: '2024-05-11', projects: 48, users: 270 },
  { date: '2024-05-12', projects: 49, users: 240 },
  { date: '2024-05-13', projects: 50, users: 160 },
  { date: '2024-05-14', projects: 51, users: 490 },
  { date: '2024-05-15', projects: 52, users: 380 },
  { date: '2024-05-16', projects: 53, users: 400 },
  { date: '2024-05-17', projects: 54, users: 420 },
  { date: '2024-05-18', projects: 55, users: 350 },
  { date: '2024-05-19', projects: 56, users: 180 },
  { date: '2024-05-20', projects: 57, users: 230 },
  { date: '2024-05-21', projects: 58, users: 140 },
  { date: '2024-05-22', projects: 59, users: 120 },
  { date: '2024-05-23', projects: 60, users: 290 },
  { date: '2024-05-24', projects: 61, users: 220 },
  { date: '2024-05-25', projects: 62, users: 250 },
  { date: '2024-05-26', projects: 63, users: 170 },
  { date: '2024-05-27', projects: 64, users: 460 },
  { date: '2024-05-28', projects: 65, users: 190 },
  { date: '2024-05-29', projects: 66, users: 130 },
  { date: '2024-05-30', projects: 67, users: 280 },
  { date: '2024-05-31', projects: 68, users: 230 },
  { date: '2024-06-01', projects: 69, users: 200 },
  { date: '2024-06-02', projects: 70, users: 410 },
  { date: '2024-06-03', projects: 71, users: 160 },
  { date: '2024-06-04', projects: 72, users: 380 },
  { date: '2024-06-05', projects: 73, users: 140 },
  { date: '2024-06-06', projects: 74, users: 250 },
  { date: '2024-06-07', projects: 75, users: 370 },
  { date: '2024-06-08', projects: 76, users: 320 },
  { date: '2024-06-09', projects: 77, users: 480 },
  { date: '2024-06-10', projects: 78, users: 200 },
  { date: '2024-06-11', projects: 79, users: 150 },
  { date: '2024-06-12', projects: 80, users: 420 },
  { date: '2024-06-13', projects: 81, users: 130 },
  { date: '2024-06-14', projects: 82, users: 380 },
  { date: '2024-06-15', projects: 83, users: 350 },
  { date: '2024-06-16', projects: 84, users: 310 },
  { date: '2024-06-17', projects: 85, users: 520 },
  { date: '2024-06-18', projects: 86, users: 170 },
  { date: '2024-06-19', projects: 87, users: 290 },
  { date: '2024-06-20', projects: 88, users: 450 },
  { date: '2024-06-21', projects: 89, users: 210 },
  { date: '2024-06-22', projects: 90, users: 270 },
  { date: '2024-06-23', projects: 91, users: 530 },
  { date: '2024-06-24', projects: 92, users: 180 },
  { date: '2024-06-25', projects: 93, users: 190 },
  { date: '2024-06-26', projects: 94, users: 380 },
  { date: '2024-06-27', projects: 95, users: 490 },
  { date: '2024-06-28', projects: 96, users: 200 },
  { date: '2024-06-29', projects: 97, users: 160 },
  { date: '2024-06-30', projects: 98, users: 400 },
];

const chartConfig = {
  portfolio: {
    label: 'Portfolio',
  },
  projects: {
    label: 'Proyek',
    color: 'var(--primary)',
  },
  users: {
    label: 'Pengguna',
    color: 'var(--primary)',
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState('90d');

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange('7d');
    }
  }, [isMobile]);

  const filteredData = chartData.filter(item => {
    const date = new Date(item.date);
    const referenceDate = new Date('2024-06-30');
    let daysToSubtract = 90;
    if (timeRange === '30d') {
      daysToSubtract = 30;
    } else if (timeRange === '7d') {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Statistik Portfolio</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Perkembangan proyek dan pengguna dalam 3 bulan terakhir
          </span>
          <span className="@[540px]/card:hidden">3 bulan terakhir</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillProjects" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-projects)" stopOpacity={1.0} />
                <stop offset="95%" stopColor="var(--color-projects)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-users)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-users)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={value => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={value => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="users"
              type="natural"
              fill="url(#fillUsers)"
              stroke="var(--color-users)"
              stackId="a"
            />
            <Area
              dataKey="projects"
              type="natural"
              fill="url(#fillProjects)"
              stroke="var(--color-projects)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
