import { Studio, Subscriber, MonthlySubscription, PaymentRecord, AuditLogEntry } from '@/types';

// Generate studios for 6 floors (e.g., 4 studios per floor)
export const mockStudios: Studio[] = [
  // Floor 1
  { id: 's101', studioNumber: '101', floor: 1, status: 'active', monthlyPrice: 150, subscriberId: 'sub1' },
  { id: 's102', studioNumber: '102', floor: 1, status: 'active', monthlyPrice: 150, subscriberId: 'sub2' },
  { id: 's103', studioNumber: '103', floor: 1, status: 'vacant', monthlyPrice: 150 },
  { id: 's104', studioNumber: '104', floor: 1, status: 'active', monthlyPrice: 150, subscriberId: 'sub3' },
  // Floor 2
  { id: 's201', studioNumber: '201', floor: 2, status: 'active', monthlyPrice: 160, subscriberId: 'sub4' },
  { id: 's202', studioNumber: '202', floor: 2, status: 'stopped', monthlyPrice: 160, subscriberId: 'sub5' },
  { id: 's203', studioNumber: '203', floor: 2, status: 'active', monthlyPrice: 160, subscriberId: 'sub6' },
  { id: 's204', studioNumber: '204', floor: 2, status: 'active', monthlyPrice: 160, subscriberId: 'sub7' },
  // Floor 3
  { id: 's301', studioNumber: '301', floor: 3, status: 'active', monthlyPrice: 170, subscriberId: 'sub8' },
  { id: 's302', studioNumber: '302', floor: 3, status: 'active', monthlyPrice: 170, subscriberId: 'sub9' },
  { id: 's303', studioNumber: '303', floor: 3, status: 'vacant', monthlyPrice: 170 },
  { id: 's304', studioNumber: '304', floor: 3, status: 'active', monthlyPrice: 170, subscriberId: 'sub10' },
  // Floor 4
  { id: 's401', studioNumber: '401', floor: 4, status: 'active', monthlyPrice: 180, subscriberId: 'sub11' },
  { id: 's402', studioNumber: '402', floor: 4, status: 'active', monthlyPrice: 180, subscriberId: 'sub12' },
  { id: 's403', studioNumber: '403', floor: 4, status: 'active', monthlyPrice: 180, subscriberId: 'sub13' },
  { id: 's404', studioNumber: '404', floor: 4, status: 'vacant', monthlyPrice: 180 },
  // Floor 5
  { id: 's501', studioNumber: '501', floor: 5, status: 'active', monthlyPrice: 190, subscriberId: 'sub14' },
  { id: 's502', studioNumber: '502', floor: 5, status: 'active', monthlyPrice: 190, subscriberId: 'sub15' },
  { id: 's503', studioNumber: '503', floor: 5, status: 'stopped', monthlyPrice: 190, subscriberId: 'sub16' },
  { id: 's504', studioNumber: '504', floor: 5, status: 'active', monthlyPrice: 190, subscriberId: 'sub17' },
  // Floor 6
  { id: 's601', studioNumber: '601', floor: 6, status: 'active', monthlyPrice: 200, subscriberId: 'sub18' },
  { id: 's602', studioNumber: '602', floor: 6, status: 'active', monthlyPrice: 200, subscriberId: 'sub19' },
  { id: 's603', studioNumber: '603', floor: 6, status: 'active', monthlyPrice: 200, subscriberId: 'sub20' },
  { id: 's604', studioNumber: '604', floor: 6, status: 'vacant', monthlyPrice: 200 },
];

