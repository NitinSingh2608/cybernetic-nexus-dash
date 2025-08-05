import { Settings, Palette, Shield, Database, Zap, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SettingsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="glass-hover">
          <Settings className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass border-neon-cyan/30">
        <DropdownMenuLabel>Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Palette className="mr-2 h-4 w-4" />
          Appearance
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Shield className="mr-2 h-4 w-4" />
          Privacy & Security
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Database className="mr-2 h-4 w-4" />
          Data Sources
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Zap className="mr-2 h-4 w-4" />
          Integrations
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Globe className="mr-2 h-4 w-4" />
          Language
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}