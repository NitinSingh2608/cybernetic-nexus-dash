interface StatusIndicatorProps {
  status: string;
}

export function StatusIndicator({ status }: StatusIndicatorProps) {
  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return {
          color: 'bg-neon-green',
          glow: 'shadow-[0_0_10px_hsl(127,100%,50%)]',
          text: 'text-neon-green'
        };
      case 'in progress':
        return {
          color: 'bg-neon-orange',
          glow: 'shadow-[0_0_10px_hsl(30,100%,50%)]',
          text: 'text-neon-orange'
        };
      case 'pending':
        return {
          color: 'bg-neon-purple',
          glow: 'shadow-[0_0_10px_hsl(270,100%,50%)]',
          text: 'text-neon-purple'
        };
      default:
        return {
          color: 'bg-muted',
          glow: '',
          text: 'text-muted-foreground'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <div className="flex items-center space-x-2">
      <div className={`w-2 h-2 rounded-full ${config.color} ${config.glow} animate-pulse`} />
      <span className={`text-sm font-medium ${config.text}`}>
        {status}
      </span>
    </div>
  );
}