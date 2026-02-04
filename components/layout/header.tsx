'use client';

import { useWalletStore } from '@/stores/wallet';
import { Button } from '@/components/ui/button';
import { Wallet, ChevronDown } from 'lucide-react';

export function Header() {
  const { isConnected, address, connect, disconnect } = useWalletStore();

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex-1 max-w-lg">
        <input
          type="search"
          placeholder="Search employees, transactions..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      {/* Wallet Connection */}
      <div className="flex items-center space-x-4">
        {isConnected ? (
          <div className="flex items-center space-x-2">
            <div className="flex items-center px-4 py-2 bg-gray-100 rounded-lg">
              <Wallet className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">
                {truncateAddress(address!)}
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={disconnect}>
              Disconnect
            </Button>
          </div>
        ) : (
          <Button onClick={connect}>
            <Wallet className="w-4 h-4 mr-2" />
            Connect Wallet
          </Button>
        )}
      </div>
    </header>
  );
}
