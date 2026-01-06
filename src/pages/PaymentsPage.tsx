import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { MainLayout } from '@/components/layout/MainLayout';
import { StatusBadge } from '@/components/StatusBadge';
import { mockStudios, mockPaymentRecords, mockMonthlySubscriptions } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CreditCard, Plus, Search, DollarSign, Calendar, User, AlertCircle, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

export function PaymentsPage() {
  const { t } = useLanguage();
  const { user, isOwner } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedStudio, setSelectedStudio] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');

  // Filter active studios that have outstanding balances
  const studiosWithBalance = mockStudios.filter((studio) => {
    if (studio.status === 'vacant') return false;
    const subscriptions = mockMonthlySubscriptions.filter(
      (s) => s.studioId === studio.id && s.remaining > 0
    );
    return subscriptions.length > 0;
  });

  const getStudioOutstanding = (studioId: string) => {
    return mockMonthlySubscriptions
      .filter((s) => s.studioId === studioId && s.remaining > 0)
      .reduce((sum, s) => sum + s.remaining, 0);
  };

  const getOldestUnpaidMonth = (studioId: string) => {
    const unpaid = mockMonthlySubscriptions
      .filter((s) => s.studioId === studioId && s.remaining > 0)
      .sort((a, b) => a.month.localeCompare(b.month));
    return unpaid[0]?.month;
  };

  const handleRecordPayment = () => {
    if (!selectedStudio || !paymentAmount) {
      toast.error('Please fill in all fields');
      return;
    }

    const amount = parseFloat(paymentAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    // Simulate FIFO allocation
    const studio = mockStudios.find((s) => s.id === selectedStudio);
    const oldestMonth = getOldestUnpaidMonth(selectedStudio);

    toast.success(
      <div className="flex flex-col gap-1">
        <span className="font-medium">{t('msg.paymentSuccess')}</span>
        <span className="text-sm text-muted-foreground">
          ${amount} allocated to {oldestMonth} for Studio {studio?.studioNumber}
        </span>
      </div>
    );

    setIsDialogOpen(false);
    setSelectedStudio('');
    setPaymentAmount('');
  };

  const filteredPayments = mockPaymentRecords.filter((payment) =>
    payment.studioNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {t('payments.title')}
            </h1>
            <p className="text-muted-foreground">
              Record and track all payment transactions
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4" />
                {t('payments.recordPayment')}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  {t('payments.recordPayment')}
                </DialogTitle>
                <DialogDescription>
                  Payments are automatically allocated to the oldest unpaid month (FIFO).
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="studio">{t('payments.selectStudio')}</Label>
                  <Select value={selectedStudio} onValueChange={setSelectedStudio}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a studio" />
                    </SelectTrigger>
                    <SelectContent>
                      {studiosWithBalance.map((studio) => (
                        <SelectItem key={studio.id} value={studio.id}>
                          <div className="flex items-center justify-between gap-4">
                            <span>Studio {studio.studioNumber}</span>
                            <span className="text-muted-foreground">
                              (${getStudioOutstanding(studio.id)} due)
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedStudio && (
                  <div className="rounded-lg border border-border bg-muted/50 p-4">
                    <div className="flex items-center gap-2 text-sm">
                      <AlertCircle className="h-4 w-4 text-primary" />
                      <span>
                        Will be allocated to:{' '}
                        <span className="font-medium">
                          {format(
                            new Date(getOldestUnpaidMonth(selectedStudio) + '-01'),
                            'MMMM yyyy'
                          )}
                        </span>
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Total outstanding: ${getStudioOutstanding(selectedStudio)}
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="amount">{t('payments.enterAmount')}</Label>
                  <div className="relative">
                    <DollarSign className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="amount"
                      type="number"
                      min="0"
                      step="0.01"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      placeholder="0.00"
                      className="ps-10"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  {t('common.cancel')}
                </Button>
                <Button onClick={handleRecordPayment}>
                  <CheckCircle className="h-4 w-4" />
                  Record Payment
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="relative max-w-md">
              <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by studio number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ps-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Payments Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Payment History
            </CardTitle>
            <CardDescription>
              All payment records are permanent and cannot be deleted.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('payments.paymentId')}</TableHead>
                    <TableHead>{t('common.studio')}</TableHead>
                    <TableHead>{t('common.amount')}</TableHead>
                    <TableHead>{t('common.date')}</TableHead>
                    <TableHead>{t('payments.enteredBy')}</TableHead>
                    <TableHead>{t('payments.allocatedTo')}</TableHead>
                    <TableHead>{t('common.status')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment) => (
                    <TableRow key={payment.id} className="hover:bg-accent/30">
                      <TableCell>
                        <span className="font-mono text-sm text-muted-foreground">
                          {payment.id.toUpperCase()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
                            {payment.studioNumber}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-success">
                          ${payment.amount}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{format(new Date(payment.dateTime), 'MMM d, yyyy')}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(payment.dateTime), 'h:mm a')}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="capitalize">{payment.enteredBy}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          {payment.allocations.map((alloc, idx) => (
                            <span key={idx} className="text-sm">
                              {format(new Date(alloc.month + '-01'), 'MMM yyyy')}: ${alloc.amount}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        {payment.isReversed ? (
                          <StatusBadge status="stopped" />
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">
                            <CheckCircle className="h-3 w-3" />
                            Active
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
