'use client';

import { useStellar } from '@/components/providers/StellarProvider';

export function StellarDebug() {
  const {
    isConnected,
    address,
    publicKey,
    network,
    horizonUrl,
    sorobanRpcUrl,
    error,
    isWalletInstalled,
  } = useStellar();

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border">
      <h3 className="text-lg font-semibold mb-4">Stellar Debug Info</h3>
      <div className="space-y-2 text-sm">
        <div>
          <span className="font-medium">Wallet Installed:</span>{' '}
          <span className={isWalletInstalled ? 'text-green-600' : 'text-red-600'}>
            {isWalletInstalled ? 'Yes' : 'No'}
          </span>
        </div>
        <div>
          <span className="font-medium">Connected:</span>{' '}
          <span className={isConnected ? 'text-green-600' : 'text-red-600'}>
            {isConnected ? 'Yes' : 'No'}
          </span>
        </div>
        <div>
          <span className="font-medium">Network:</span> {network}
        </div>
        <div>
          <span className="font-medium">Horizon URL:</span> {horizonUrl}
        </div>
        <div>
          <span className="font-medium">Soroban RPC URL:</span> {sorobanRpcUrl}
        </div>
        {address && (
          <div>
            <span className="font-medium">Address:</span>{' '}
            <span className="font-mono text-xs">{address}</span>
          </div>
        )}
        {error && (
          <div>
            <span className="font-medium text-red-600">Error:</span> {error}
          </div>
        )}
      </div>
    </div>
  );
}