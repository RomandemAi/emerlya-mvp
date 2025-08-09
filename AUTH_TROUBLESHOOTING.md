# Authentication Troubleshooting Guide

## Common Issues and Solutions

### 1. Magic Link Expired Error

**Symptoms:**
- Error message: "Email link is invalid or has expired"
- Error code: `otp_expired`
- Happens even when clicking the link quickly

**Common Causes:**

1. **Email Client Preview** (Most Common)
   - Many email clients (Outlook, Gmail, etc.) preview links for security
   - This preview consumes the single-use magic link
   - Solution: Copy and paste the link manually instead of clicking

2. **Multiple Clicks**
   - Magic links are single-use only
   - Clicking twice will make the second click fail
   - Solution: Click once and wait for the page to load

3. **Security Software**
   - Corporate firewalls or antivirus software may scan links
   - This scanning can consume the magic link
   - Solution: Temporarily disable link scanning or use a different network

4. **Browser Extensions**
   - Some privacy/security extensions pre-fetch links
   - Solution: Try in incognito mode or disable extensions temporarily

### 2. Session Not Persisting

**Symptoms:**
- Successfully log in but get redirected back to login
- Auth session missing errors

**Solutions:**
1. Clear browser cookies for the site
2. Check that cookies are enabled in your browser
3. Try a different browser
4. Ensure you're not using strict privacy/tracking prevention settings

### 3. Callback URL Issues

**Symptoms:**
- Redirect to wrong URL after authentication
- 404 errors after clicking magic link

**Solutions:**
1. Verify `NEXT_PUBLIC_SITE_URL` is correctly set in production
2. Check that the callback route is properly configured
3. Ensure the domain is correctly set in Supabase dashboard

## Best Practices for Users

1. **When Requesting a Magic Link:**
   - Use a personal email if corporate email has strict security
   - Close other tabs/windows with the same site
   - Clear cookies if having repeated issues

2. **When Clicking the Magic Link:**
   - Click once and wait
   - Don't refresh the page while it's loading
   - If it fails, request a new link and try copying/pasting the URL

3. **Alternative Solutions:**
   - Consider implementing OTP codes as an alternative to magic links
   - Add social login providers (Google, GitHub, etc.)
   - Implement password-based authentication as a fallback

## Developer Notes

### How the Auth Flow Works

1. User enters email on login page
2. Supabase sends magic link to email
3. User clicks link, which includes a one-time code
4. Browser navigates to `/auth/callback` with the code
5. Callback route exchanges code for session
6. Session cookies are set
7. User is redirected to dashboard

### Error Handling Implementation

The auth callback route now properly handles:
- `otp_expired` errors with helpful messaging
- Missing code parameters
- Failed session creation
- Unexpected errors

The login page now:
- Displays specific error messages based on error type
- Shows helpful tips for common issues
- Provides clear instructions for requesting new links
- Auto-clears error messages after 15 seconds

### Debugging Tips

1. Check browser console for errors
2. Look at Network tab to see the auth callback request
3. Verify cookies are being set correctly
4. Check Supabase logs for auth events
5. Test with different email providers

### Environment Variables

Ensure these are correctly set:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_SITE_URL=https://yourdomain.com (production) or http://localhost:3000 (development)
```

### Cookie Configuration

In production, cookies are set with:
- Domain: `.yourdomain.com` (for subdomain support)
- Secure: true (HTTPS only)
- SameSite: lax (CSRF protection)
- HttpOnly: true (XSS protection)

### Future Improvements

Consider implementing:
1. Rate limiting for magic link requests
2. Alternative authentication methods (OTP, social login)
3. Session refresh indicators
4. Better error tracking and monitoring
5. Email delivery status checking
