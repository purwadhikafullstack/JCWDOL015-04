export interface ISubsPayment {
  subs_type_id: number;
}

export interface IConfirmPayment {
  transaction_id: number;
  status: 'completed' | 'failed';
}

export interface DashboardMetrics {
  totalTransactions: number;
  pendingTransactions: number;
  completedTransactions: number;
  failedTransactions: number;
  transactions: Transaction[];
}

export interface Transaction {
  transaction_id: number;
  user: {
    first_name: string;
    last_name: string;
    email: string;
  };
  subscriptionType: {
    type: string;
  };
  amount: number;
  status: string;
  receipt: string;
}
