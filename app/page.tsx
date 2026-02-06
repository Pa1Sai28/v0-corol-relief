'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import ChatSession from '@/components/chat-session'
import HomeMap from '@/components/home-map'

export default function Page() {
  // ============================================================
  // STEP 1: Get Authentication State
  // ============================================================
  // Your friend implements useAuth() hook with their signup/login system
  const { user, isAuthenticated, isLoading } = useAuth()
  
  const [step, setStep] = useState<'home' | 'chat'>('home')
  const [selectedTopic, setSelectedTopic] = useState<string>('')

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic)
    setStep('chat')
  }

  // ============================================================
  // LOADING STATE - Show while checking authentication
  // ============================================================
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  // ============================================================
  // NOT AUTHENTICATED - Your friend's signup/login component goes here
  // ============================================================
  // Replace this section with your friend's SignupPage or LoginPage component
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Coral Reef</h1>
          <p className="text-gray-600 mb-6">
            Please sign up or log in to access the chat rooms
          </p>
          <div className="space-y-4">
            <div className="p-6 bg-blue-50 rounded-lg border-2 border-dashed border-blue-300">
              <p className="text-sm text-gray-700 font-medium mb-2">
                🔌 INTEGRATION POINT
              </p>
              <p className="text-xs text-gray-600">
                Replace this section with your friend's Signup/Login component
              </p>
            </div>
            <p className="text-xs text-gray-500">
              Your friend should replace the !isAuthenticated block in app/page.tsx
            </p>
          </div>
        </div>
      </div>
    )
  }

  // ============================================================
  // AUTHENTICATED - Show Map or Chat
  // ============================================================
  if (step === 'chat') {
    // Your friend replaces ChatSession with their chat implementation
    return (
      <ChatSession
        username={user.username}
        animal={user.animal}
        topic={selectedTopic}
        onBack={() => setStep('home')}
      />
    )
  }

  // MY PART: Interactive Map for Topic Selection
  return (
    <HomeMap
      username={user.username}
      animal={user.animal}
      onTopicSelect={handleTopicSelect}
      onBack={() => console.log('[v0] User wants to logout')}
    />
  )
}
