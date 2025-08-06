'use client';
import LogoutButton from './LogoutButton';
import ManageBillingButton from './ManageBillingButton';

// Accept userEmail as a prop
export default function Sidebar({ userEmail }: { userEmail: string }) {
  return (
    <div className="flex flex-col justify-between h-full p-4 bg-gray-800 text-white">
      <div>
        <h1 className="text-2xl font-bold mb-8">Cora</h1>
        {/* Add nav links here in the future */}
      </div>
      <div className="space-y-2">
        <p className="text-sm mb-4 text-gray-400">{userEmail}</p>
        <ManageBillingButton />
        <LogoutButton />
      </div>
    </div>
  );
}
