import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { MainLayout } from '@/components/layout/MainLayout';
import { StatusBadge } from '@/components/StatusBadge';
import { mockStudios, mockSubscribers, mockMonthlySubscriptions } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Building2, Search, Filter, Plus, User, DollarSign } from 'lucide-react';
import { format } from 'date-fns';

export function StudiosPage() {
  const { t } = useLanguage();
  const { isOwner } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [floorFilter, setFloorFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const currentMonth = '2024-12';

  const filteredStudios = mockStudios.filter((studio) => {
    const matchesSearch =
      studio.studioNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mockSubscribers
        .find((s) => s.studioId === studio.id)
        ?.name.toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesFloor =
      floorFilter === 'all' || studio.floor.toString() === floorFilter;
    const matchesStatus =
      statusFilter === 'all' || studio.status === statusFilter;
    return matchesSearch && matchesFloor && matchesStatus;
  });

  const getSubscriberName = (studioId: string) => {
    const subscriber = mockSubscribers.find((s) => s.studioId === studioId);
    return subscriber?.name || '-';
  };

  const getPaymentStatus = (studioId: string) => {
    const subscription = mockMonthlySubscriptions.find(
      (s) => s.studioId === studioId && s.month === currentMonth
    );
    return subscription?.status;
  };

  const getPaymentInfo = (studioId: string) => {
    const subscription = mockMonthlySubscriptions.find(
      (s) => s.studioId === studioId && s.month === currentMonth
    );
    if (!subscription) return null;
    return {
      paid: subscription.amountPaid,
      remaining: subscription.remaining,
    };
  };

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {t('studios.title')}
            </h1>
            <p className="text-muted-foreground">
              Manage all studios across 6 floors
            </p>
          </div>
          {isOwner && (
            <Button>
              <Plus className="h-4 w-4" />
              {t('studios.addNew')}
            </Button>
          )}
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder={`${t('common.search')} studios or subscribers...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="ps-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={floorFilter} onValueChange={setFloorFilter}>
                  <SelectTrigger className="w-[140px]">
                    <Filter className="me-2 h-4 w-4" />
                    <SelectValue placeholder={t('common.floor')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Floors</SelectItem>
                    {[1, 2, 3, 4, 5, 6].map((floor) => (
                      <SelectItem key={floor} value={floor.toString()}>
                        Floor {floor}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder={t('common.status')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">{t('studios.active')}</SelectItem>
                    <SelectItem value="vacant">{t('studios.vacant')}</SelectItem>
                    <SelectItem value="stopped">{t('studios.stopped')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Studios Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Studios ({filteredStudios.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('studios.studioNumber')}</TableHead>
                    <TableHead>{t('common.floor')}</TableHead>
                    <TableHead>{t('studios.subscriber')}</TableHead>
                    <TableHead>{t('studios.monthlyPrice')}</TableHead>
                    <TableHead>{t('common.status')}</TableHead>
                    <TableHead>Payment Status</TableHead>
                    <TableHead className="text-end">{t('common.actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudios.map((studio) => {
                    const paymentStatus = getPaymentStatus(studio.id);
                    const paymentInfo = getPaymentInfo(studio.id);
                    
                    return (
                      <TableRow key={studio.id} className="hover:bg-accent/30">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 font-semibold text-primary">
                              {studio.studioNumber}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center gap-1">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            {studio.floor}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {studio.status !== 'vacant' && (
                              <>
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span>{getSubscriberName(studio.id)}</span>
                              </>
                            )}
                            {studio.status === 'vacant' && (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center gap-1 font-medium">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            {studio.monthlyPrice}
                          </span>
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={studio.status} />
                        </TableCell>
                        <TableCell>
                          {paymentStatus && (
                            <div className="flex flex-col gap-1">
                              <StatusBadge status={paymentStatus} />
                              {paymentInfo && paymentStatus !== 'paid' && (
                                <span className="text-xs text-muted-foreground">
                                  ${paymentInfo.remaining} remaining
                                </span>
                              )}
                            </div>
                          )}
                          {!paymentStatus && studio.status !== 'vacant' && (
                            <StatusBadge status="unpaid" />
                          )}
                          {studio.status === 'vacant' && (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-end">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                          {isOwner && (
                            <Button variant="ghost" size="sm">
                              {t('common.edit')}
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
