
import React from 'react';
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

interface SkillDataPoint {
  topic: string;
  score: number;
  average: number;
}

interface SkillBreakdownChartProps {
  data: SkillDataPoint[];
  detailed?: boolean;
}

const SkillBreakdownChart: React.FC<SkillBreakdownChartProps> = ({ data, detailed = false }) => {
  const config = {
    score: {
      label: "Your Score",
      color: "hsl(var(--primary))"
    },
    average: {
      label: "Platform Average",
      color: "hsl(var(--muted-foreground) / 70%)"
    }
  };

  return (
    <ChartContainer className="w-full h-full" config={config}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="topic" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar
            name="Your Score"
            dataKey="score"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary) / 30%)"
            fillOpacity={0.6}
          />
          {detailed && (
            <Radar
              name="Platform Average"
              dataKey="average"
              stroke="hsl(var(--muted-foreground))"
              fill="hsl(var(--muted-foreground) / 30%)"
              fillOpacity={0.4}
            />
          )}
          <Legend />
          <Tooltip content={<ChartTooltipContent />} />
        </RadarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default SkillBreakdownChart;
