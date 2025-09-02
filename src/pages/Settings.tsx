import { Settings as SettingsIcon, Bell, Shield, CreditCard, Users, Key, FileText, ExternalLink } from "lucide-react";
import { TopNavigation, BottomNavigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/useToast";

const settingsCategories = [
  {
    title: "Account",
    items: [
      {
        icon: Bell,
        label: "Notifications",
        description: "Email and push notification preferences",
        action: "notifications",
        hasToggle: true,
        enabled: true,
      },
      {
        icon: Shield,
        label: "Privacy & Security",
        description: "Two-factor auth, password, and privacy settings",
        action: "security",
      },
      {
        icon: CreditCard,
        label: "Payment Methods",
        description: "Manage cards, bank accounts, and crypto wallets",
        action: "payments",
      },
    ],
  },
  {
    title: "Business",
    items: [
      {
        icon: Users,
        label: "Team Members",
        description: "Add team members and manage permissions",
        action: "team",
      },
      {
        icon: Key,
        label: "API Access",
        description: "API keys and webhook configuration",
        action: "api",
      },
      {
        icon: FileText,
        label: "Audit Log",
        description: "View account activity and security events",
        action: "audit",
      },
    ],
  },
];

export default function Settings() {
  const { showPlaceholder } = useToast();

  const handleSettingClick = (action: string) => {
    showPlaceholder(`${action} settings`);
  };

  const handleToggleChange = (action: string, enabled: boolean) => {
    showPlaceholder(`${enabled ? 'Enable' : 'Disable'} ${action}`);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopNavigation />
      
      <main className="container-fintech py-6">
        <div className="mb-6">
          <h1 className="text-h1 mb-2">Settings</h1>
          <p className="text-body text-muted-foreground">
            Manage your account and business preferences
          </p>
        </div>

        <div className="space-y-8">
          {settingsCategories.map((category) => (
            <div key={category.title}>
              <h2 className="text-h2 mb-4">{category.title}</h2>
              <div className="space-y-3">
                {category.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.action} className="fintech-card">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="p-2 bg-primary-light rounded-lg">
                            <Icon size={18} className="text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-foreground">{item.label}</h3>
                            <p className="text-sm text-muted-foreground text-truncate-tooltip">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          {item.hasToggle ? (
                            <Switch
                              checked={item.enabled}
                              onCheckedChange={(checked) => handleToggleChange(item.action, checked)}
                            />
                          ) : (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleSettingClick(item.action)}
                              className="h-8 w-8"
                            >
                              <ExternalLink size={16} />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Account Actions */}
        <div className="mt-8 space-y-4">
          <div className="fintech-card">
            <div className="text-center">
              <h3 className="text-h2 mb-2">Need Help?</h3>
              <p className="text-body text-muted-foreground mb-4">
                Contact our support team for assistance with your account
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button 
                  variant="outline"
                  onClick={() => showPlaceholder("Help center")}
                >
                  Help Center
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => showPlaceholder("Contact support")}
                >
                  Contact Support
                </Button>
              </div>
            </div>
          </div>

          <div className="fintech-card border-destructive/20">
            <div className="text-center">
              <h3 className="text-h2 text-destructive mb-2">Danger Zone</h3>
              <p className="text-body text-muted-foreground mb-4">
                Permanently delete your account and all associated data
              </p>
              <Button 
                variant="destructive"
                onClick={() => showPlaceholder("Delete account")}
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}