import { useState } from "react";
import { Search, Bell, MessageCircle, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DashboardHeaderProps {
  onChatToggle: () => void;
  isChatOpen: boolean;
}

export function DashboardHeader({ onChatToggle, isChatOpen }: DashboardHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 w-full border-b glass backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo & Title */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center animate-pulse-neon">
            <span className="text-sm font-bold">ND</span>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
              Neon Data Matrix
            </h1>
            <p className="text-xs text-muted-foreground">Real-time Business Intelligence</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search metrics, clients, or data..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 glass border-neon-cyan/30 focus:border-neon-cyan focus:shadow-neon-cyan"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="glass-hover relative"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-neon-pink rounded-full animate-pulse"></span>
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onChatToggle}
            className={`glass-hover ${isChatOpen ? 'bg-neon-cyan/20 shadow-neon-cyan' : ''}`}
          >
            <MessageCircle className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="glass-hover"
          >
            <Settings className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="glass-hover"
          >
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}