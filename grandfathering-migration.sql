-- Grandfathering Migration for Legacy $29 Users
-- This script helps identify and maintain legacy pricing for existing users

-- 1. Check current active subscribers (users who paid $29)
SELECT 
  id,
  email,
  subscription_status,
  stripe_customer_id,
  word_credits,
  created_at as user_created,
  updated_at as last_updated
FROM auth.users u
JOIN profiles p ON u.id = p.id
WHERE p.subscription_status = 'active'
ORDER BY u.created_at;

-- 2. Ensure all active users maintain their grandfathered status
-- (This is already handled by keeping the 'active' tier in TIER_LIMITS)

-- 3. If you need to manually grandfather any users who might have been missed:
-- UPDATE profiles 
-- SET subscription_status = 'active'
-- WHERE stripe_customer_id IN ('cus_customer_id_here')
--   AND subscription_status != 'active';

-- 4. Check usage stats for grandfathered users
SELECT 
  u.email,
  p.subscription_status,
  p.word_credits,
  COUNT(ua.id) as content_pieces_this_month,
  SUM(ua.word_count) as words_used_this_month
FROM auth.users u
JOIN profiles p ON u.id = p.id
LEFT JOIN user_analytics ua ON u.id = ua.user_id 
  AND ua.created_at >= date_trunc('month', CURRENT_DATE)
WHERE p.subscription_status = 'active'
GROUP BY u.email, p.subscription_status, p.word_credits
ORDER BY words_used_this_month DESC;

-- 5. Verify tier limits are correct for grandfathered users
-- Check that the 'active' tier in usage-types.ts has:
-- - words_per_month: 50000
-- - content_per_month: 500
-- - features: ['Advanced content generation', 'Unlimited brands', 'Priority support', 'Analytics', 'API access']