export const mockSubscribers: Subscriber[] = [
  { id: 'sub1', studioId: 's101', name: 'Ahmed Hassan', phone: '+20123456789', startDate: '2024-01-01', currentPrice: 150, status: 'active' },
  { id: 'sub2', studioId: 's102', name: 'Mohamed Ali', phone: '+20123456790', startDate: '2024-02-01', currentPrice: 150, status: 'active' },
  { id: 'sub3', studioId: 's104', name: 'Sara Ibrahim', phone: '+20123456791', startDate: '2024-01-15', currentPrice: 150, status: 'active' },
  { id: 'sub4', studioId: 's201', name: 'Fatima Omar', phone: '+20123456792', startDate: '2024-03-01', currentPrice: 160, status: 'active' },
  { id: 'sub5', studioId: 's202', name: 'Khaled Mahmoud', phone: '+20123456793', startDate: '2024-01-01', currentPrice: 160, status: 'stopped' },
  { id: 'sub6', studioId: 's203', name: 'Nour Saleh', phone: '+20123456794', startDate: '2024-04-01', currentPrice: 160, status: 'active' },
  { id: 'sub7', studioId: 's204', name: 'Youssef Ahmed', phone: '+20123456795', startDate: '2024-02-15', currentPrice: 160, status: 'active' },
  { id: 'sub8', studioId: 's301', name: 'Layla Hussein', phone: '+20123456796', startDate: '2024-01-01', currentPrice: 170, status: 'active' },
  { id: 'sub9', studioId: 's302', name: 'Omar Farouk', phone: '+20123456797', startDate: '2024-03-15', currentPrice: 170, status: 'active' },
  { id: 'sub10', studioId: 's304', name: 'Mona Kamal', phone: '+20123456798', startDate: '2024-05-01', currentPrice: 170, status: 'active' },
  { id: 'sub11', studioId: 's401', name: 'Hassan Nabil', phone: '+20123456799', startDate: '2024-01-01', currentPrice: 180, status: 'active' },
  { id: 'sub12', studioId: 's402', name: 'Dina Rashid', phone: '+20123456800', startDate: '2024-02-01', currentPrice: 180, status: 'active' },
  { id: 'sub13', studioId: 's403', name: 'Tarek Sameh', phone: '+20123456801', startDate: '2024-04-01', currentPrice: 180, status: 'active' },
  { id: 'sub14', studioId: 's501', name: 'Heba Adel', phone: '+20123456802', startDate: '2024-01-15', currentPrice: 190, status: 'active' },
  { id: 'sub15', studioId: 's502', name: 'Amr Hosni', phone: '+20123456803', startDate: '2024-03-01', currentPrice: 190, status: 'active' },
  { id: 'sub16', studioId: 's503', name: 'Rana Fathy', phone: '+20123456804', startDate: '2024-01-01', currentPrice: 190, status: 'stopped' },
  { id: 'sub17', studioId: 's504', name: 'Mahmoud Essam', phone: '+20123456805', startDate: '2024-05-15', currentPrice: 190, status: 'active' },
  { id: 'sub18', studioId: 's601', name: 'Salma Waleed', phone: '+20123456806', startDate: '2024-01-01', currentPrice: 200, status: 'active' },
  { id: 'sub19', studioId: 's602', name: 'Karim Sherif', phone: '+20123456807', startDate: '2024-02-15', currentPrice: 200, status: 'active' },
  { id: 'sub20', studioId: 's603', name: 'Yasmin Tamer', phone: '+20123456808', startDate: '2024-04-01', currentPrice: 200, status: 'active' },
];

// Current month subscriptions
const currentMonth = '2024-12';
const previousMonth = '2024-11';

export const mockMonthlySubscriptions: MonthlySubscription[] = [
  // Current month - various statuses
  { id: 'ms1', studioId: 's101', month: currentMonth, amountDue: 150, amountPaid: 150, remaining: 0, status: 'paid' },
  { id: 'ms2', studioId: 's102', month: currentMonth, amountDue: 150, amountPaid: 100, remaining: 50, status: 'partial' },
  { id: 'ms3', studioId: 's104', month: currentMonth, amountDue: 150, amountPaid: 0, remaining: 150, status: 'unpaid' },
  { id: 'ms4', studioId: 's201', month: currentMonth, amountDue: 160, amountPaid: 160, remaining: 0, status: 'paid' },
  { id: 'ms5', studioId: 's203', month: currentMonth, amountDue: 160, amountPaid: 80, remaining: 80, status: 'partial' },
  { id: 'ms6', studioId: 's204', month: currentMonth, amountDue: 160, amountPaid: 160, remaining: 0, status: 'paid' },
  { id: 'ms7', studioId: 's301', month: currentMonth, amountDue: 170, amountPaid: 0, remaining: 170, status: 'unpaid' },
  { id: 'ms8', studioId: 's302', month: currentMonth, amountDue: 170, amountPaid: 170, remaining: 0, status: 'paid' },
  { id: 'ms9', studioId: 's304', month: currentMonth, amountDue: 170, amountPaid: 170, remaining: 0, status: 'paid' },
  { id: 'ms10', studioId: 's401', month: currentMonth, amountDue: 180, amountPaid: 180, remaining: 0, status: 'paid' },
  { id: 'ms11', studioId: 's402', month: currentMonth, amountDue: 180, amountPaid: 90, remaining: 90, status: 'partial' },
  { id: 'ms12', studioId: 's403', month: currentMonth, amountDue: 180, amountPaid: 0, remaining: 180, status: 'unpaid' },
  { id: 'ms13', studioId: 's501', month: currentMonth, amountDue: 190, amountPaid: 190, remaining: 0, status: 'paid' },
  { id: 'ms14', studioId: 's502', month: currentMonth, amountDue: 190, amountPaid: 190, remaining: 0, status: 'paid' },
  { id: 'ms15', studioId: 's504', month: currentMonth, amountDue: 190, amountPaid: 0, remaining: 190, status: 'unpaid' },
  { id: 'ms16', studioId: 's601', month: currentMonth, amountDue: 200, amountPaid: 200, remaining: 0, status: 'paid' },
  { id: 'ms17', studioId: 's602', month: currentMonth, amountDue: 200, amountPaid: 150, remaining: 50, status: 'partial' },
  { id: 'ms18', studioId: 's603', month: currentMonth, amountDue: 200, amountPaid: 200, remaining: 0, status: 'paid' },
  // Previous month - all paid
  { id: 'ms19', studioId: 's101', month: previousMonth, amountDue: 150, amountPaid: 150, remaining: 0, status: 'paid' },
  { id: 'ms20', studioId: 's102', month: previousMonth, amountDue: 150, amountPaid: 150, remaining: 0, status: 'paid' },
];

