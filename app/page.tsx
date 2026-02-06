'use client'

import { useState } from 'react'
import ChatSession from '@/components/chat-session'
import HomeMap from '@/components/home-map'

export default function Page() {
  // ============================================================
  // INTEGRATION POINT #1: User Authentication
  // ============================================================
  // TODO: Replace with your friend's signup/auth system
  // Example: const { user, isAuthenticated } = useAuth()
  // Then use: user.username, user.animal, user.profile
  const [step, setStep] = useState<'home' | 'chat'>('home')
  const [selectedAnimal] = useState<string>('fox') // REPLACE: user.animal
  const [username] = useState('TestUser') // REPLACE: user.username
  const [selectedTopic, setSelectedTopic] = useState<string>('')

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic)
    setStep('chat')
  }

  if (step === 'chat') {
    // ============================================================
    // INTEGRATION POINT #2: Chat Component
    // ============================================================
    // TODO: Replace ChatSession with your friend's chat implementation
    // Required props: username, animal, topic, onBack
    return (
      <ChatSession
        username={username}
        animal={selectedAnimal}
        topic={selectedTopic}
        onBack={() => setStep('home')}
      />
    )
  }

  // ============================================================
  // MY PART: Interactive Map for Topic Selection
  // ============================================================
  // This component is complete and handles topic selection
  return (
    <HomeMap
      username={username}
      animal={selectedAnimal}
      onTopicSelect={handleTopicSelect}
      onBack={() => console.log('[v0] Back button clicked from home')}
    />
  )
}
