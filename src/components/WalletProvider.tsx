'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  isFreighterInstalled,
  isFreighterConnected,
  connectFreighter,
  getFreighterPublicKey,
  getUSDCBalance,
  formatAddress,
  WalletState,
  STELLAR_NETWORK,
  CONTRACT_ID,
} from '@/lib/stellar';

interface WalletContextType {
  wallet: WalletState;
  connect: () => Promise<void>;
  disconnect: () => void;
  refreshBalance: () => Promise<void>;
  formatAddress: (address: string) => string;
  isFreighterInstalled: boolean;
  stellarNetwork: string;
  contractId: string;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    publicKey: null,
    balance: 0,
    isLoading: true,
    error: null,
  });

  const [freighterInstalled, setFreighterInstalled] = useState(false);

  // Check Freighter on mount
  useEffect(() => {
    const checkFreighter = async () => {
      const installed = isFreighterInstalled();
      setFreighterInstalled(installed);

      if (installed) {
        const connected = await isFreighterConnected();
        if (connected) {
          const publicKey = await getFreighterPublicKey();
          if (publicKey) {
            const balance = await getUSDCBalance(publicKey);
            setWallet({
              isConnected: true,
              publicKey,
              balance,
              isLoading: false,
              error: null,
            });
            return;
          }
        }
      }

      setWallet((prev) => ({ ...prev, isLoading: false }));
    };

    checkFreighter();
  }, []);

  const connect = useCallback(async () => {
    setWallet((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const result = await connectFreighter();
      if (result) {
        const balance = await getUSDCBalance(result.publicKey);
        setWallet({
          isConnected: true,
          publicKey: result.publicKey,
          balance,
          isLoading: false,
          error: null,
        });
      } else {
        setWallet((prev) => ({
          ...prev,
          isLoading: false,
          error: 'Failed to connect to Freighter. Please install the extension.',
        }));
      }
    } catch (error) {
      setWallet((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to connect wallet',
      }));
    }
  }, []);

  const disconnect = useCallback(() => {
    setWallet({
      isConnected: false,
      publicKey: null,
      balance: 0,
      isLoading: false,
      error: null,
    });
  }, []);

  const refreshBalance = useCallback(async () => {
    if (!wallet.publicKey) return;

    try {
      const balance = await getUSDCBalance(wallet.publicKey);
      setWallet((prev) => ({ ...prev, balance }));
    } catch (error) {
      console.error('Failed to refresh balance:', error);
    }
  }, [wallet.publicKey]);

  return (
    <WalletContext.Provider
      value={{
        wallet,
        connect,
        disconnect,
        refreshBalance,
        formatAddress,
        isFreighterInstalled: freighterInstalled,
        stellarNetwork: STELLAR_NETWORK,
        contractId: CONTRACT_ID,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
