import { AlertTriangle, Clock, CheckCircle, Upload, MessageSquare, Scale, ExternalLink } from "lucide-react";
import { TopNavigation, BottomNavigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/useToast";
import { cn } from "@/lib/utils";

interface Dispute {
  id: string;
  contractId: string;
  contractTitle: string;
  status: "open" | "in_review" | "resolved" | "escalated";
  amount: string;
  raisedBy: string;
  lastUpdate: string;
  description: string;
}

const mockDisputes: Dispute[] = [
  {
    id: "dispute-1",
    contractId: "contract-3",
    contractTitle: "Logo Design Package",
    status: "open",
    amount: "$750",
    raisedBy: "@startup_xyz",
    lastUpdate: "2 hours ago",
    description: "Quality concerns with final deliverables",
  },
  {
    id: "dispute-2",
    contractId: "contract-1",
    contractTitle: "Mobile App Development",
    status: "resolved",
    amount: "$2,500",
    raisedBy: "@tech_startup",
    lastUpdate: "1 week ago",
    description: "Timeline extension request",
  },
];

const getStatusIcon = (status: Dispute["status"]) => {
  switch (status) {
    case "resolved":
      return CheckCircle;
    case "escalated":
      return Scale;
    case "in_review":
      return Clock;
    default:
      return AlertTriangle;
  }
};

const getStatusColor = (status: Dispute["status"]) => {
  switch (status) {
    case "resolved":
      return "text-success";
    case "escalated":
      return "text-destructive";
    case "in_review":
      return "text-primary";
    default:
      return "text-warning";
  }
};

const getStatusBadge = (status: Dispute["status"]) => {
  switch (status) {
    case "resolved":
      return "status-badge--completed";
    case "escalated":
      return "status-badge--disputed";
    case "in_review":
      return "status-badge--active";
    default:
      return "status-badge--pending";
  }
};

export default function Disputes() {
  const { showPlaceholder } = useToast();

  const handleDisputeClick = (dispute: Dispute) => {
    showPlaceholder(`Dispute details for ${dispute.contractTitle}`);
  };

  const handleNewDispute = () => {
    showPlaceholder("Create new dispute");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopNavigation />
      
      <main className="container-fintech py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-h1">Dispute Resolution</h1>
            <p className="text-body text-muted-foreground">
              Manage and resolve contract disputes
            </p>
          </div>
          <Button onClick={handleNewDispute} className="btn-primary">
            New Dispute
          </Button>
        </div>

        {/* Empty State */}
        {mockDisputes.length === 0 ? (
          <div className="fintech-card text-center py-12">
            <AlertTriangle className="mx-auto mb-4 text-muted-foreground" size={48} />
            <h2 className="text-h2 mb-2">No disputes</h2>
            <p className="text-body text-muted-foreground mb-6">
              All your contracts are running smoothly
            </p>
            <Button variant="outline" onClick={() => window.location.href = "/contracts"}>
              View Contracts
            </Button>
          </div>
        ) : (
          /* Disputes List */
          <div className="space-y-4">
            {mockDisputes.map((dispute) => {
              const StatusIcon = getStatusIcon(dispute.status);
              return (
                <button
                  key={dispute.id}
                  onClick={() => handleDisputeClick(dispute)}
                  className="w-full text-left"
                >
                  <div className="fintech-card trust-hover">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={cn("p-2 rounded-lg bg-current/10", getStatusColor(dispute.status))}>
                          <StatusIcon size={18} className="text-current" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{dispute.contractTitle}</h3>
                          <p className="text-sm text-muted-foreground">
                            Raised by {dispute.raisedBy}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">{dispute.amount}</p>
                        <span className={cn("status-badge", getStatusBadge(dispute.status))}>
                          {dispute.status.replace("_", " ")}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">
                      {dispute.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">
                        Last updated {dispute.lastUpdate}
                      </p>
                      <ExternalLink size={14} className="text-muted-foreground" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Help Section */}
        <div className="mt-8 fintech-card bg-gradient-surface">
          <div className="flex items-start gap-4">
            <Scale className="text-primary flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="text-h2 mb-2">Need help with a dispute?</h3>
              <p className="text-body text-muted-foreground mb-4">
                Our resolution center helps parties find fair solutions quickly.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => showPlaceholder("Dispute guide")}
                >
                  <MessageSquare size={16} className="mr-2" />
                  Resolution Guide
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => showPlaceholder("Contact support")}
                >
                  <Upload size={16} className="mr-2" />
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}