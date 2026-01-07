import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

type PaymentStatus = 'paid' | 'partial' | 'unpaid';
type StudioStatus = 'vacant' | 'active' | 'stopped';
type ExpenseStatus = 'paid' | 'pending';

interface StatusBadgeProps {
  status: PaymentStatus | StudioStatus | ExpenseStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const { t } = useLanguage();

  const getStatusConfig = () => {
    switch (status) {
      case 'paid':
        return {
          label: t('subscription.paid'),
          className: 'status-paid',
        };
      case 'partial':
        return {
          label: t('subscription.partial'),
          className: 'status-partial',
        };
      case 'unpaid':
        return {
          label: t('subscription.unpaid'),
          className: 'status-unpaid',
        };
      case 'active':
        return {
          label: t('studios.active'),
          className: 'status-active',
        };
      case 'stopped':
        return {
          label: t('studios.stopped'),
          className: 'status-stopped',
        };
      case 'vacant':
        return {
          label: t('studios.vacant'),
          className: 'status-vacant',
        };
      case 'pending':
        return {
          label: 'Pending',
          className: 'status-partial', // Re-using partial style for pending
        };
      default:
        return {
          label: status,
          className: 'status-vacant',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <span className={cn('status-badge', config.className, className)}>
      {config.label}
    </span>
  );
}
