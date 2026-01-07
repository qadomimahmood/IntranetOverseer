import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // General
    'app.title': 'Internet Subscription Management',
    'app.subtitle': 'Building Management System',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.add': 'Add',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.actions': 'Actions',
    'common.status': 'Status',
    'common.amount': 'Amount',
    'common.date': 'Date',
    'common.floor': 'Floor',
    'common.studio': 'Studio',
    'common.month': 'Month',
    'common.total': 'Total',
    'common.loading': 'Loading...',
    'common.noData': 'No data available',

    // Auth
    'auth.login': 'Login',
    'auth.logout': 'Logout',
    'auth.password': 'Password',
    'auth.username': 'Username',
    'auth.loginTitle': 'Sign In',
    'auth.loginSubtitle': 'Access your management dashboard',
    'auth.invalidCredentials': 'Invalid credentials',
    'auth.enterCredentials': 'Enter your credentials to continue',

    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.studios': 'Studios',
    'nav.payments': 'Payments',
    'nav.reports': 'Reports',
    'nav.settings': 'Settings',
    'nav.auditLog': 'Audit Log',
    'nav.expenses': 'Expenses',

    // Expenses
    'expenses.title': 'Expenses Management',
    'expenses.add': 'Add Expense',
    'expenses.category': 'Category',
    'expenses.description': 'Description',
    'expenses.cat.maintenance': 'Maintenance',
    'expenses.cat.utilities': 'Utilities',
    'expenses.cat.cleaning': 'Cleaning',
    'expenses.cat.supplies': 'Supplies',
    'expenses.cat.other': 'Other',

    // Roles
    'role.owner': 'Owner',
    'role.guard': 'Guard',

    // Dashboard
    'dashboard.welcome': 'Welcome',
    'dashboard.overview': 'Monthly Overview',
    'dashboard.totalExpected': 'Expected Revenue',
    'dashboard.totalCollected': 'Collected',
    'dashboard.outstanding': 'Outstanding',
    'dashboard.paidStudios': 'Paid Studios',
    'dashboard.partialStudios': 'Partial Payment',
    'dashboard.unpaidStudios': 'Unpaid Studios',
    'dashboard.recentPayments': 'Recent Payments',
    'dashboard.studioStatus': 'Studio Status',

    // Studios
    'studios.title': 'Studios Management',
    'studios.addNew': 'Add Studio',
    'studios.studioNumber': 'Studio Number',
    'studios.monthlyPrice': 'Monthly Price',
    'studios.subscriber': 'Subscriber',
    'studios.startDate': 'Start Date',
    'studios.vacant': 'Vacant',
    'studios.active': 'Active',
    'studios.stopped': 'Stopped',

    // Payments
    'payments.title': 'Payment Records',
    'payments.recordPayment': 'Record Payment',
    'payments.selectStudio': 'Select Studio',
    'payments.enterAmount': 'Enter Amount',
    'payments.paymentRecorded': 'Payment Recorded',
    'payments.paymentId': 'Payment ID',
    'payments.enteredBy': 'Entered By',
    'payments.allocatedTo': 'Allocated To',
    'payments.reversePayment': 'Reverse Payment',
    'payments.reversalReason': 'Reason for Reversal',

    // Subscription Status
    'subscription.paid': 'Paid',
    'subscription.partial': 'Partial',
    'subscription.unpaid': 'Unpaid',
    'subscription.due': 'Amount Due',
    'subscription.remaining': 'Remaining',

    // Reports
    'reports.title': 'Reports',
    'reports.monthlyOverview': 'Monthly Overview',
    'reports.studioLedger': 'Studio Ledger',
    'reports.selectMonth': 'Select Month',
    'reports.selectStudio': 'Select Studio',
    'reports.generate': 'Generate Report',
    'reports.export': 'Export',

    // Audit
    'audit.title': 'Audit Log',
    'audit.action': 'Action',
    'audit.user': 'User',
    'audit.reason': 'Reason',
    'audit.timestamp': 'Timestamp',

    // Messages
    'msg.confirmDelete': 'Are you sure you want to delete this?',
    'msg.saved': 'Saved successfully',
    'msg.error': 'An error occurred',
    'msg.paymentSuccess': 'Payment recorded successfully',
    'msg.cannotStop': 'Cannot stop subscription with unpaid months',
  },
  ar: {
    // General
    'app.title': 'نظام إدارة اشتراكات الإنترنت',
    'app.subtitle': 'نظام إدارة المبنى',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.delete': 'حذف',
    'common.edit': 'تعديل',
    'common.add': 'إضافة',
    'common.search': 'بحث',
    'common.filter': 'تصفية',
    'common.actions': 'إجراءات',
    'common.status': 'الحالة',
    'common.amount': 'المبلغ',
    'common.date': 'التاريخ',
    'common.floor': 'الطابق',
    'common.studio': 'الاستوديو',
    'common.month': 'الشهر',
    'common.total': 'الإجمالي',
    'common.loading': 'جاري التحميل...',
    'common.noData': 'لا توجد بيانات',

    // Auth
    'auth.login': 'تسجيل الدخول',
    'auth.logout': 'تسجيل الخروج',
    'auth.password': 'كلمة المرور',
    'auth.username': 'اسم المستخدم',
    'auth.loginTitle': 'تسجيل الدخول',
    'auth.loginSubtitle': 'الوصول إلى لوحة التحكم',
    'auth.invalidCredentials': 'بيانات الدخول غير صحيحة',
    'auth.enterCredentials': 'أدخل بيانات الاعتماد للمتابعة',

    // Navigation
    'nav.dashboard': 'لوحة التحكم',
    'nav.studios': 'الاستوديوهات',
    'nav.payments': 'المدفوعات',
    'nav.reports': 'التقارير',
    'nav.settings': 'الإعدادات',
    'nav.auditLog': 'سجل التدقيق',
    'nav.expenses': 'المصروفات',

    // Expenses
    'expenses.title': 'إدارة المصروفات',
    'expenses.add': 'إضافة مصروف',
    'expenses.category': 'الفئة',
    'expenses.description': 'الوصف',
    'expenses.cat.maintenance': 'صيانة',
    'expenses.cat.utilities': 'فواتير ومرافق',
    'expenses.cat.cleaning': 'نظافة',
    'expenses.cat.supplies': 'مستلزمات',
    'expenses.cat.other': 'أخرى',

    // Roles
    'role.owner': 'المالك',
    'role.guard': 'الحارس',

    // Dashboard
    'dashboard.welcome': 'مرحباً',
    'dashboard.overview': 'نظرة عامة شهرية',
    'dashboard.totalExpected': 'الإيرادات المتوقعة',
    'dashboard.totalCollected': 'المحصّل',
    'dashboard.outstanding': 'المتبقي',
    'dashboard.paidStudios': 'استوديوهات مدفوعة',
    'dashboard.partialStudios': 'دفع جزئي',
    'dashboard.unpaidStudios': 'غير مدفوعة',
    'dashboard.recentPayments': 'المدفوعات الأخيرة',
    'dashboard.studioStatus': 'حالة الاستوديوهات',

    // Studios
    'studios.title': 'إدارة الاستوديوهات',
    'studios.addNew': 'إضافة استوديو',
    'studios.studioNumber': 'رقم الاستوديو',
    'studios.monthlyPrice': 'السعر الشهري',
    'studios.subscriber': 'المشترك',
    'studios.startDate': 'تاريخ البدء',
    'studios.vacant': 'شاغر',
    'studios.active': 'نشط',
    'studios.stopped': 'متوقف',

    // Payments
    'payments.title': 'سجلات المدفوعات',
    'payments.recordPayment': 'تسجيل دفعة',
    'payments.selectStudio': 'اختر الاستوديو',
    'payments.enterAmount': 'أدخل المبلغ',
    'payments.paymentRecorded': 'تم تسجيل الدفعة',
    'payments.paymentId': 'رقم الدفعة',
    'payments.enteredBy': 'بواسطة',
    'payments.allocatedTo': 'مخصصة لـ',
    'payments.reversePayment': 'عكس الدفعة',
    'payments.reversalReason': 'سبب العكس',

    // Subscription Status
    'subscription.paid': 'مدفوع',
    'subscription.partial': 'جزئي',
    'subscription.unpaid': 'غير مدفوع',
    'subscription.due': 'المبلغ المستحق',
    'subscription.remaining': 'المتبقي',

    // Reports
    'reports.title': 'التقارير',
    'reports.monthlyOverview': 'نظرة عامة شهرية',
    'reports.studioLedger': 'دفتر الاستوديو',
    'reports.selectMonth': 'اختر الشهر',
    'reports.selectStudio': 'اختر الاستوديو',
    'reports.generate': 'إنشاء التقرير',
    'reports.export': 'تصدير',

    // Audit
    'audit.title': 'سجل التدقيق',
    'audit.action': 'الإجراء',
    'audit.user': 'المستخدم',
    'audit.reason': 'السبب',
    'audit.timestamp': 'الوقت',

    // Messages
    'msg.confirmDelete': 'هل أنت متأكد من الحذف؟',
    'msg.saved': 'تم الحفظ بنجاح',
    'msg.error': 'حدث خطأ',
    'msg.paymentSuccess': 'تم تسجيل الدفعة بنجاح',
    'msg.cannotStop': 'لا يمكن إيقاف الاشتراك مع وجود أشهر غير مدفوعة',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('isms-language');
    return (saved as Language) || 'en';
  });

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    localStorage.setItem('isms-language', language);
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [language, dir]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
