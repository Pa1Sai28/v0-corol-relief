/**
 * ============================================================
 * AUTHENTICATION HOOK - TO BE IMPLEMENTED BY YOUR FRIEND
 * ============================================================
 * 
 * This is a STUB that shows the expected authentication structure.
 * Your friend should implement the actual authentication logic here.
 * 
 * This hook will be used in app/page.tsx to:
 * 1. Check if user is logged in
 * 2. Get current user data (username, animal, profile)
 * 3. Handle login/logout actions
 */

'use client'

import { useState, useEffect } from 'react'
import { UserProfile } from '@/types/user'

export interface AuthUser {
  id: string
  username: string
  email: string
  animal: string
  profile: UserProfile
}

export interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
}

/**
 * This hook manages authentication state
 * YOUR FRIEND should implement the actual logic here
 */
export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  })

  // ============================================================
  // TODO: Your friend implements this
  // ============================================================
  // Check for existing session on mount
  useEffect(() => {
    // Example implementation:
    // 1. Check localStorage/cookies for session token
    // 2. Validate token with backend
    // 3. Load user data if valid
    // 4. Set authState accordingly
    
    // TEMPORARY: Auto-login for testing
    // Remove this and implement real auth check
    const mockUser: AuthUser = {
      id: '0',
      username: 'TestUser',
      email: 'test@example.com',
      animal: 'fox',
      profile: {
        id: '0',
        username: 'TestUser',
        animal: 'fox',
        status: 'available',
        skills: ['React', 'TypeScript'],
        title: 'Developer',
      },
    }

    // Simulate loading
    setTimeout(() => {
      setAuthState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
      })
    }, 500)
  }, [])

  // ============================================================
  // LOGIN FUNCTION
  // ============================================================
  const login = async (email: string, password: string) => {
    // TODO: Your friend implements login logic
    // 1. Call authentication API
    // 2. Store session token
    // 3. Load user data
    // 4. Update authState
    console.log('[v0] Login function called (not implemented)')
  }

  // ============================================================
  // SIGNUP FUNCTION
  // ============================================================
  const signup = async (email: string, password: string, username: string, animal: string) => {
    // TODO: Your friend implements signup logic
    // 1. Call registration API
    // 2. Create user account
    // 3. Auto-login after signup
    // 4. Update authState
    console.log('[v0] Signup function called (not implemented)')
  }

  // ============================================================
  // LOGOUT FUNCTION
  // ============================================================
  const logout = async () => {
    // TODO: Your friend implements logout logic
    // 1. Clear session token
    // 2. Clear user data
    // 3. Reset authState
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    })
    console.log('[v0] User logged out')
  }

  return {
    ...authState,
    login,
    signup,
    logout,
  }
}
