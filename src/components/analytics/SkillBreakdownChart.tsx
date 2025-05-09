
import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    subject: 'Arrays',
    score: 80,
    fullMark: 100,
  },
  {
    subject: 'Strings',
    score: 65,
    fullMark: 100,
  },
  {
    subject: 'Trees',
    score: 45,
    fullMark: 100,
  },
  {
    subject: 'DP',
    score: 30,
    fullMark: 100,
  },
  {
    subject: 'Graphs',
    score: 25,
    fullMark: 100,
  },
  {
    subject: 'Math',
    score: 70,
    fullMark: 100,
  },
];

const SkillBreakdownChart = () => {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar name="Skills" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillBreakdownChart;
