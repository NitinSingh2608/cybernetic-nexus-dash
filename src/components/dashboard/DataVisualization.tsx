import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";
import { Card } from "@/components/ui/card";

interface DataPoint {
  name: string;
  value: number;
  color?: string;
}

interface DataVisualizationProps {
  data: any[];
  type: 'area' | 'bar' | 'pie' | 'line';
  title: string;
  height?: number;
}

const NEON_COLORS = [
  'hsl(184, 100%, 50%)', // cyan
  'hsl(270, 100%, 50%)', // purple
  'hsl(325, 100%, 50%)', // pink
  'hsl(127, 100%, 50%)', // green
  'hsl(30, 100%, 50%)',  // orange
  'hsl(220, 100%, 50%)', // blue
];

export function DataVisualization({ data, type, title, height = 300 }: DataVisualizationProps) {
  const chartData = useMemo(() => {
    return data.map((item, index) => ({
      ...item,
      color: NEON_COLORS[index % NEON_COLORS.length]
    }));
  }, [data]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass border-neon-cyan/30 backdrop-blur-xl p-3 rounded-lg shadow-neon-cyan">
          <p className="text-sm font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name || 'Value'}: {typeof entry.value === 'number' ? 
                (String(entry.name || '').includes('Price') || String(entry.name || '').includes('Revenue') ? 
                  `₹${entry.value.toLocaleString()}` : 
                  entry.value.toLocaleString()
                ) : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (type) {
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(184, 100%, 50%)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(270, 100%, 50%)" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(240, 3.7%, 15.9%)" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(240, 5%, 64.9%)"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(240, 5%, 64.9%)"
                fontSize={12}
              />
              <Tooltip content={CustomTooltip} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(184, 100%, 50%)"
                fillOpacity={1}
                fill="url(#colorGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(240, 3.7%, 15.9%)" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(240, 5%, 64.9%)"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(240, 5%, 64.9%)"
                fontSize={12}
              />
              <Tooltip content={CustomTooltip} />
              <Bar 
                dataKey="value" 
                radius={[4, 4, 0, 0]}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={CustomTooltip} />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'line':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(240, 3.7%, 15.9%)" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(240, 5%, 64.9%)"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(240, 5%, 64.9%)"
                fontSize={12}
              />
              <Tooltip content={CustomTooltip} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(184, 100%, 50%)"
                strokeWidth={3}
                dot={{ fill: 'hsl(184, 100%, 50%)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'hsl(184, 100%, 50%)', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="glass glass-hover p-6 animate-fade-in-up">
      <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
        {title}
      </h3>
      {renderChart()}
    </Card>
  );
}