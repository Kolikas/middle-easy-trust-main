import { Wallet, Lock, FileText, TrendingUp } from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { TopNavigation, BottomNavigation } from "@/components/ui/navigation";
import { mockAPI, mockUser } from "@/lib/mockData";
import { useToast } from "@/hooks/useToast";
import { useState, useEffect } from "react";

interface DashboardMetrics {
  availableBalance: string;
  balanceChange: string;
  fundsInEscrow: string;
  escrowCount: string;
  activeContracts: string;
  contractsChange: string;
  trustScore: string;
  trustChange: string;
  lastUpdated: string;
}

export default function Dashboard() {
  const { showPlaceholder } = useToast();
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const data = await mockAPI.getDashboardMetrics();
      setMetrics(data);
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleWalletClick = () => {
    showPlaceholder("Wallet page with transactions");
  };

  const handleEscrowClick = () => {
    window.location.href = "/contracts?filter=escrow";
  };

  const handleContractsClick = () => {
    window.location.href = "/contracts?filter=active";
  };

  const handleTrustScoreClick = () => {
    showPlaceholder("Trust score details and improvement tips");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <TopNavigation />
        <main className="container-fintech py-6">
          <div className="mb-8">
            <div className="h-8 w-64 loading-shimmer rounded mb-2"></div>
            <div className="h-5 w-96 loading-shimmer rounded"></div>
          </div>
          <div className="grid-metrics mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="fintech-card">
                <div className="h-20 loading-shimmer rounded"></div>
              </div>
            ))}
          </div>
        </main>
        <BottomNavigation />
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <TopNavigation />
        <main className="container-fintech py-6">
          <div className="fintech-card text-center">
            <h2 className="text-h2 mb-2">Unable to load dashboard</h2>
            <p className="text-muted-foreground mb-4">Please try refreshing the page</p>
            <button 
              onClick={loadDashboardData}
              className="btn-primary rounded-lg"
            >
              Try Again
            </button>
          </div>
        </main>
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopNavigation 
        onRefresh={loadDashboardData}
        lastUpdated="just now"
      />
      
      <main className="container-fintech py-6">
        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-h1 mb-2">
            Welcome back, {mockUser.name.split(' ')[0]}
          </h1>
          <p className="text-body text-muted-foreground">
            Here's what's happening with your escrow agreements
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid-metrics mb-6 sm:mb-8">
          <MetricCard
            title="Available Balance"
            value={metrics.availableBalance}
            change={metrics.balanceChange}
            changeType="positive"
            icon={Wallet}
            onClick={handleWalletClick}
          />
          <MetricCard
            title="Funds in Escrow"
            value={metrics.fundsInEscrow}
            change={metrics.escrowCount}
            changeType="neutral"
            icon={Lock}
            onClick={handleEscrowClick}
          />
          <MetricCard
            title="Active Contracts"
            value={metrics.activeContracts}
            change={metrics.contractsChange}
            changeType="positive"
            icon={FileText}
            onClick={handleContractsClick}
          />
          <MetricCard
            title="Trust Score"
            value={metrics.trustScore}
            change={metrics.trustChange}
            changeType="positive"
            icon={TrendingUp}
            onClick={handleTrustScoreClick}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid-main mb-6 sm:mb-8">
          <QuickActions />
          <ActivityFeed />
        </div>

        {/* Trust Building Section */}
        <div className="fintech-card bg-gradient-surface text-center">
          <h3 className="text-h2 mb-2">
            Middle — the safest way to agree, sign, and move money online.
          </h3>
          <p className="text-body text-muted-foreground">
            Your funds are protected by bank-level security and smart contracts
          </p>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}