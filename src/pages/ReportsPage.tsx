import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { MainLayout } from '@/components/layout/MainLayout';
import { StatCard } from '@/components/StatCard';
import { StatusBadge } from '@/components/StatusBadge';
import { mockStudios, mockMonthlySubscriptions, getMonthlyOverview } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FileText, Download, DollarSign, TrendingUp, AlertCircle, Building2 } from 'lucide-react';
import { format } from 'date-fns';

export function ReportsPage() {
  const { t } = useLanguage();
  const { isOwner } = useAuth();
  const [selectedMonth, setSelectedMonth] = useState('2024-12');
  const [selectedStudio, setSelectedStudio] = useState('all');

  // Redirect guards away from reports
  if (!isOwner) {
    return <Navigate to="/dashboard" replace />;
  }

  const overview = getMonthlyOverview(selectedMonth);
  const activeStudios = mockStudios.filter((s) => s.status !== 'vacant');

  const getStudioSubscriptions = (studioId: string) => {
    return mockMonthlySubscriptions
      .filter((s) => s.studioId === studioId)
      .sort((a, b) => b.month.localeCompare(a.month));
  };

  const filteredSubscriptions =
    selectedStudio === 'all'
      ? mockMonthlySubscriptions.filter((s) => s.month === selectedMonth)
      : getStudioSubscriptions(selectedStudio);

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {t('reports.title')}
            </h1>
            <p className="text-muted-foreground">
              Financial reports and studio ledgers
            </p>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4" />
            {t('reports.export')}
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4">
              <div className="w-[200px]">
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('reports.selectMonth')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024-12">December 2024</SelectItem>
                    <SelectItem value="2024-11">November 2024</SelectItem>
                    <SelectItem value="2024-10">October 2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[200px]">
                <Select value={selectedStudio} onValueChange={setSelectedStudio}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('reports.selectStudio')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Studios</SelectItem>
                    {activeStudios.map((studio) => (
                      <SelectItem key={studio.id} value={studio.id}>
                        Studio {studio.studioNumber}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Overview Stats */}
        {selectedStudio === 'all' && (
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard
              title={t('dashboard.totalExpected')}
              value={`$${overview.totalExpected.toLocaleString()}`}
              icon={DollarSign}
            />
            <StatCard
              title={t('dashboard.totalCollected')}
              value={`$${overview.totalCollected.toLocaleString()}`}
              subtitle={`${Math.round((overview.totalCollected / overview.totalExpected) * 100)}% of target`}
              icon={TrendingUp}
              variant="success"
            />
            <StatCard
              title={t('dashboard.outstanding')}
              value={`$${overview.outstanding.toLocaleString()}`}
              icon={AlertCircle}
              variant="warning"
            />
          </div>
        )}

        {/* Studio Ledger */}
        {selectedStudio !== 'all' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                {t('reports.studioLedger')} - Studio{' '}
                {mockStudios.find((s) => s.id === selectedStudio)?.studioNumber}
              </CardTitle>
              <CardDescription>
                Month-by-month payment history
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('common.month')}</TableHead>
                      <TableHead>{t('subscription.due')}</TableHead>
                      <TableHead>Paid</TableHead>
                      <TableHead>{t('subscription.remaining')}</TableHead>
                      <TableHead>{t('common.status')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubscriptions.map((sub) => (
                      <TableRow key={sub.id}>
                        <TableCell className="font-medium">
                          {format(new Date(sub.month + '-01'), 'MMMM yyyy')}
                        </TableCell>
                        <TableCell>${sub.amountDue}</TableCell>
                        <TableCell className="text-success font-medium">
                          ${sub.amountPaid}
                        </TableCell>
                        <TableCell
                          className={sub.remaining > 0 ? 'text-warning font-medium' : ''}
                        >
                          ${sub.remaining}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={sub.status} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Monthly Overview Table */}
        {selectedStudio === 'all' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                {t('reports.monthlyOverview')} -{' '}
                {format(new Date(selectedMonth + '-01'), 'MMMM yyyy')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('common.studio')}</TableHead>
                      <TableHead>{t('common.floor')}</TableHead>
                      <TableHead>{t('subscription.due')}</TableHead>
                      <TableHead>Paid</TableHead>
                      <TableHead>{t('subscription.remaining')}</TableHead>
                      <TableHead>{t('common.status')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubscriptions.map((sub) => {
                      const studio = mockStudios.find((s) => s.id === sub.studioId);
                      if (!studio) return null;

                      return (
                        <TableRow key={sub.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
                                {studio.studioNumber}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{studio.floor}</TableCell>
                          <TableCell>${sub.amountDue}</TableCell>
                          <TableCell className="text-success font-medium">
                            ${sub.amountPaid}
                          </TableCell>
                          <TableCell
                            className={sub.remaining > 0 ? 'text-warning font-medium' : ''}
                          >
                            ${sub.remaining}
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={sub.status} />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
