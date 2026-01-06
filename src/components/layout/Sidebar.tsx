import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Building2,
  CreditCard,
  FileText,
  Settings,
  ClipboardList,
  LogOut,
  Wifi,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageToggle } from '@/components/LanguageToggle';

const navItems = [
  { key: 'dashboard', icon: LayoutDashboard, path: '/dashboard', roles: ['owner', 'guard'] },
  { key: 'studios', icon: Building2, path: '/studios', roles: ['owner', 'guard'] },
  { key: 'payments', icon: CreditCard, path: '/payments', roles: ['owner', 'guard'] },
  { key: 'reports', icon: FileText, path: '/reports', roles: ['owner'] },
  { key: 'auditLog', icon: ClipboardList, path: '/audit', roles: ['owner'] },
  { key: 'settings', icon: Settings, path: '/settings', roles: ['owner'] },
];

export function Sidebar() {
  const { t } = useLanguage();
  const { user, logout, isOwner } = useAuth();
  const location = useLocation();

  const visibleItems = navItems.filter(item =>
    item.roles.includes(user?.role || '')
  );

  return (
    <aside className="fixed inset-y-0 start-0 z-50 flex w-64 flex-col bg-sidebar">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-primary">
          <Wifi className="h-5 w-5 text-sidebar-primary-foreground" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-sidebar-foreground">ISMS</span>
          <span className="text-xs text-sidebar-foreground/60">{t('app.subtitle')}</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {visibleItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.key}
              to={item.path}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{t(`nav.${item.key}`)}</span>
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-sidebar-border p-4">
        <div className="mb-3 flex items-center gap-3 rounded-lg bg-sidebar-accent/50 p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-primary text-sm font-semibold text-sidebar-primary-foreground">
            {user?.username.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-sidebar-foreground">
              {user?.username}
            </span>
            <span className="text-xs text-sidebar-foreground/60">
              {isOwner ? t('role.owner') : t('role.guard')}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <LanguageToggle />
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </aside>
  );
}
