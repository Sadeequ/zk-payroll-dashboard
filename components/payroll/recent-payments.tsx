'use client';

import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Payment {
  id: string;
  period: string;
  status: 'completed' | 'pending' | 'failed';
  employeeCount: number;
  totalAmount: number;
  date: string;
}

const mockPayments: Payment[] = [
  {
    id: '1',
    period: 'January 2026',
    status: 'completed',
    employeeCount: 24,
    totalAmount: 156000,
    date: '2026-01-31',
  },
  {
    id: '2',
    period: 'December 2025',
    status: 'completed',
    employeeCount: 23,
    totalAmount: 148500,
    date: '2025-12-31',
  },
  {
    id: '3',
    period: 'November 2025',
    status: 'completed',
    employeeCount: 23,
    totalAmount: 148500,
    date: '2025-11-30',
  },
];

const statusConfig = {
  completed: {
    icon: CheckCircle,
    color: 'text-green-500',
    bg: 'bg-green-50',
    label: 'Completed',
  },
  pending: {
    icon: Clock,
    color: 'text-yellow-500',
    bg: 'bg-yellow-50',
    label: 'Pending',
  },
  failed: {
    icon: AlertCircle,
    color: 'text-red-500',
    bg: 'bg-red-50',
    label: 'Failed',
  },
};

export function RecentPayments() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Payments</h3>
        <a
          href="/payroll/history"
          className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
        >
          View all
        </a>
      </div>

      <div className="space-y-4">
        {mockPayments.map((payment) => {
          const config = statusConfig[payment.status];
          const StatusIcon = config.icon;

          return (
            <div
              key={payment.id}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className={cn('p-2 rounded-lg', config.bg)}>
                  <StatusIcon className={cn('w-5 h-5', config.color)} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{payment.period}</p>
                  <p className="text-sm text-gray-500">
                    {payment.employeeCount} employees
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  ${payment.totalAmount.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">{config.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
