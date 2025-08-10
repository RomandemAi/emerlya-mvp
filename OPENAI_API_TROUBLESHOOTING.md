# OpenAI API Troubleshooting Guide

## 🚨 Current Issue: 500 Error on Content Generation

Your enhanced API route now includes detailed error logging to help identify the exact cause of generation failures.

## 🔍 Step 1: Check Netlify Environment Variables

1. **Go to Netlify Dashboard**: https://app.netlify.com
2. **Select your site**: emerlya-mvp
3. **Site settings** → **Environment variables**
4. **Verify these are set**:
   ```
   OPENAI_API_KEY=sk-proj-...your-key...
   PINECONE_API_KEY=...your-pinecone-key...
   ```

## 🔍 Step 2: Check the Enhanced Error Logs

The API now has detailed logging. Try generating content and check:

1. **Netlify Functions Logs**:
   - Go to Netlify Dashboard → Functions
   - Click on your deployed function
   - Check the real-time logs

2. **Look for these specific messages**:
   ```
   ✅ Successfully created chat completion with gpt-4o-mini
   ❌ gpt-4o-mini failed, trying gpt-4o...
   ❌ Both gpt-4o-mini and gpt-4o failed
   ```

## 🔍 Step 3: Test Your OpenAI API Key Directly

Test your API key with a simple curl command:

```bash
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer YOUR_OPENAI_API_KEY"
```

**Expected Response**: List of available models including `gpt-4o-mini`

## 🔍 Step 4: Common Issues & Solutions

### Issue 1: API Key Not Working
**Symptoms**: `401 Unauthorized` errors
**Solution**: 
- Regenerate OpenAI API key
- Update Netlify environment variables
- Redeploy

### Issue 2: Model Not Available
**Symptoms**: `404 model not found` errors
**Solution**:
- Check your OpenAI dashboard model access
- Try different model (gpt-3.5-turbo)
- Verify billing/usage limits

### Issue 3: Rate Limiting
**Symptoms**: `429 Too Many Requests`
**Solution**:
- Wait a few minutes
- Check OpenAI usage dashboard
- Upgrade OpenAI plan if needed

### Issue 4: Pinecone Connection
**Symptoms**: Pinecone errors in logs
**Solution**:
- Check Pinecone API key
- Verify index name: `cora-mvp-index`
- Test Pinecone connection separately

## 🔍 Step 5: Debug Your Specific Error

With the enhanced logging, you should now see one of these:

### A) Environment Variable Missing
```
Error: "OpenAI API key not configured"
```
**Fix**: Add OPENAI_API_KEY to Netlify

### B) Model Access Issue
```
Error: "Model access error"
Details: "Both gpt-4o-mini and gpt-4o failed. Original: [error], Fallback: [error]"
```
**Fix**: Check model access in OpenAI dashboard

### C) Authentication Issue
```
Error: "Invalid OpenAI API key"
```
**Fix**: Generate new API key

### D) Subscription Issue
```
Error: "subscription_required"
```
**Fix**: This is expected - need active subscription

## 🔍 Step 6: Test in Development

Run locally to see detailed console logs:

```bash
cd cora
npm run dev
```

Try generating content and check your local console for detailed error messages.

## 🔍 Step 7: Quick Model Test

Modify your API to test a simpler model:

```typescript
// Temporarily change in generate/route.ts
model: 'gpt-3.5-turbo'  // This is widely available
```

## 📞 Next Steps

1. **Try generating content** with the enhanced error handling
2. **Check Netlify function logs** for the specific error details
3. **Report back** the exact error message you see
4. **If needed**: We can add even more specific debugging

The enhanced API will now tell us exactly what's failing:
- ✅ Environment variables
- ✅ OpenAI authentication  
- ✅ Model availability
- ✅ Pinecone connection
- ✅ Subscription status

**The deployment should be live in 2-3 minutes. Try generating content again and let me know what specific error you see!**