export const mockPaymentRecords: PaymentRecord[] = [
  {
    id: 'pay1',
    studioId: 's101',
    studioNumber: '101',
    amount: 150,
    dateTime: '2024-12-05T10:30:00',
    enteredBy: 'guard',
    enteredByRole: 'guard',
    allocations: [{ month: '2024-12', amount: 150 }],
  },
  {
    id: 'pay2',
    studioId: 's102',
    studioNumber: '102',
    amount: 100,
    dateTime: '2024-12-03T14:15:00',
    enteredBy: 'guard',
    enteredByRole: 'guard',
    allocations: [{ month: '2024-12', amount: 100 }],
  },
  {
    id: 'pay3',
    studioId: 's201',
    studioNumber: '201',
    amount: 160,
    dateTime: '2024-12-01T09:00:00',
    enteredBy: 'owner',
    enteredByRole: 'owner',
    allocations: [{ month: '2024-12', amount: 160 }],
  },
  {
    id: 'pay4',
    studioId: 's302',
    studioNumber: '302',
    amount: 170,
    dateTime: '2024-12-02T11:45:00',
    enteredBy: 'guard',
    enteredByRole: 'guard',
    allocations: [{ month: '2024-12', amount: 170 }],
  },
  {
    id: 'pay5',
    studioId: 's601',
    studioNumber: '601',
    amount: 200,
    dateTime: '2024-12-04T16:20:00',
    enteredBy: 'guard',
    enteredByRole: 'guard',
    allocations: [{ month: '2024-12', amount: 200 }],
  },
];

export const mockAuditLog: AuditLogEntry[] = [
  {
    id: 'audit1',
    userId: '1',
    username: 'owner',
    action: 'PAYMENT_REVERSAL',
    details: 'Reversed payment PAY-003 for studio 301',
    reason: 'Incorrect amount entered',
    timestamp: '2024-12-04T15:30:00',
  },
  {
    id: 'audit2',
    userId: '1',
    username: 'owner',
    action: 'STATUS_CHANGE',
    details: 'Changed studio 202 status from Active to Stopped',
    reason: 'Subscriber request',
    timestamp: '2024-12-03T10:00:00',
  },
];

export function getMonthlyOverview(month: string) {
  const subscriptions = mockMonthlySubscriptions.filter(s => s.month === month);
  
  return {
    month,
    totalExpected: subscriptions.reduce((sum, s) => sum + s.amountDue, 0),
    totalCollected: subscriptions.reduce((sum, s) => sum + s.amountPaid, 0),
    outstanding: subscriptions.reduce((sum, s) => sum + s.remaining, 0),
    paidCount: subscriptions.filter(s => s.status === 'paid').length,
    partialCount: subscriptions.filter(s => s.status === 'partial').length,
    unpaidCount: subscriptions.filter(s => s.status === 'unpaid').length,
  };
}
