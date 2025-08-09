import { Suspense } from 'react';
import Sidebar from './Sidebar';
import CheckoutSuccessHandler from './CheckoutSuccessHandler';

export default function DashboardLayout({
  userEmail,
  subscriptionStatus,
  children,
}: {
  userEmail: string;
  subscriptionStatus: string | null;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-900">
      <Suspense fallback={null}>
        <CheckoutSuccessHandler />
      </Suspense>
      <div className="w-64 fixed h-full">
        <Sidebar 
          userEmail={userEmail} 
          subscriptionStatus={subscriptionStatus}
        />
      </div>
      <main className="flex-1 ml-64 p-8 text-white">
        {children}
      </main>
    </div>
  );
}
