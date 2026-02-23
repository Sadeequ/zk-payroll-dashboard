"use client";

import { useStellar } from "@/components/providers/StellarProvider";

function WalletConnect() {
  const { connect, disconnect, isConnected, address, isWalletInstalled } = useStellar();

  const handleConnect = async () => {
    try {
      await connect();
    } catch (error) {
      console.error('Failed to connect:', error);
    }
  };

  const handleDisconnect = () => {
    disconnect();
  };

  if (!isWalletInstalled) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800">
          Please install the{' '}
          <a
            href="https://www.freighter.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:no-underline"
          >
            Freighter wallet extension
          </a>{' '}
          to connect.
        </p>
      </div>
    );
  }

  return (
    <button
      onClick={isConnected ? handleDisconnect : handleConnect}
      className={`px-4 py-2 rounded-md font-medium ${
        isConnected
          ? "bg-green-100 text-green-700 hover:bg-green-200"
          : "bg-blue-600 text-white hover:bg-blue-700"
      }`}
    >
      {isConnected
        ? `${address?.slice(0, 6)}...${address?.slice(-4)}`
        : "Connect Wallet"
      }
    </button>
  );
}

export default WalletConnect;
