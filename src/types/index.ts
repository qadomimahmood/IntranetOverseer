export type StudioStatus = 'vacant' | 'active' | 'stopped';
export type SubscriberStatus = 'active' | 'stopped' | 'left';
export type PaymentStatus = 'paid' | 'partial' | 'unpaid';

export type ExpenseCategory = 'maintenance' | 'utilities' | 'cleaning' | 'supplies' | 'other';
export type ExpenseStatus = 'paid' | 'pending';

export interface Expense {
  id: string;
  title: string;
  category: ExpenseCategory;
  amount: number;
  date: string;
  status: ExpenseStatus;
  description?: string;
}

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

export type MaintenanceStatus = 'open' | 'in-progress' | 'resolved' | 'cancelled';
export type MaintenancePriority = 'low' | 'medium' | 'high' | 'urgent';

export interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  studioId?: string; // Optional because it might be a general building issue
  priority: MaintenancePriority;
  status: MaintenanceStatus;
  reportedBy: string; // User ID or Name
  reportedAt: string;
  assignedTo?: string; // Name of person handling it
  resolvedAt?: string;
}

export interface Router {
  id: string;
  floor: number;
  location: string;
  status: 'online' | 'offline' | 'maintenance';
  model: string;
  ipAddress: string;
  connectedDevices: number;
  uptime: string;
}

export interface BandwidthUsage {
  id: string;
  studioId: string;
  studioNumber: string;
  subscriberName?: string;
  uploadGB: number;
  downloadGB: number;
  totalGB: number;
  limitGB: number;
  status: 'normal' | 'warning' | 'critical';
}
