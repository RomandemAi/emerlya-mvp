'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

export default function Login() {
  const supabase = createClientComponentClient();

  return (
    <div
      className="flex flex-col justify-center items-center h-screen bg-cover bg-center"
      style={{ 
        backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%), url('/login-bg.jpg')",
        backgroundBlendMode: "overlay"
      }}
    >
      <div className="w-full max-w-md p-8 bg-black bg-opacity-50 backdrop-blur-lg rounded-xl border border-gray-700">
        <h1 className="text-4xl font-bold text-white text-center mb-2">
          Lymera AI
        </h1>
        <p className="text-md text-gray-300 text-center mb-8">
          Welcome back. Sign in to access your AI co-founder.
        </p>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={[]}
          view="magic_link"
          redirectTo={`${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`}
        />
      </div>
    </div>
  );
}
