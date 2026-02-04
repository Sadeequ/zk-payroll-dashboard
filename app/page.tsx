'use client';

import { useCompanyStore } from '@/stores/company';
import { useEmployeeStore } from '@/stores/employees';
import { StatsCard } from '@/components/ui/stats-card';
import { RecentPayments } from '@/components/payroll/recent-payments';
import { QuickActions } from '@/components/ui/quick-actions';
import { Users, DollarSign, Calendar, Shield } from 'lucide-react';

export default function DashboardPage() {
  const { company } = useCompanyStore();
  const { employees } = useEmployeeStore();
  
  const activeEmployees = employees.filter(e => e.isActive);
  const totalMonthlyPayroll = activeEmployees.reduce(
    (sum, e) => sum + (e.salary || 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">
          Welcome back! Here's an overview of your payroll.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Employees"
          value={activeEmployees.length}
          icon={Users}
          change="+2 this month"
          changeType="positive"
        />
        <StatsCard
          title="Monthly Payroll"
          value={`$${totalMonthlyPayroll.toLocaleString()}`}
          icon={DollarSign}
          change="+5% from last month"
          changeType="positive"
        />
        <StatsCard
          title="Next Payment"
          value="Feb 28"
          icon={Calendar}
          subtitle="In 11 days"
        />
        <StatsCard
          title="Privacy Status"
          value="Secure"
          icon={Shield}
          subtitle="All salaries encrypted"
          changeType="positive"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Payments - 2 columns */}
        <div className="lg:col-span-2">
          <RecentPayments />
        </div>

        {/* Quick Actions - 1 column */}
        <div>
          <QuickActions />
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start">
          <Shield className="w-5 h-5 text-green-600 mt-0.5 mr-3" />
          <div>
            <h3 className="text-sm font-medium text-green-800">
              Your Payroll Data is Private
            </h3>
            <p className="text-sm text-green-700 mt-1">
              All salary amounts are stored as ZK commitments on Stellar. 
              Only you hold the keys to reveal this information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
