import { useState, useMemo } from "react";
import { DashboardHeader } from "./DashboardHeader";
import { MetricCard } from "./MetricCard";
import { DataVisualization } from "./DataVisualization";
import { ChatBot } from "./ChatBot";
import { StatusIndicator } from "./StatusIndicator";
import { useGoogleSheets } from "@/hooks/useGoogleSheets";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Package, 
  DollarSign, 
  TrendingUp, 
  Activity,
  RefreshCw,
  Mail,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function Dashboard() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { data, loading, error, refresh } = useGoogleSheets();

  const metrics = useMemo(() => {
    if (!data.length) return null;

    const totalClients = data.length;
    const totalProducts = data.reduce((sum, item) => sum + parseInt(item['No. of Products'] || '0'), 0);
    const totalRevenue = data.reduce((sum, item) => {
      const price = item.Price?.replace('₹', '').replace(',', '') || '0';
      return sum + parseInt(price);
    }, 0);
    
    const deliveredCount = data.filter(item => item.Status?.toLowerCase() === 'delivered').length;
    const inProgressCount = data.filter(item => item.Status?.toLowerCase() === 'in progress').length;
    const conversionRate = ((deliveredCount / totalClients) * 100);

    return {
      totalClients,
      totalProducts,
      totalRevenue,
      deliveredCount,
      inProgressCount,
      conversionRate: conversionRate.toFixed(1)
    };
  }, [data]);

  const chartData = useMemo(() => {
    if (!data.length) return { revenue: [], products: [], status: [] };

    // Revenue trend data
    const revenueData = data.map(item => ({
      name: item.Clients?.split(' ')[0] || 'Client',
      value: parseInt(item.Price?.replace('₹', '').replace(',', '') || '0')
    }));

    // Products data
    const productsData = data.map(item => ({
      name: item.Clients?.split(' ')[0] || 'Client',
      value: parseInt(item['No. of Products'] || '0')
    }));

    // Status distribution
    const statusCounts = data.reduce((acc, item) => {
      const status = item.Status?.toLowerCase() || 'unknown';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const statusData = Object.entries(statusCounts).map(([status, count]) => ({
      name: status.charAt(0).toUpperCase() + status.slice(1),
      value: count
    }));

    return { revenue: revenueData, products: productsData, status: statusData };
  }, [data]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4 animate-pulse-neon mx-auto">
            <Activity className="h-8 w-8 animate-pulse" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Loading Dashboard</h2>
          <p className="text-muted-foreground">Syncing real-time data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-neon-pink mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Connection Error</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={refresh} className="bg-gradient-primary">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry Connection
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader 
        onChatToggle={() => setIsChatOpen(!isChatOpen)} 
        isChatOpen={isChatOpen}
      />
      
      <main className="p-6 space-y-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
        {/* Header with Refresh */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent animate-glow-rotate">
              Business Intelligence Matrix
            </h1>
            <p className="text-muted-foreground mt-1">Real-time analytics and performance metrics</p>
          </div>
          <Button
            onClick={refresh}
            variant="outline"
            className="glass-hover border-neon-cyan/30"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
        </div>

        {/* Key Metrics Grid */}
        {metrics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Total Clients"
              value={metrics.totalClients}
              change={12.5}
              icon={<Users className="h-5 w-5" />}
              gradient="bg-gradient-primary"
              description="Active business relationships"
            />
            <MetricCard
              title="Total Products"
              value={metrics.totalProducts}
              change={8.3}
              icon={<Package className="h-5 w-5" />}
              gradient="bg-gradient-secondary"
              description="Products in portfolio"
            />
            <MetricCard
              title="Total Revenue"
              value={metrics.totalRevenue}
              change={15.7}
              icon={<DollarSign className="h-5 w-5" />}
              gradient="bg-gradient-success"
              prefix="₹"
              description="Cumulative earnings"
            />
            <MetricCard
              title="Conversion Rate"
              value={`${metrics.conversionRate}%`}
              change={5.2}
              icon={<TrendingUp className="h-5 w-5" />}
              gradient="bg-gradient-warning"
              description="Success rate"
            />
          </div>
        )}

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DataVisualization
            data={chartData.revenue}
            type="area"
            title="Revenue Distribution"
            height={300}
          />
          <DataVisualization
            data={chartData.products}
            type="bar"
            title="Products per Client"
            height={300}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <DataVisualization
              data={chartData.revenue}
              type="line"
              title="Revenue Trend Analysis"
              height={300}
            />
          </div>
          <div>
            <DataVisualization
              data={chartData.status}
              type="pie"
              title="Order Status Distribution"
              height={300}
            />
          </div>
        </div>

        {/* Client Data Table */}
        <Card className="glass glass-hover p-6 animate-fade-in-up">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
              Client Portfolio
            </h3>
            <Badge variant="outline" className="border-neon-cyan/30 text-neon-cyan">
              {data.length} Records
            </Badge>
          </div>
          
          <ScrollArea className="h-96">
            <div className="space-y-4">
              {data.map((item, index) => (
                <div 
                  key={index} 
                  className="glass border border-border/50 rounded-lg p-4 hover:border-neon-cyan/50 transition-all hover:shadow-neon-cyan/20"
                >
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                    <div>
                      <p className="font-semibold text-foreground">{item.Clients}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">{item.Email}</p>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Products</p>
                      <p className="font-semibold text-neon-cyan">{item['No. of Products']}</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Value</p>
                      <p className="font-semibold text-neon-green">{item.Price}</p>
                    </div>
                    
                    <div className="text-center">
                      <StatusIndicator status={item.Status} />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="glass-hover"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Performance Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass glass-hover p-6 animate-fade-in-up">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-success rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Delivered Orders</p>
                <p className="text-2xl font-bold text-neon-green">{metrics?.deliveredCount}</p>
              </div>
            </div>
          </Card>
          
          <Card className="glass glass-hover p-6 animate-fade-in-up">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-warning rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-neon-orange">{metrics?.inProgressCount}</p>
              </div>
            </div>
          </Card>
          
          <Card className="glass glass-hover p-6 animate-fade-in-up">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Activity className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. Products</p>
                <p className="text-2xl font-bold text-neon-cyan">
                  {metrics ? Math.round(metrics.totalProducts / metrics.totalClients) : 0}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}