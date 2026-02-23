'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useWalletStore } from '@/stores/wallet';
import freighterApi, { WatchWalletChanges } from '@stellar/freighter-api';
import type { StellarNetwork } from '@/types/stellar';

declare global {
  interface Window {
    freighter?: any;
  }
}

const NETWORK_CONFIGS = {
  TESTNET: {
    horizonUrl: 'https://horizon-testnet.stellar.org',
    sorobanRpcUrl: 'https://soroban-testnet.stellar.org',
    networkPassphrase: 'Test SDF Network ; September 2015',
  },
  PUBLIC: {
    horizonUrl: 'https://horizon.stellar.org',
    sorobanRpcUrl: 'https://soroban.stellar.org',
    networkPassphrase: 'Public Global Stellar Network ; September 2015',
  },
};

interface StellarContextType {
  connect: () => Promise<void>;
  disconnect: () => void;
  signTransaction: (xdr: string) => Promise<string>;
  invokeContract: (contractId: string, method: string, args: any[]) => Promise<any>;
  isConnected: boolean;
  address: string | null;
  publicKey: string | null;
  network: StellarNetwork;
  horizonUrl: string;
  sorobanRpcUrl: string;
  error: string | null;
  isWalletInstalled: boolean;
}

const StellarContext = createContext<StellarContextType | undefined>(undefined);

interface StellarProviderProps {
  children: ReactNode;
}

export function StellarProvider({ children }: StellarProviderProps) {
  const [isWalletInstalled, setIsWalletInstalled] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const {
    isConnected,
    address,
    publicKey,
    network,
    horizonUrl,
    sorobanRpcUrl,
    connect: storeConnect,
    disconnect: storeDisconnect,
    signTransaction: storeSignTransaction,
    invokeContract: storeInvokeContract,
    setNetwork,
  } = useWalletStore();

  // Check for Freighter extension
  useEffect(() => {
    const checkFreighter = async () => {
      try {
        // Check if Freighter is available
        if (typeof window !== 'undefined' && window.freighter) {
          setIsWalletInstalled(true);

          // Check if already connected
          const { isConnected: connected, error: connectError } = await freighterApi.isConnected();
          if (connectError) throw new Error(connectError);

          if (connected) {
            const { address, error: addressError } = await freighterApi.getAddress();
            if (addressError) throw new Error(addressError);

            // Get network details
            const { network, sorobanRpcUrl, error: networkError } = await freighterApi.getNetworkDetails();
            if (networkError) throw new Error(networkError);

            // Hydrate the store
            useWalletStore.setState({
              isConnected: true,
              address,
              publicKey: address,
              network: network as StellarNetwork,
              sorobanRpcUrl: sorobanRpcUrl || NETWORK_CONFIGS[network as StellarNetwork].sorobanRpcUrl,
            });
          }
        } else {
          setIsWalletInstalled(false);
          setError('Freighter wallet extension is not installed');
        }
      } catch (err) {
        console.error('Error checking Freighter:', err);
        setError('Failed to initialize wallet connection');
      } finally {
        setIsInitializing(false);
      }
    };

    checkFreighter();
  }, []);

  // Listen for wallet changes
  useEffect(() => {
    if (!isWalletInstalled) return;

    const watcher = new WatchWalletChanges(1000); // Check every second

    watcher.watch(({ address, network, error }) => {
      if (error) {
        console.error('Wallet change error:', error);
        return;
      }

      // Update the store with new info
      useWalletStore.setState({
        address,
        publicKey: address,
        network: network as StellarNetwork,
        horizonUrl: NETWORK_CONFIGS[network as StellarNetwork].horizonUrl,
        sorobanRpcUrl: NETWORK_CONFIGS[network as StellarNetwork].sorobanRpcUrl,
      });
    });

    return () => {
      watcher.stop();
    };
  }, [isWalletInstalled]);

  const connect = async () => {
    if (!isWalletInstalled) {
      setError('Please install Freighter wallet extension');
      return;
    }

    try {
      setError(null);
      const { address, error } = await freighterApi.requestAccess();
      if (error) throw new Error(error);

      // Get network details
      const { network, sorobanRpcUrl } = await freighterApi.getNetworkDetails();

      useWalletStore.setState({
        isConnected: true,
        address,
        publicKey: address,
        network: network as StellarNetwork,
        sorobanRpcUrl: sorobanRpcUrl || NETWORK_CONFIGS[network as StellarNetwork].sorobanRpcUrl,
      });
    } catch (err) {
      setError('Failed to connect wallet');
      throw err;
    }
  };

  const disconnect = () => {
    storeDisconnect();
    setError(null);
  };

  const signTransaction = async (xdr: string) => {
    if (!isConnected) {
      setError('Wallet not connected');
      throw new Error('Wallet not connected');
    }

    try {
      setError(null);
      const { signedTxXdr, error } = await freighterApi.signTransaction(xdr, {
        networkPassphrase: NETWORK_CONFIGS[network].networkPassphrase,
      });
      if (error) throw new Error(error);
      return signedTxXdr;
    } catch (err) {
      setError('Failed to sign transaction');
      throw err;
    }
  };

  const invokeContract = async (contractId: string, method: string, args: any[]) => {
    if (!isConnected) {
      setError('Wallet not connected');
      throw new Error('Wallet not connected');
    }

    try {
      setError(null);
      return await storeInvokeContract(contractId, method, args);
    } catch (err) {
      setError('Failed to invoke contract');
      throw err;
    }
  };

  const contextValue: StellarContextType = {
    connect,
    disconnect,
    signTransaction,
    invokeContract,
    isConnected,
    address,
    publicKey,
    network,
    horizonUrl,
    sorobanRpcUrl,
    error,
    isWalletInstalled,
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Initializing Stellar connection...</p>
        </div>
      </div>
    );
  }

  return (
    <StellarContext.Provider value={contextValue}>
      {error && !isConnected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-red-600 mb-2">Wallet Error</h3>
            <p className="text-gray-700 mb-4">{error}</p>
            {!isWalletInstalled && (
              <a
                href="https://www.freighter.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Install Freighter
              </a>
            )}
            <button
              onClick={() => setError(null)}
              className="ml-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {children}
    </StellarContext.Provider>
  );
}

export function useStellar(): StellarContextType {
  const context = useContext(StellarContext);
  if (context === undefined) {
    throw new Error('useStellar must be used within a StellarProvider');
  }
  return context;
}