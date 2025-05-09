
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

interface TimelineDataPoint {
  date: string;
  problems: number;
  xp: number;
}

interface ProgressTimelineProps {
  data: TimelineDataPoint[];
  detailed?: boolean;
}

const ProgressTimeline: React.FC<ProgressTimelineProps> = ({ data, detailed = false }) => {
  const config = {
    problems: {
      label: "Problems Solved",
      color: "hsl(var(--primary))"
    },
    xp: {
      label: "XP Earned",
      color: "hsl(var(--secondary) / 80%)"
    }
  };

  return (
    <ChartContainer className="w-full h-full" config={config}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tickFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                ...(detailed ? { year: '2-digit' } : {})
              });
            }} 
          />
          <YAxis yAxisId="left" />
          {detailed && <YAxis yAxisId="right" orientation="right" />}
          <Tooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="problems"
            name="Problems Solved"
            stroke="hsl(var(--primary))"
            activeDot={{ r: 8 }}
          />
          {detailed && (
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="xp"
              name="XP Earned"
              stroke="hsl(var(--secondary) / 80%)"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default ProgressTimeline;
