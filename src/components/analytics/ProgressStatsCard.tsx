
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProgressStatsCardProps {
  title: string;
  value: number | string;
  change?: number;
  changeLabel?: string;
  changeFormat?: 'number' | 'percent';
}

const ProgressStatsCard: React.FC<ProgressStatsCardProps> = ({
  title,
  value,
  change = 0,
  changeLabel = '',
  changeFormat = 'number'
}) => {
  const isPositive = change > 0;
  const isNegative = change < 0;
  
  const formatChange = () => {
    if (changeFormat === 'percent') {
      return `${isPositive ? '+' : ''}${change}%`;
    }
    return `${isPositive ? '+' : ''}${change}`;
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-sm font-medium text-muted-foreground">{title}</div>
        <div className="text-2xl font-bold mt-2">{value}</div>
        {change !== 0 && (
          <div className="flex items-center mt-1">
            <span 
              className={cn(
                "text-xs font-medium",
                isPositive ? "text-green-500" : isNegative ? "text-red-500" : "text-muted-foreground"
              )}
            >
              <span className="flex items-center">
                {isPositive && <ArrowUpIcon className="h-3 w-3 mr-1" />}
                {isNegative && <ArrowDownIcon className="h-3 w-3 mr-1" />}
                {formatChange()}
              </span>
            </span>
            {changeLabel && <span className="text-xs text-muted-foreground ml-1">{changeLabel}</span>}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProgressStatsCard;
