import { Home, FileText, User, Shield, Settings, RefreshCw, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/useToast";
const logoImageUrl = new URL("../../../MIDDLE (4).ico", import.meta.url).href;

const navigationItems = [
  { href: "/", icon: Home, label: "Dashboard" },
  { href: "/contracts", icon: FileText, label: "Contracts" },
  { href: "/disputes", icon: Shield, label: "Disputes" },
  { href: "/profile", icon: User, label: "Profile" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export function BottomNavigation() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur border-t border-card-border z-40">
      <div className="container-fintech max-w-full">
        <div className="flex items-center justify-around py-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200 min-h-[44px] min-w-[44px] justify-center",
                  isActive 
                    ? "text-primary bg-primary-light" 
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                <Icon size={20} />
                <span className="text-xs font-medium leading-none">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

interface TopNavigationProps {
  onRefresh?: () => void;
  lastUpdated?: string;
}

export function TopNavigation({ onRefresh, lastUpdated }: TopNavigationProps) {
  const navigate = useNavigate();
  const { showPlaceholder } = useToast();

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    } else {
      showPlaceholder("Refresh");
    }
  };

  const handleSignOut = () => {
    showPlaceholder("Sign out");
    // In real app: signOut().then(() => navigate("/login"))
  };

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-card-border">
      <div className="container-fintech">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoImageUrl} alt="Middle" className="h-12 w-auto" />
          </Link>
          
          <div className="flex items-center gap-2">
            {lastUpdated && (
              <span className="text-caption text-muted-foreground hidden sm:block">
                Updated {lastUpdated}
              </span>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRefresh}
              className="h-8 w-8"
              aria-label="Refresh data"
            >
              <RefreshCw size={16} />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-secondary"
                  aria-label="User menu"
                >
                  <User size={16} className="text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}