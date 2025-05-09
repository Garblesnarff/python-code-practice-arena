
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface ProgressStatsCardProps {
  title: string;
  value: number;
  change: number;
  description: string;
  prefix?: string;
  suffix?: string;
}

const ProgressStatsCard: React.FC<ProgressStatsCardProps> = ({
  title,
  value,
  change,
  description,
  prefix = '',
  suffix = '',
}) => {
  const formattedValue = `${prefix}${value.toLocaleString()}${suffix}`;
  const isPositive = change >= 0;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formattedValue}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {change !== 0 && (
          <div className={`flex items-center mt-2 text-xs ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? (
              <TrendingUp className="h-3 w-3 mr-1" />
            ) : (
              <TrendingDown className="h-3 w-3 mr-1" />
            )}
            <span>{isPositive ? '+' : ''}{change}% from last week</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProgressStatsCard;
