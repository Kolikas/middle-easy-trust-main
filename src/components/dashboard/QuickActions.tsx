import { Plus, Send, DollarSign, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/useToast";

const quickActions = [
  {
    href: "/create-contract",
    icon: Plus,
    label: "New Contract",
    description: "Create escrow agreement",
    variant: "default" as const,
    available: true
  },
  {
    href: "/send-money",
    icon: Send,
    label: "Send Money",
    description: "Transfer funds securely",
    variant: "secondary" as const,
    available: false
  },
  {
    href: "/request-payment",
    icon: DollarSign,
    label: "Request Payment",
    description: "Request funds",
    variant: "outline" as const,
    available: false
  },
  {
    href: "/contracts",
    icon: FileText,
    label: "View Contracts",
    description: "Manage agreements",
    variant: "outline" as const,
    available: true
  }
];

export function QuickActions() {
  const { showPlaceholder } = useToast();

  const handleActionClick = (action: typeof quickActions[0]) => {
    if (!action.available) {
      showPlaceholder(action.label);
    }
  };

  return (
    <div className="fintech-card">
      <h3 className="text-h2 mb-4">Quick Actions</h3>
      <div className="grid-actions">
        {quickActions.map((action) => {
          const Icon = action.icon;
          
          const content = (
            <div className="quick-action-card">
              <Icon size={20} className="mb-2" />
              <div className="text-center">
                <div className="font-medium text-sm text-wrap-button leading-tight mb-1">{action.label}</div>
                <div className="text-xs text-muted-foreground text-wrap-button leading-tight">{action.description}</div>
              </div>
            </div>
          );

          if (action.available) {
            return (
              <Link key={action.href} to={action.href} className="block">
                {content}
              </Link>
            );
          }

          return (
            <button
              key={action.href}
              onClick={() => handleActionClick(action)}
              className="block w-full"
            >
              {content}
            </button>
          );
        })}
      </div>
    </div>
  );
}