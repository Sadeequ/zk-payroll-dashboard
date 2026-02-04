import Link from 'next/link';
import { UserPlus, CreditCard, FileKey, Settings } from 'lucide-react';

const actions = [
  {
    name: 'Add Employee',
    href: '/employees/new',
    icon: UserPlus,
    description: 'Register a new employee with private salary',
  },
  {
    name: 'Process Payroll',
    href: '/payroll/process',
    icon: CreditCard,
    description: 'Run payroll for current period',
  },
  {
    name: 'Generate View Key',
    href: '/audits/keys',
    icon: FileKey,
    description: 'Create audit access for compliance',
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    description: 'Configure company and contracts',
  },
];

export function QuickActions() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="space-y-3">
        {actions.map((action) => (
          <Link
            key={action.name}
            href={action.href}
            className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group"
          >
            <div className="p-2 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors">
              <action.icon className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{action.name}</p>
              <p className="text-xs text-gray-500">{action.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
