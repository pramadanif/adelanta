'use client';

import React from 'react';
import { Wallet, LogOut, ExternalLink, AlertCircle } from 'lucide-react';
import { useWallet } from '@/components/WalletProvider';
import { getAccountExplorerUrl } from '@/lib/stellar';

interface WalletButtonProps {
  variant?: 'default' | 'compact';
  className?: string;
}

export const WalletButton: React.FC<WalletButtonProps> = ({ 
  variant = 'default',
  className = '' 
}) => {
  const { 
    wallet, 
    connect, 
    disconnect, 
    formatAddress, 
    isFreighterInstalled,
    stellarNetwork 
  } = useWallet();

  if (wallet.isLoading) {
    return (
      <button 
        disabled
        className={`flex items-center gap-2 bg-gray-200 text-gray-500 font-medium py-2 px-4 rounded-full ${className}`}
      >
        <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
        {variant === 'default' && <span>Loading...</span>}
      </button>
    );
  }

  if (wallet.isConnected && wallet.publicKey) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="flex items-center gap-2 bg-green-100 text-green-800 py-2 px-4 rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="font-mono text-sm">{formatAddress(wallet.publicKey)}</span>
          {variant === 'default' && (
            <span className="text-xs text-green-600 font-medium">
              {wallet.balance.toFixed(2)} USDC
            </span>
          )}
        </div>
        
        <a
          href={getAccountExplorerUrl(wallet.publicKey)}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-gray-500 hover:text-primary transition-colors"
          title="View on Explorer"
        >
          <ExternalLink size={16} />
        </a>
        
        <button
          onClick={disconnect}
          className="p-2 text-gray-500 hover:text-red-500 transition-colors"
          title="Disconnect"
        >
          <LogOut size={16} />
        </button>
      </div>
    );
  }

  if (!isFreighterInstalled) {
    return (
      <a
        href="https://www.freighter.app/"
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center gap-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 font-medium py-2 px-4 rounded-full transition-colors ${className}`}
      >
        <AlertCircle size={18} />
        {variant === 'default' && <span>Install Freighter</span>}
      </a>
    );
  }

  return (
    <button
      onClick={connect}
      className={`flex items-center gap-2 bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-all shadow-md hover:shadow-lg ${className}`}
    >
      <Wallet size={18} />
      {variant === 'default' && <span>Connect Wallet</span>}
    </button>
  );
};

// Network Badge Component
export const NetworkBadge: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { stellarNetwork, contractId } = useWallet();
  
  return (
    <div className={`flex items-center gap-2 text-xs ${className}`}>
      <span className={`px-2 py-1 rounded-full font-medium ${
        stellarNetwork === 'mainnet' 
          ? 'bg-green-100 text-green-700' 
          : 'bg-yellow-100 text-yellow-700'
      }`}>
        {stellarNetwork === 'mainnet' ? 'Mainnet' : 'Testnet'}
      </span>
      <span className="text-gray-400 font-mono truncate max-w-[100px]" title={contractId}>
        {contractId.slice(0, 8)}...
      </span>
    </div>
  );
};
