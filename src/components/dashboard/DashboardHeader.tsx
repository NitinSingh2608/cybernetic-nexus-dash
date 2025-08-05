import { useState } from "react";
import { Search, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { UserMenu } from "@/components/ui/user-menu";
import { NotificationsMenu } from "@/components/ui/notifications-menu";
import { SettingsMenu } from "@/components/ui/settings-menu";

interface DashboardHeaderProps {
  onChatToggle: () => void;
  isChatOpen: boolean;
}

const mockData = [
  "Revenue Analytics",
  "Client Performance",
  "Data Visualization",
  "User Metrics",
  "Sales Dashboard",
  "Real-time Analytics",
  "Customer Insights",
  "Market Trends",
];

export function DashboardHeader({ onChatToggle, isChatOpen }: DashboardHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (value.trim()) {
      const filtered = mockData.filter(item =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(filtered);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  const handleSelectResult = (result: string) => {
    setSearchQuery(result);
    setShowResults(false);
    // Here you would typically navigate or filter data based on the selection
    console.log("Selected:", result);
  };

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
        <div className="flex-1 max-w-md mx-6 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search metrics, clients, or data..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => searchQuery && setShowResults(true)}
              className="pl-10 glass border-neon-cyan/30 focus:border-neon-cyan focus:shadow-neon-cyan"
            />
          </div>
          
          {/* Search Results Dropdown */}
          {showResults && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-neon-cyan/30 rounded-md shadow-lg z-50 glass max-h-60 overflow-y-auto">
              {searchResults.map((result, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectResult(result)}
                  className="w-full text-left px-4 py-2 hover:bg-neon-cyan/10 transition-colors border-b border-neon-cyan/10 last:border-b-0"
                >
                  {result}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <NotificationsMenu />
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onChatToggle}
            className={`glass-hover ${isChatOpen ? 'bg-neon-cyan/20 shadow-neon-cyan' : ''}`}
          >
            <MessageCircle className="h-4 w-4" />
          </Button>
          
          <ThemeToggle />
          
          <SettingsMenu />
          
          <UserMenu />
        </div>
      </div>
    </header>
  );
}