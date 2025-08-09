# Stripe Test Mode Setup Instructions

## ✅ Local Environment (Already Updated)
Your `.env.local` file has been updated with test keys.

## 📝 Netlify Environment Variables to Update

Go to Netlify Dashboard → Site Settings → Environment Variables and update these:

### Required Updates:
```
STRIPE_SECRET_KEY=[Your test secret key from Stripe Dashboard - starts with sk_test_]
STRIPE_WEBHOOK_SECRET=[Your webhook endpoint secret from Stripe Dashboard]
NEXT_PUBLIC_STRIPE_PRICE_ID=price_1RuAvDFL0Nt3XbK9b6TSnacQ
```

**Note:** Get your test keys from Stripe Dashboard → Developers → API Keys
**Webhook Secret:** Get from Stripe Dashboard → Developers → Webhooks → Your endpoint

### Already Set (if not, add this too):
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51FvjifFL0Nt3XbK9x4kVnGxHyjmUeIlg9tvfmbBe9e2yve2bm02DOHSYjV8rWqFnD0cDui7C8Ec2mouMOkMKs7Ej00gf6YAvIM
```

## 🧪 Test Card Information
Use these test cards for payment testing:
- **Success:** 4242 4242 4242 4242
- **Decline:** 4000 0000 0000 0002
- **Requires Auth:** 4000 0025 0000 3155

For all test cards:
- **Expiry:** Any future date (e.g., 01/30)
- **CVC:** Any 3 digits (e.g., 222)
- **Name:** Any name (e.g., "Test User")

## 🔄 Switching Between Test and Production

### Test Mode (Current):
- Uses test keys (pk_test_..., sk_test_..., price_...)
- No real charges
- Test cards only

### Production Mode:
- Uses live keys (pk_live_..., sk_live_..., price_...)
- Real charges
- Real credit cards only

## ⚠️ Important Notes
1. Never mix test and live keys
2. Test cards only work with test keys
3. Real cards only work with live keys
4. Keep your secret keys private (never commit them)

## 🚀 After Updating Netlify
1. Wait for Netlify to redeploy (2-3 minutes)
2. Visit your site
3. Try upgrading with test card 4242 4242 4242 4242
4. Check Stripe Test Dashboard for the transaction
