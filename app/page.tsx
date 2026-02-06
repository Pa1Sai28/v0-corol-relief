'use client'

import { useState } from 'react'
import ChatSession from '@/components/chat-session'
import HomeMap from '@/components/home-map'

export default function Page() {
  // Mock user data - will be replaced with signup integration later
  const [step, setStep] = useState<'home' | 'chat'>('home')
  const [selectedAnimal] = useState<string>('fox') // Default animal for testing
  const [username] = useState('TestUser') // Default username for testing
  const [selectedTopic, setSelectedTopic] = useState<string>('')

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic)
    setStep('chat')
  }

  if (step === 'chat') {
    return (
      <ChatSession
        username={username}
        animal={selectedAnimal}
        topic={selectedTopic}
        onBack={() => setStep('home')}
      />
    )
  }

  // Home page is the default starting point
  return (
    <HomeMap
      username={username}
      animal={selectedAnimal}
      onTopicSelect={handleTopicSelect}
      onBack={() => console.log('[v0] Back button clicked from home')}
    />
  )
}
