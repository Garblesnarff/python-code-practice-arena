
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';

const data = [
  { name: 'Jan', problems: 4 },
  { name: 'Feb', problems: 8 },
  { name: 'Mar', problems: 15 },
  { name: 'Apr', problems: 12 },
  { name: 'May', problems: 18 },
  { name: 'Jun', problems: 24 },
  { name: 'Jul', problems: 30 },
];

const ProgressTimeline = () => {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorProblems" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="problems"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorProblems)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressTimeline;
