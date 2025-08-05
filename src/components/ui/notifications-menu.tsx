import { Bell, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const notifications = [
  {
    id: 1,
    title: "Data sync completed",
    description: "All metrics have been updated successfully",
    time: "2 min ago",
    read: false,
  },
  {
    id: 2,
    title: "New client onboarded",
    description: "TechCorp has been added to your dashboard",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    title: "Server maintenance",
    description: "Scheduled maintenance completed",
    time: "3 hours ago",
    read: true,
  },
];

export function NotificationsMenu() {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="glass-hover relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-neon-pink rounded-full animate-pulse flex items-center justify-center">
              <span className="text-xs font-bold">{unreadCount}</span>
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 glass border-neon-cyan/30">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">Notifications</h4>
          <Button variant="ghost" size="sm">
            Mark all read
          </Button>
        </div>
        <Separator className="my-2" />
        <ScrollArea className="h-64">
          <div className="space-y-2">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg border transition-colors ${
                  notification.read 
                    ? 'bg-muted/20 border-muted' 
                    : 'bg-neon-cyan/5 border-neon-cyan/20'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{notification.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notification.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notification.time}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    {!notification.read && (
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Check className="h-3 w-3" />
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}