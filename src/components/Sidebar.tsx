'use client';
import LogoutButton from './LogoutButton';
import ManageBillingButton from './ManageBillingButton';
import UpgradeButton from './UpgradeButton';

export default function Sidebar({ 
  userEmail, 
  subscriptionStatus 
}: { 
  userEmail: string;
  subscriptionStatus: string | null;
}) {
  return (
    <div className="flex flex-col justify-between h-full p-4 bg-gray-800 text-white">
      <div>
        <h1 className="text-2xl font-bold mb-8">Cora</h1>
        {/* Add nav links here in the future */}
      </div>
      <div className="space-y-2">
        <p className="text-sm mb-4 text-gray-400">{userEmail}</p>
        {subscriptionStatus === 'active' ? (
          <ManageBillingButton />
        ) : (
          <UpgradeButton />
        )}
        <LogoutButton />
      </div>
    </div>
  );
}
