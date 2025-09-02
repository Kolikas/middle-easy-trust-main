// Mock data service for Middle app
// This will be replaced with real API calls later

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  trustScore: number;
  isVerified: boolean;
  completedContracts: number;
  disputeCount: number;
  rating: number;
}

export interface Contract {
  id: string;
  title: string;
  parties: string[];
  amount: string;
  status: "pending" | "active" | "completed" | "disputed";
  createdAt: string;
  updatedAt: string;
  progress: number;
  dueDate?: string;
  description?: string;
}

export interface Transaction {
  id: string;
  type: "deposit" | "withdrawal" | "escrow" | "release";
  amount: string;
  description: string;
  timestamp: string;
  status: "pending" | "completed" | "failed";
  contractId?: string;
}

export interface Activity {
  id: string;
  type: "contract_created" | "funds_received" | "dispute_raised" | "payment_sent" | "contract_completed";
  title: string;
  description: string;
  timestamp: string;
  amount?: string;
  status: "pending" | "completed" | "warning";
  contractId?: string;
}

// Mock current user
export const mockUser: User = {
  id: "user-1",
  name: "Alex Johnson",
  email: "alex.johnson@email.com",
  trustScore: 98,
  isVerified: true,
  completedContracts: 12,
  disputeCount: 0,
  rating: 4.9,
};

// Mock contracts
export const mockContracts: Contract[] = [
  {
    id: "contract-1",
    title: "Mobile App Development",
    parties: ["@sarah_dev", "@tech_startup"],
    amount: "$2,500",
    status: "active",
    createdAt: "2 days ago",
    updatedAt: "1 hour ago",
    progress: 60,
    dueDate: "2024-02-15",
    description: "Full stack mobile app with React Native",
  },
  {
    id: "contract-2",
    title: "Website Redesign",
    parties: ["@designer_pro", "@local_business"],
    amount: "$1,800",
    status: "completed",
    createdAt: "1 week ago",
    updatedAt: "3 days ago",
    progress: 100,
    description: "Complete website redesign and branding",
  },
  {
    id: "contract-3",
    title: "Logo Design Package",
    parties: ["@creative_studio", "@startup_xyz"],
    amount: "$750",
    status: "disputed",
    createdAt: "3 days ago",
    updatedAt: "2 hours ago",
    progress: 80,
    description: "Logo design with multiple concepts",
  },
  {
    id: "contract-4",
    title: "Content Writing",
    parties: ["@writer_jane", "@marketing_co"],
    amount: "$450",
    status: "pending",
    createdAt: "5 hours ago",
    updatedAt: "5 hours ago",
    progress: 0,
    description: "Blog posts and marketing copy",
  },
];

// Mock activities
export const mockActivities: Activity[] = [
  {
    id: "activity-1",
    type: "contract_created",
    title: "New contract created",
    description: "Freelance work agreement with @sarah_dev",
    timestamp: "2 hours ago",
    amount: "$2,500",
    status: "pending",
    contractId: "contract-1",
  },
  {
    id: "activity-2",
    type: "funds_received",
    title: "Funds received",
    description: "Payment from @tech_startup for web design",
    timestamp: "1 day ago",
    amount: "$1,800",
    status: "completed",
    contractId: "contract-2",
  },
  {
    id: "activity-3",
    type: "payment_sent",
    title: "Payment released",
    description: "Payment to @freelancer_pro completed",
    timestamp: "2 days ago",
    amount: "$750",
    status: "completed",
  },
  {
    id: "activity-4",
    type: "dispute_raised",
    title: "Dispute opened",
    description: "Issue with delivery timeline for mobile app",
    timestamp: "3 days ago",
    status: "warning",
    contractId: "contract-3",
  },
];

// Mock transactions
export const mockTransactions: Transaction[] = [
  {
    id: "tx-1",
    type: "deposit",
    amount: "$2,500",
    description: "Contract funding - Mobile App Development",
    timestamp: "2 hours ago",
    status: "completed",
    contractId: "contract-1",
  },
  {
    id: "tx-2",
    type: "release",
    amount: "$1,800",
    description: "Contract completion - Website Redesign",
    timestamp: "3 days ago",
    status: "completed",
    contractId: "contract-2",
  },
  {
    id: "tx-3",
    type: "escrow",
    amount: "$750",
    description: "Funds held in escrow - Logo Design",
    timestamp: "3 days ago",
    status: "pending",
    contractId: "contract-3",
  },
];

// Mock API functions
export const mockAPI = {
  // Dashboard data
  getDashboardMetrics: () => {
    const totalInEscrow = mockContracts
      .filter(c => c.status === "active" || c.status === "disputed")
      .reduce((sum, c) => sum + parseFloat(c.amount.replace("$", "").replace(",", "")), 0);
    
    const activeContracts = mockContracts.filter(c => c.status === "active").length;
    
    return Promise.resolve({
      availableBalance: "$12,450",
      balanceChange: "+8.2%",
      fundsInEscrow: `$${totalInEscrow.toLocaleString()}`,
      escrowCount: `${activeContracts} active`,
      activeContracts: activeContracts.toString(),
      contractsChange: "+2 this week",
      trustScore: `${mockUser.trustScore}%`,
      trustChange: "+2 points",
      lastUpdated: new Date().toISOString(),
    });
  },

  // User data
  getCurrentUser: () => Promise.resolve(mockUser),

  // Contracts
  getContracts: (filter?: string) => {
    let filtered = mockContracts;
    if (filter === "active") filtered = mockContracts.filter(c => c.status === "active");
    if (filter === "escrow") filtered = mockContracts.filter(c => c.status === "active" || c.status === "disputed");
    return Promise.resolve(filtered);
  },

  getContract: (id: string) => Promise.resolve(mockContracts.find(c => c.id === id)),

  // Activities
  getActivities: () => Promise.resolve(mockActivities),

  // Transactions
  getTransactions: () => Promise.resolve(mockTransactions),

  // Wallet
  getWalletData: () => Promise.resolve({
    balance: "$12,450",
    transactions: mockTransactions,
  }),
};

// Feature flags
export const featureFlags = {
  useMockData: true, // Set to false when real API is ready
  enableNotifications: true,
  enableDisputes: true,
  enableVerification: true,
};