# 🚨 CRITICAL: Missing Environment Variables in Netlify

## Current Status
- ✅ Build is now fixed
- ❌ Content generation fails (500 error)
- ❌ Subscription doesn't update automatically after payment

## Required Environment Variables

Add these to **Netlify Dashboard → Site Settings → Environment Variables**:

### 1. OpenAI API Key (CRITICAL for content generation)
```
OPENAI_API_KEY=[Your OpenAI API key]
```
- Get from: https://platform.openai.com/api-keys
- Create new secret key
- Ensure you have credits/billing set up

### 2. Pinecone API Key (CRITICAL for content generation)
```
PINECONE_API_KEY=[Your Pinecone API key]
```
- Get from: https://app.pinecone.io
- Go to your project → API Keys
- Copy the key

### 3. Supabase Service Role Key (CRITICAL for subscription updates)
```
SUPABASE_SERVICE_KEY=[Your service role key]
```
- Get from: Supabase Dashboard → Settings → API
- Find "Service role key" (NOT the anon key!)
- This bypasses RLS policies to update subscriptions

### 4. Stripe Webhook Secret (OPTIONAL but recommended)
```
STRIPE_WEBHOOK_SECRET=[Your webhook endpoint secret]
```
- Get from: Stripe Dashboard → Webhooks → Your endpoint
- Click "Reveal" under Signing secret
- Starts with `whsec_`

## After Adding Variables:

1. Save all variables in Netlify
2. Trigger a redeploy (or wait ~3 minutes for auto-deploy)
3. Test:
   - Content generation should work
   - Payments should update subscription automatically
   - No more webhook errors in logs

## Quick Test After Deploy:

1. Try generating content - should work without errors
2. Make a test payment - subscription should update immediately
3. Check Netlify function logs - errors should be gone

## Important Notes:
- Never commit these keys to Git
- The service role key has full database access - keep it secret
- OpenAI will charge for usage - monitor your billing
