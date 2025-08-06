'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useState, useEffect } from 'react';

export default function Login() {
  const supabase = createClientComponentClient();
  const [redirectTo, setRedirectTo] = useState('/auth/callback');

  useEffect(() => {
    // Set the full redirect URL on the client side
    setRedirectTo(`${window.location.origin}/auth/callback`);
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '320px' }}>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={[]}
          view="magic_link"
          redirectTo={redirectTo}
        />
      </div>
    </div>
  );
}
