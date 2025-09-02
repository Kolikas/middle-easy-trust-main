import { FileText, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { TopNavigation, BottomNavigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Contract {
  id: string;
  title: string;
  parties: string[];
  amount: string;
  status: "pending" | "active" | "completed" | "disputed";
  createdAt: string;
  progress: number;
}

const mockContracts: Contract[] = [
  {
    id: "1",
    title: "Mobile App Development",
    parties: ["@sarah_dev", "@tech_startup"],
    amount: "$2,500",
    status: "active",
    createdAt: "2 days ago",
    progress: 60
  },
  {
    id: "2", 
    title: "Website Redesign",
    parties: ["@designer_pro", "@local_business"],
    amount: "$1,800",
    status: "completed",
    createdAt: "1 week ago",
    progress: 100
  },
  {
    id: "3",
    title: "Logo Design Package",
    parties: ["@creative_studio", "@startup_xyz"],
    amount: "$750",
    status: "disputed",
    createdAt: "3 days ago",
    progress: 80
  },
  {
    id: "4",
    title: "Content Writing",
    parties: ["@writer_jane", "@marketing_co"],
    amount: "$450",
    status: "pending",
    createdAt: "5 hours ago",
    progress: 0
  }
];

const getStatusIcon = (status: Contract["status"]) => {
  switch (status) {
    case "completed":
      return CheckCircle;
    case "disputed":
      return AlertTriangle;
    case "active":
      return Clock;
    default:
      return FileText;
  }
};

const getStatusColor = (status: Contract["status"]) => {
  switch (status) {
    case "completed":
      return "text-success";
    case "disputed":
      return "text-destructive";
    case "active":
      return "text-primary";
    default:
      return "text-muted-foreground";
  }
};

export default function Contracts() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <TopNavigation />
      
      <main className="container-fintech py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Your Contracts</h1>
            <p className="text-muted-foreground">Manage all your escrow agreements</p>
          </div>
          <Link to="/create-contract">
            <Button>New Contract</Button>
          </Link>
        </div>

        {/* Contracts List */}
        <div className="space-y-4">
          {mockContracts.map((contract) => {
            const StatusIcon = getStatusIcon(contract.status);
            return (
              <Link key={contract.id} to={`/contract/${contract.id}`}>
                <div className="fintech-card trust-hover">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-current/10 ${getStatusColor(contract.status)}`}>
                        <StatusIcon size={18} className="text-current" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{contract.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {contract.parties.join(" ↔ ")}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">{contract.amount}</p>
                      <p className="text-sm text-muted-foreground capitalize">
                        {contract.status}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span>Progress</span>
                      <span>{contract.progress}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${contract.progress}%` }}
                      />
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Created {contract.createdAt}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}