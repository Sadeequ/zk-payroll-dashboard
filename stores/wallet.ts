import { create } from 'zustand';
import { Horizon, Networks, rpc, contract, Contract } from '@stellar/stellar-sdk';
import freighterApi from '@stellar/freighter-api';
import type { StellarNetwork } from '@/types/stellar';

interface WalletState {
  isConnected: boolean;
  address: string | null;
  publicKey: string | null;
  network: StellarNetwork;
  horizonUrl: string;
  sorobanRpcUrl: string;
  connect: () => Promise<void>;
  disconnect: () => void;
  signTransaction: (xdr: string) => Promise<string>;
  invokeContract: (contractId: string, method: string, args: any[]) => Promise<any>;
  setNetwork: (network: StellarNetwork) => void;
}

const NETWORK_CONFIGS = {
  TESTNET: {
    horizonUrl: 'https://horizon-testnet.stellar.org',
    sorobanRpcUrl: 'https://soroban-testnet.stellar.org',
    networkPassphrase: Networks.TESTNET,
  },
  PUBLIC: {
    horizonUrl: 'https://horizon.stellar.org',
    sorobanRpcUrl: 'https://soroban.stellar.org',
    networkPassphrase: Networks.PUBLIC,
  },
};

export const useWalletStore = create<WalletState>((set, get) => ({
  isConnected: false,
  address: null,
  publicKey: null,
  network: 'TESTNET',
  horizonUrl: NETWORK_CONFIGS.TESTNET.horizonUrl,
  sorobanRpcUrl: NETWORK_CONFIGS.TESTNET.sorobanRpcUrl,

  connect: async () => {
    try {
      const { isConnected: connected, error: connectError } = await freighterApi.isConnected();
      if (connectError) throw new Error(connectError);

      if (!connected) {
        const { address, error: accessError } = await freighterApi.requestAccess();
        if (accessError) throw new Error(accessError);
      }

      const { address, error: addressError } = await freighterApi.getAddress();
      if (addressError) throw new Error(addressError);

      set({
        isConnected: true,
        address,
        publicKey: address,
      });
    } catch (error) {
      console.error('Wallet connection failed:', error);
      throw error;
    }
  },

  disconnect: () => {
    set({
      isConnected: false,
      address: null,
      publicKey: null,
    });
  },

  signTransaction: async (xdr: string) => {
    try {
      const { signedTxXdr, error } = await freighterApi.signTransaction(xdr, {
        networkPassphrase: NETWORK_CONFIGS[get().network].networkPassphrase,
      });
      if (error) throw new Error(error);
      return signedTxXdr;
    } catch (error) {
      console.error('Transaction signing failed:', error);
      throw error;
    }
  },

  invokeContract: async (contractId: string, method: string, args: any[]) => {
    try {
      const { publicKey, network } = get();
      if (!publicKey) throw new Error('Wallet not connected');

      const server = new Horizon.Server(NETWORK_CONFIGS[network].horizonUrl);
      const sorobanServer = new rpc.Server(NETWORK_CONFIGS[network].sorobanRpcUrl);

      // This is a simplified implementation - in practice, you'd build proper Soroban transactions
      const contractInstance = new Contract(contractId);
      const account = await server.loadAccount(publicKey);

      // For now, return a placeholder response
      return { success: true, result: 'Contract invoked' };
    } catch (error) {
      console.error('Contract invocation failed:', error);
      throw error;
    }
  },

  setNetwork: (network: StellarNetwork) => {
    set({
      network,
      horizonUrl: NETWORK_CONFIGS[network].horizonUrl,
      sorobanRpcUrl: NETWORK_CONFIGS[network].sorobanRpcUrl,
    });
  },
}));
