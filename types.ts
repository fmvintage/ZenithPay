
export enum TransactionStatus {
  SUCCESS = 'SUCCESS',
  PENDING = 'PENDING',
  FAILED = 'FAILED'
}

export enum TransactionType {
  SENT = 'SENT',
  RECEIVED = 'RECEIVED',
  RECHARGE = 'RECHARGE',
  BILL = 'BILL'
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  type: TransactionType;
  status: TransactionStatus;
  category: string;
  recipient?: string;
  note?: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  isPrimary: boolean;
  balance: number;
  logo: string;
}

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  upiId: string;
  avatar: string;
  isAdmin?: boolean;
}

export interface SupportTicket {
  id: string;
  userName: string;
  subject: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'CLOSED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  timestamp: string;
}

export interface AppState {
  balance: number;
  transactions: Transaction[];
  bankAccounts: BankAccount[];
  user: UserProfile;
}
