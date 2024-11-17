export interface SubscriptionData {
    subscription_id: number;
    user_id: number;
    user_name: string;
    start_date: string;
    end_date: string;
  }
  
  export interface DashboardData {
    totalUsers: number;
    completedTransactions: number;
    totalRevenue: number;
    activeSubscriptions: SubscriptionData[];
    inactiveSubscriptions: SubscriptionData[];
  }
  