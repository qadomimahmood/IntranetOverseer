import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { mockExpenses } from '@/data/mockData';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Plus, Wallet, FileText, Calendar, Tag } from 'lucide-react';
import { StatCard } from '@/components/StatCard';
import { MainLayout } from '@/components/layout/MainLayout';

export const ExpensesPage = () => {
    const { t } = useLanguage();

    const totalExpenses = mockExpenses.reduce((sum, e) => sum + e.amount, 0);
    const paidExpenses = mockExpenses.filter(e => e.status === 'paid').length;
    const pendingExpenses = mockExpenses.filter(e => e.status === 'pending').length;

    return (
        <MainLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        {t('expenses.title')}
                    </h1>
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        {t('expenses.add')}
                    </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <StatCard
                        title={t('common.total')}
                        value={totalExpenses}
                        icon={Wallet}
                        trend={{ value: 12, positive: true }}
                        subtitle="vs last month"
                    // prefix="$" // StatCard might not support prefix prop based on previous read, let's omit it or check types. 
                    // Looking at StatCard.tsx: value: string | number. So we can just format the value string.
                    />
                    <StatCard
                        title="Paid Records"
                        value={paidExpenses}
                        icon={FileText}
                        subtitle="Fully settled expenses"
                    />
                    <StatCard
                        title="Pending"
                        value={pendingExpenses}
                        icon={Calendar}
                        subtitle="To be paid"
                    />
                </div>

                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold mb-4">{t('nav.expenses')}</h2>
                        <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm">
                                <thead className="[&_tr]:border-b">
                                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                            {t('expenses.description')}
                                        </th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                            {t('expenses.category')}
                                        </th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                            {t('common.date')}
                                        </th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                            {t('common.amount')}
                                        </th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                            {t('common.status')}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    {mockExpenses.map((expense) => (
                                        <tr
                                            key={expense.id}
                                            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                                        >
                                            <td className="p-4 align-middle">
                                                <div className="flex flex-col">
                                                    <span className="font-medium">{expense.title}</span>
                                                    <span className="text-xs text-muted-foreground">{expense.description}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 align-middle">
                                                <div className="flex items-center gap-2">
                                                    <Tag className="h-3 w-3 text-muted-foreground" />
                                                    <span>{t(`expenses.cat.${expense.category}`)}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 align-middle">{expense.date}</td>
                                            <td className="p-4 align-middle font-medium">${expense.amount}</td>
                                            <td className="p-4 align-middle">
                                                <StatusBadge status={expense.status} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};
