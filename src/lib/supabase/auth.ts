import { createClient } from './actions'

/**
 * Gets the authenticated user, handling AuthSessionMissingError gracefully
 * Returns null if no session exists instead of throwing
 */
export async function getAuthenticatedUser() {
  const supabase = await createClient()
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error) {
      console.log('Auth check failed:', error.message)
      return null
    }
    
    return user
  } catch (error: any) {
    // Handle AuthSessionMissingError specifically
    if (error?.message?.includes('AuthSessionMissingError') || 
        error?.name === 'AuthSessionMissingError' ||
        error?.message?.includes('session')) {
      console.log('No active session found')
      return null
    }
    
    // Log unexpected errors but don't throw
    console.error('Unexpected auth error:', error)
    return null
  }
}

/**
 * Gets the user session, returns null if no session
 * More lenient than getUser() - doesn't throw errors
 */
export async function getUserSession() {
  const supabase = await createClient()
  
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error || !session) {
      return null
    }
    
    return session
  } catch (error) {
    console.log('Session check failed:', error)
    return null
  }
}

/**
 * Ensures a user has a profile in the database
 * Creates one if it doesn't exist
 */
export async function ensureUserProfile(userId: string) {
  const supabase = await createClient()
  
  // Check if profile exists
  const { data: existingProfile } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', userId)
    .single()

  if (!existingProfile) {
    // Create profile if it doesn't exist
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: userId,
        subscription_status: null,
        stripe_customer_id: null,
      })

    if (profileError) {
      console.error('Failed to create user profile:', profileError)
      throw new Error('Failed to create user profile')
    }
  }
  
  return true
}
