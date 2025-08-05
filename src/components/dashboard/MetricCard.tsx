import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: ReactNode;
  gradient: string;
  description?: string;
  prefix?: string;
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  icon, 
  gradient, 
  description,
  prefix = ""
}: MetricCardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <Card className="glass glass-hover p-6 relative overflow-hidden group animate-fade-in-up">
      {/* Background gradient */}
      <div className={`absolute inset-0 ${gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-lg ${gradient} shadow-lg animate-float`}>
            {icon}
          </div>
          {change !== undefined && (
            <div className={`flex items-center space-x-1 text-sm ${
              isPositive ? 'text-neon-green' : isNegative ? 'text-neon-pink' : 'text-muted-foreground'
            }`}>
              {isPositive && <TrendingUp className="h-3 w-3" />}
              {isNegative && <TrendingDown className="h-3 w-3" />}
              <span>{Math.abs(change)}%</span>
            </div>
          )}
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold text-foreground">
            {prefix}{typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {description && (
            <p className="text-xs text-muted-foreground mt-2">{description}</p>
          )}
        </div>
      </div>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className={`absolute inset-0 ${gradient.includes('cyan') ? 'shadow-neon-cyan' : 
          gradient.includes('purple') ? 'shadow-neon-purple' : 'shadow-neon-pink'} blur-xl`} />
      </div>
    </Card>
  );
}