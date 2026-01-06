export type StudioStatus = 'vacant' | 'active' | 'stopped';
export type SubscriberStatus = 'active' | 'stopped' | 'left';
export type PaymentStatus = 'paid' | 'partial' | 'unpaid';

export interface Studio {
  id: string;
  studioNumber: string;
  floor: number;
  status: StudioStatus;
  monthlyPrice: number;
  subscriberId?: string;
}

export interface Subscriber {
  id: string;
  studioId: string;
  name: string;
  phone?: string;
  startDate: string;
  currentPrice: number;
  status: SubscriberStatus;
}

export interface MonthlySubscription {
  id: string;
  studioId: string;
  month: string; // YYYY-MM format
  amountDue: number;
  amountPaid: number;
  remaining: number;
  status: PaymentStatus;
}

export interface PaymentRecord {
  id: string;
  studioId: string;
  studioNumber: string;
  amount: number;
  dateTime: string;
  enteredBy: string;
  enteredByRole: 'owner' | 'guard';
  allocations: PaymentAllocation[];
  isReversed?: boolean;
  reversedBy?: string;
  reversedAt?: string;
  reversalReason?: string;
}

export interface PaymentAllocation {
  month: string;
  amount: number;
}

export interface AuditLogEntry {
  id: string;
  userId: string;
  username: string;
  action: string;
  details: string;
  reason?: string;
  timestamp: string;
}

export interface MonthlyOverview {
  month: string;
  totalExpected: number;
  totalCollected: number;
  outstanding: number;
  paidCount: number;
  partialCount: number;
  unpaidCount: number;
}
