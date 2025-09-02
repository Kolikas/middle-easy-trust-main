import { Clock, CheckCircle, AlertCircle, DollarSign, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/useToast";
import { mockActivities, type Activity } from "@/lib/mockData";

const getActivityIcon = (type: Activity["type"]) => {
  switch (type) {
    case "contract_created":
      return Clock;
    case "funds_received":
    case "payment_sent":
      return DollarSign;
    case "dispute_raised":
      return AlertCircle;
    case "contract_completed":
      return CheckCircle;
    default:
      return CheckCircle;
  }
};

const getStatusColor = (status: Activity["status"]) => {
  switch (status) {
    case "completed":
      return "text-success";
    case "warning":
      return "text-warning";
    default:
      return "text-primary";
  }
};

export function ActivityFeed() {
  const { showPlaceholder } = useToast();

  const handleViewAll = () => {
    showPlaceholder("Activity history");
  };

  const handleActivityClick = (activity: Activity) => {
    if (activity.contractId) {
      // Would navigate to contract detail
      showPlaceholder(`View contract ${activity.contractId}`);
    } else {
      showPlaceholder("Activity details");
    }
  };

  return (
    <div className="fintech-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-h2">Recent Activity</h3>
        <button 
          onClick={handleViewAll}
          className="text-sm text-primary hover:text-primary-hover transition-colors flex items-center gap-1"
        >
          View all
          <ExternalLink size={12} />
        </button>
      </div>
      
      <div className="space-y-3">
        {mockActivities.slice(0, 4).map((activity) => {
          const Icon = getActivityIcon(activity.type);
          return (
            <button
              key={activity.id}
              onClick={() => handleActivityClick(activity)}
              className="w-full text-left"
            >
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                <div className={cn("p-2 rounded-full flex-shrink-0", getStatusColor(activity.status), "bg-current/10")}>
                  <Icon size={14} className="text-current" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-medium text-sm text-foreground text-truncate-tooltip">
                      {activity.title}
                    </p>
                    {activity.amount && (
                      <span className="text-sm font-semibold text-foreground flex-shrink-0">
                        {activity.amount}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground text-truncate-tooltip mb-1">
                    {activity.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity.timestamp}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}