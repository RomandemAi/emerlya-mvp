# Supabase OTP Troubleshooting Guide

If you're receiving magic links instead of 6-digit OTP codes, follow these steps:

## 1. Check Supabase Auth Configuration

1. **Go to your Supabase Dashboard**
   - Navigate to your project
   - Go to `Authentication` → `Settings`

2. **Check Email Auth Settings**
   - Ensure "Enable email confirmations" is **DISABLED** (this forces magic links)
   - Ensure "Email OTP" is **ENABLED**
   - If "Magic Links" is enabled, consider **DISABLING** it to force OTP-only

3. **Email Templates**
   - Go to `Authentication` → `Email Templates`
   - Check the "Magic Link" template vs "OTP" template
   - Ensure the correct template is being used

## 2. Verify Environment Variables

Check your `.env.local` file has the correct Supabase settings:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 3. Test Configuration

1. **Clear your browser cache and localStorage**
2. **Try with a fresh email address**
3. **Check the email you receive:**
   - **OTP email**: Contains a 6-digit code
   - **Magic link email**: Contains a clickable link

## 4. Force OTP in Development

If you're still getting magic links, try this temporary test:

1. Go to Supabase Dashboard → Authentication → Settings
2. **Disable "Magic Links"** completely
3. Keep only "Email OTP" enabled
4. Test again

## 5. Common Issues

### Issue: Mixed configuration
**Solution**: Disable magic links entirely, keep only Email OTP enabled

### Issue: Email confirmation required
**Solution**: Disable "Enable email confirmations" in Auth settings

### Issue: Wrong email template
**Solution**: Check which template is being sent in Email Templates section

## 6. Recent Code Changes

The latest deployment includes:
- ✅ Updated `signInWithOtp()` call with explicit configuration
- ✅ Fixed TypeScript errors
- ✅ Enhanced error handling

## Need Help?

If you're still receiving magic links after checking all the above:

1. **Screenshot your Supabase Auth settings**
2. **Check which email template is being sent**
3. **Try with email confirmation disabled**

The frontend code is working correctly - this is typically a Supabase dashboard configuration issue.
