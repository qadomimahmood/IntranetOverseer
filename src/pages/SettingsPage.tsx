import { Navigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Settings, Database, Download, Upload, Globe, Shield } from 'lucide-react';
import { toast } from 'sonner';

export function SettingsPage() {
  const { t, language } = useLanguage();
  const { isOwner } = useAuth();

  // Redirect guards away from settings
  if (!isOwner) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleExportBackup = () => {
    toast.success('Backup export started. Download will begin shortly.');
  };

  const handleImportBackup = () => {
    toast.info('Please select a backup file to restore.');
  };

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {t('nav.settings')}
          </h1>
          <p className="text-muted-foreground">
            System configuration and data management
          </p>
        </div>

        {/* Language Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Language
            </CardTitle>
            <CardDescription>
              Choose your preferred language. The interface supports both Arabic and English.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">
                  Current Language: {language === 'en' ? 'English' : 'العربية'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {language === 'en'
                    ? 'Interface displays in English (Left-to-Right)'
                    : 'الواجهة باللغة العربية (من اليمين إلى اليسار)'}
                </p>
              </div>
              <LanguageToggle />
            </div>
          </CardContent>
        </Card>

        {/* Data Backup */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              Data Management
            </CardTitle>
            <CardDescription>
              Export and restore your data. All historical records are preserved.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-lg border border-border p-4">
              <div>
                <p className="font-medium text-foreground">Export Backup</p>
                <p className="text-sm text-muted-foreground">
                  Download a complete backup of all data including payments and subscriptions.
                </p>
              </div>
              <Button onClick={handleExportBackup}>
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-lg border border-border p-4">
              <div>
                <p className="font-medium text-foreground">Restore from Backup</p>
                <p className="text-sm text-muted-foreground">
                  Import a previously exported backup file. This will merge with existing data.
                </p>
              </div>
              <Button variant="outline" onClick={handleImportBackup}>
                <Upload className="h-4 w-4" />
                Import
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Security
            </CardTitle>
            <CardDescription>
              System security information and policies.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-success" />
                <div>
                  <p className="font-medium text-foreground">Role-Based Access</p>
                  <p className="text-sm text-muted-foreground">
                    Guards can only record payments. Owners have full access.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-success" />
                <div>
                  <p className="font-medium text-foreground">Immutable Records</p>
                  <p className="text-sm text-muted-foreground">
                    Payment records cannot be deleted, only reversed by owner with reason.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-success" />
                <div>
                  <p className="font-medium text-foreground">FIFO Payment Allocation</p>
                  <p className="text-sm text-muted-foreground">
                    Payments are automatically applied to oldest unpaid months first.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-success" />
                <div>
                  <p className="font-medium text-foreground">Complete Audit Trail</p>
                  <p className="text-sm text-muted-foreground">
                    All critical actions are logged with user, timestamp, and reason.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
