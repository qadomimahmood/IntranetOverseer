import { Navigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { MainLayout } from '@/components/layout/MainLayout';
import { mockAuditLog } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ClipboardList, User, Calendar, AlertTriangle, RotateCcw, Settings } from 'lucide-react';
import { format } from 'date-fns';

const actionIcons: Record<string, typeof AlertTriangle> = {
  PAYMENT_REVERSAL: RotateCcw,
  STATUS_CHANGE: Settings,
};

const actionColors: Record<string, string> = {
  PAYMENT_REVERSAL: 'text-destructive bg-destructive/10',
  STATUS_CHANGE: 'text-warning bg-warning/10',
};

export function AuditLogPage() {
  const { t } = useLanguage();
  const { isOwner } = useAuth();

  // Redirect guards away from audit log
  if (!isOwner) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {t('audit.title')}
          </h1>
          <p className="text-muted-foreground">
            Track critical system actions and changes
          </p>
        </div>

        {/* Info Card */}
        <Card className="border-warning/30 bg-warning/5">
          <CardContent className="flex items-start gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
              <AlertTriangle className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="font-medium text-foreground">Critical Actions Only</p>
              <p className="text-sm text-muted-foreground">
                This log records payment reversals, manual status changes, and other critical
                modifications. All entries are permanent and cannot be deleted.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Audit Log Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-primary" />
              Audit Trail
            </CardTitle>
            <CardDescription>
              {mockAuditLog.length} recorded actions
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('audit.timestamp')}</TableHead>
                    <TableHead>{t('audit.user')}</TableHead>
                    <TableHead>{t('audit.action')}</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>{t('audit.reason')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAuditLog.map((entry) => {
                    const Icon = actionIcons[entry.action] || AlertTriangle;
                    const colorClass = actionColors[entry.action] || 'text-muted-foreground bg-muted';

                    return (
                      <TableRow key={entry.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium">
                                {format(new Date(entry.timestamp), 'MMM d, yyyy')}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {format(new Date(entry.timestamp), 'h:mm a')}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                              <User className="h-4 w-4 text-primary" />
                            </div>
                            <span className="font-medium capitalize">{entry.username}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div
                            className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 ${colorClass}`}
                          >
                            <Icon className="h-4 w-4" />
                            <span className="text-sm font-medium">
                              {entry.action.replace('_', ' ')}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="max-w-xs text-sm">{entry.details}</p>
                        </TableCell>
                        <TableCell>
                          {entry.reason && (
                            <p className="max-w-xs text-sm text-muted-foreground italic">
                              "{entry.reason}"
                            </p>
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
