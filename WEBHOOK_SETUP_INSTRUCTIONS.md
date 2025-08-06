# Supabase Webhook Setup Instructions

## Overview
These instructions will guide you through setting up a Database Webhook in your Supabase dashboard to automatically trigger document processing when new documents are inserted into the `documents` table.

## Prerequisites
- Your Next.js development server should be running locally (`npm run dev`)
- Your .env.local file should contain the `WEBHOOK_SECRET` variable

## Step-by-Step Setup

### Step 1: Navigate to Supabase Dashboard
1. Go to [supabase.com](https://supabase.com) and sign in
2. Select your **cora-mvp** project from the dashboard
3. In the left sidebar, click on **"Database"**
4. In the Database section, click on **"Webhooks"**

### Step 2: Create New Webhook
1. Click the **"Create a new webhook"** button
2. You'll see a webhook configuration form

### Step 3: Configure Webhook Settings
Fill in the form with these exact settings:

#### Basic Configuration
- **Name**: `On New Document`
- **Table**: Select `documents` from the dropdown
- **Events**: Check the **"Insert"** checkbox only (leave Update and Delete unchecked)
- **Type**: Select **"HTTP Request"**

#### URL Configuration
- **URL**: 
  - For local development: `http://localhost:3000/api/webhooks/process-document`
  - **Important**: Once you deploy to production (Vercel/Netlify), you'll need to update this URL to your live domain (e.g., `https://your-app.vercel.app/api/webhooks/process-document`)

#### Security Headers
1. In the **"HTTP Headers"** section, click **"Add new header"**
2. Configure the header:
   - **Name**: `Authorization`
   - **Value**: `Bearer YOUR_SUPER_SECRET_TOKEN`

### Step 4: Generate and Configure Your Secret Token

#### Important Security Step:
1. **Generate a strong secret token**. You can use one of these methods:
   - Use an online UUID generator
   - Run this command in your terminal: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
   - Use a password manager to generate a 32+ character random string

2. **Update your .env.local file**:
   - Open your `cora/.env.local` file
   - Replace `YOUR_SUPER_SECRET_TOKEN` with your generated secret
   - Example: `WEBHOOK_SECRET="abc123def456ghi789jkl012mno345pqr678"`

3. **Update the Supabase webhook header**:
   - In the Supabase webhook form, replace `YOUR_SUPER_SECRET_TOKEN` in the Authorization header with the same secret you added to .env.local
   - Final header value should look like: `Bearer abc123def456ghi789jkl012mno345pqr678`

### Step 5: Save and Test
1. Click **"Create webhook"** to save your configuration
2. The webhook should now appear in your webhooks list
3. Status should show as "Active"

## Testing the Webhook

### Test 1: Insert a Document
You can test the webhook by inserting a document directly in Supabase:

1. Go to **Database** → **Table Editor** → **documents**
2. Click **"Insert"** → **"Insert row"**
3. Fill in the required fields:
   - `brand_id`: Use any existing brand ID from your brands table
   - `content`: Add some test content (e.g., "This is a test document for webhook processing")
   - `status`: Leave as "pending" (default)
4. Click **"Save"**

### Test 2: Check the Logs
1. In your Next.js terminal, you should see log messages indicating the webhook was received
2. Check your Supabase webhook logs in the dashboard for delivery status
3. The document's `status` should update from "pending" to "processed" (or "error" if something went wrong)

## Troubleshooting

### Common Issues:

1. **401 Unauthorized Error**:
   - Check that your `WEBHOOK_SECRET` in .env.local matches the token in your Authorization header
   - Ensure the header format is exactly: `Bearer YOUR_SECRET_TOKEN`

2. **Webhook Not Triggering**:
   - Verify the webhook is "Active" in your Supabase dashboard
   - Check that you selected the correct table (`documents`) and event (`Insert`)
   - Ensure your Next.js dev server is running on port 3000

3. **500 Internal Server Error**:
   - Check your Next.js terminal for error messages
   - Verify all environment variables are properly set
   - Ensure the document-processor.js file is working correctly

4. **Connection Refused**:
   - Make sure your Next.js development server is running (`npm run dev`)
   - Verify the webhook URL is exactly `http://localhost:3000/api/webhooks/process-document`

## Production Deployment Notes

When you deploy to production:

1. **Update the webhook URL** in your Supabase dashboard to your production domain
2. **Ensure all environment variables** (including `WEBHOOK_SECRET`) are set in your production environment
3. **Use HTTPS** for your production webhook URL for security

## Security Best Practices

- Keep your `WEBHOOK_SECRET` private and never commit it to version control
- Use a strong, randomly generated secret token
- Consider rotating your webhook secret periodically
- Monitor webhook logs for suspicious activity

---

Your webhook system is now configured and ready to automatically process documents when they're inserted into your database!
