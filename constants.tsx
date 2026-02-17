
import { TransactionStatus, TransactionType, Transaction, BankAccount, UserProfile, SupportTicket } from './types';

export const MOCK_USER: UserProfile = {
  name: 'Alex Johnson',
  phone: '+91 98765 43210',
  email: 'alex.j@zenithpay.com',
  upiId: 'alexjohnson@zenithpay',
  avatar: 'https://picsum.photos/seed/alex/200',
  isAdmin: true
};

export const MOCK_BANKS: BankAccount[] = [
  {
    id: '1',
    bankName: 'Global Trust Bank',
    accountNumber: '**** 4582',
    isPrimary: true,
    balance: 12450.75,
    logo: 'https://picsum.photos/seed/bank1/100'
  },
  {
    id: '2',
    bankName: 'City Digital Bank',
    accountNumber: '**** 9120',
    isPrimary: false,
    balance: 3200.00,
    logo: 'https://picsum.photos/seed/bank2/100'
  }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'TX101',
    title: 'Starbucks Coffee',
    amount: 15.50,
    date: '2024-05-20',
    type: TransactionType.SENT,
    status: TransactionStatus.SUCCESS,
    category: 'Food & Dining'
  },
  {
    id: 'TX102',
    title: 'Sarah Miller',
    amount: 120.00,
    date: '2024-05-19',
    type: TransactionType.RECEIVED,
    status: TransactionStatus.SUCCESS,
    category: 'Transfer',
    recipient: 'Sarah Miller'
  },
  {
    id: 'TX103',
    title: 'Electricity Bill',
    amount: 85.20,
    date: '2024-05-18',
    type: TransactionType.BILL,
    status: TransactionStatus.SUCCESS,
    category: 'Utilities'
  },
  {
    id: 'TX104',
    title: 'Verizon Wireless',
    amount: 45.00,
    date: '2024-05-17',
    type: TransactionType.RECHARGE,
    status: TransactionStatus.FAILED,
    category: 'Bills'
  },
  {
    id: 'TX105',
    title: 'Uber Ride',
    amount: 22.40,
    date: '2024-05-16',
    type: TransactionType.SENT,
    status: TransactionStatus.SUCCESS,
    category: 'Transport'
  }
];

export const MOCK_TICKETS: SupportTicket[] = [
  {
    id: 'TK-001',
    userName: 'Rajesh Kumar',
    subject: 'Payment stuck for 2 hours',
    status: 'OPEN',
    priority: 'HIGH',
    timestamp: '10 mins ago'
  },
  {
    id: 'TK-002',
    userName: 'Anjali Sharma',
    subject: 'Cannot link bank account',
    status: 'IN_PROGRESS',
    priority: 'MEDIUM',
    timestamp: '1 hour ago'
  },
  {
    id: 'TK-003',
    userName: 'Vikram Singh',
    subject: 'KYC Verification pending',
    status: 'CLOSED',
    priority: 'LOW',
    timestamp: '1 day ago'
  }
];
