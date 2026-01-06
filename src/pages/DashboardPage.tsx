import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { StatCard } from '@/components/StatCard';
import { StatusBadge } from '@/components/StatusBadge';
import { MainLayout } from '@/components/layout/MainLayout';
import { mockStudios, mockPaymentRecords, getMonthlyOverview, mockMonthlySubscriptions } from '@/data/mockData';
import {
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  Building2,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';

export function DashboardPage() {
  const { t } = useLanguage();
  const { user, isOwner } = useAuth();
  
  const currentMonth = '2024-12';
  const overview = getMonthlyOverview(currentMonth);

  // Get recent payments (last 5)
  const recentPayments = [...mockPaymentRecords]
    .sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime())
    .slice(0, 5);

  // Studios by floor with status
  const studiosByFloor = mockStudios.reduce((acc, studio) => {
    if (!acc[studio.floor]) acc[studio.floor] = [];
    acc[studio.floor].push(studio);
    return acc;
  }, {} as Record<number, typeof mockStudios>);

  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {t('dashboard.welcome')}, {user?.username}!
          </h1>
          <p className="text-muted-foreground">
            {t('dashboard.overview')} - {format(new Date(currentMonth + '-01'), 'MMMM yyyy')}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title={t('dashboard.totalExpected')}
            value={`$${overview.totalExpected.toLocaleString()}`}
            icon={DollarSign}
            variant="default"
          />
          <StatCard
            title={t('dashboard.totalCollected')}
            value={`$${overview.totalCollected.toLocaleString()}`}
            subtitle={`${Math.round((overview.totalCollected / overview.totalExpected) * 100)}% collected`}
            icon={TrendingUp}
            variant="success"
          />
          <StatCard
            title={t('dashboard.outstanding')}
            value={`$${overview.outstanding.toLocaleString()}`}
            icon={AlertCircle}
            variant="warning"
          />
          <StatCard
            title={t('dashboard.paidStudios')}
            value={overview.paidCount}
            subtitle={`of ${overview.paidCount + overview.partialCount + overview.unpaidCount} active`}
            icon={CheckCircle}
            variant="success"
          />
        </div>

        {/* Status Summary */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="card-hover">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{overview.paidCount}</p>
                <p className="text-sm text-muted-foreground">{t('dashboard.paidStudios')}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning/10">
                <Clock className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{overview.partialCount}</p>
                <p className="text-sm text-muted-foreground">{t('dashboard.partialStudios')}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                <XCircle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{overview.unpaidCount}</p>
                <p className="text-sm text-muted-foreground">{t('dashboard.unpaidStudios')}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Payments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                {t('dashboard.recentPayments')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPayments.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-accent/30"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
                        {payment.studioNumber}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          Studio {payment.studioNumber}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(payment.dateTime), 'MMM d, h:mm a')}
                        </p>
                      </div>
                    </div>
                    <div className="text-end">
                      <p className="font-semibold text-success">${payment.amount}</p>
                      <p className="text-xs text-muted-foreground">
                        by {payment.enteredBy}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Studio Status by Floor */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                {t('dashboard.studioStatus')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(studiosByFloor).map(([floor, studios]) => (
                  <div key={floor} className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      {t('common.floor')} {floor}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {studios.map((studio) => {
                        const subscription = mockMonthlySubscriptions.find(
                          s => s.studioId === studio.id && s.month === currentMonth
                        );
                        const paymentStatus = subscription?.status || 
                          (studio.status === 'vacant' ? 'vacant' : 'unpaid');
                        
                        return (
                          <div
                            key={studio.id}
                            className="flex items-center gap-2 rounded-lg border border-border px-3 py-2"
                          >
                            <span className="font-medium text-foreground">
                              {studio.studioNumber}
                            </span>
                            <StatusBadge
                              status={studio.status === 'vacant' ? 'vacant' : paymentStatus as any}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
