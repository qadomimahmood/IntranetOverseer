import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Wifi, Eye, EyeOff, AlertCircle } from 'lucide-react';

export function LoginPage() {
  const { t } = useLanguage();
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const success = await login(username, password);

    if (success) {
      navigate('/dashboard');
    } else {
      setError(t('auth.invalidCredentials'));
    }

    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left panel - branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-sidebar p-12">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sidebar-primary">
            <Wifi className="h-6 w-6 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-sidebar-foreground">ISMS</h1>
            <p className="text-sm text-sidebar-foreground/60">{t('app.subtitle')}</p>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-4xl font-bold leading-tight text-sidebar-foreground">
            {t('app.title')}
          </h2>
          <p className="text-lg text-sidebar-foreground/70 max-w-md">
            Manage monthly subscriptions, track payments, and maintain accurate financial records for your building.
          </p>
        </div>

        <div className="text-sm text-sidebar-foreground/50">
          © 2024 ISMS. All rights reserved.
        </div>
      </div>

      {/* Right panel - login form */}
      <div className="flex w-full lg:w-1/2 flex-col items-center justify-center p-8">
        <div className="absolute end-4 top-4">
          <LanguageToggle />
        </div>

        <div className="w-full max-w-md space-y-8 animate-fade-in">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center justify-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <Wifi className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">{t('auth.loginTitle')}</h1>
            <p className="mt-2 text-muted-foreground">{t('auth.enterCredentials')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-4 text-sm text-destructive animate-slide-up">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="username">{t('auth.username')}</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t('auth.password')}</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  className="h-11 pe-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? t('common.loading') : t('auth.login')}
            </Button>
          </form>

          <div className="rounded-lg border border-border bg-muted/50 p-4 text-sm">
            <p className="font-medium text-foreground mb-2">Demo Credentials:</p>
            <div className="space-y-1 text-muted-foreground">
              <p><span className="font-medium">Owner:</span> owner / owner123</p>
              <p><span className="font-medium">Guard:</span> guard / guard123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
