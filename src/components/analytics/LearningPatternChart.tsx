
import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PatternDataPoint {
  name: string;
  weekday: number;
  weekend: number;
  morning: number;
  afternoon: number;
  evening: number;
  night: number;
  duration: number;
}

interface LearningPatternChartProps {
  data: PatternDataPoint[];
}

const LearningPatternChart: React.FC<LearningPatternChartProps> = ({ data }) => {
  const [viewMode, setViewMode] = useState<'time' | 'day' | 'duration'>('time');
  
  const config = {
    morning: {
      label: "Morning (5AM-12PM)",
      color: "#FFB74D" // Orange
    },
    afternoon: {
      label: "Afternoon (12PM-5PM)",
      color: "#4FC3F7" // Light blue
    },
    evening: {
      label: "Evening (5PM-10PM)",
      color: "#7986CB" // Indigo
    },
    night: {
      label: "Night (10PM-5AM)",
      color: "#5C6BC0" // Darker blue
    },
    weekday: {
      label: "Weekdays",
      color: "#4DB6AC" // Teal
    },
    weekend: {
      label: "Weekends",
      color: "#FF8A65" // Deep orange
    },
    duration: {
      label: "Session Duration (min)",
      color: "hsl(var(--primary))"
    }
  };

  return (
    <div className="h-full flex flex-col">
      <Tabs 
        value={viewMode} 
        onValueChange={(v) => setViewMode(v as 'time' | 'day' | 'duration')} 
        className="mb-4"
      >
        <TabsList>
          <TabsTrigger value="time">Time of Day</TabsTrigger>
          <TabsTrigger value="day">Day of Week</TabsTrigger>
          <TabsTrigger value="duration">Session Duration</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="flex-1">
        <ChartContainer className="w-full h-full" config={config}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend />
              {viewMode === 'time' && (
                <>
                  <Bar dataKey="morning" name="Morning" fill={config.morning.color} />
                  <Bar dataKey="afternoon" name="Afternoon" fill={config.afternoon.color} />
                  <Bar dataKey="evening" name="Evening" fill={config.evening.color} />
                  <Bar dataKey="night" name="Night" fill={config.night.color} />
                </>
              )}
              {viewMode === 'day' && (
                <>
                  <Bar dataKey="weekday" name="Weekdays" fill={config.weekday.color} />
                  <Bar dataKey="weekend" name="Weekends" fill={config.weekend.color} />
                </>
              )}
              {viewMode === 'duration' && (
                <>
                  <Bar dataKey="duration" name="Avg. Session (min)" fill={config.duration.color} />
                </>
              )}
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
};

export default LearningPatternChart;
