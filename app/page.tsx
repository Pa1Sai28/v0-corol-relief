'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import ChatSession from '@/components/chat-session'
import HomeMap from '@/components/home-map'

const ANIMALS = [
  { id: 'rabbit', name: 'Rabbit', emoji: '🐰' },
  { id: 'fox', name: 'Fox', emoji: '🦊' },
  { id: 'bear', name: 'Bear', emoji: '🐻' },
  { id: 'wolf', name: 'Wolf', emoji: '🐺' },
  { id: 'owl', name: 'Owl', emoji: '🦉' },
  { id: 'deer', name: 'Deer', emoji: '🦌' },
]

export default function Page() {
  const [step, setStep] = useState<'signup' | 'home' | 'chat'>('signup')
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null)
  const [username, setUsername] = useState('')
  const [selectedTopic, setSelectedTopic] = useState<string>('')

  const handleSignup = () => {
    if (username && selectedAnimal) {
      setStep('home')
    }
  }

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic)
    setStep('chat')
  }

  if (step === 'home') {
    return (
      <HomeMap
        username={username}
        animal={selectedAnimal!}
        onTopicSelect={handleTopicSelect}
        onBack={() => setStep('signup')}
      />
    )
  }

  if (step === 'chat') {
    return (
      <ChatSession
        username={username}
        animal={selectedAnimal!}
        topic={selectedTopic}
        onBack={() => setStep('home')}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Join Chat</h1>
          <p className="text-gray-600">Choose your animal and enter your name</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Pick Your Animal
          </label>
          <div className="grid grid-cols-3 gap-3">
            {ANIMALS.map((animal) => (
              <button
                key={animal.id}
                onClick={() => setSelectedAnimal(animal.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedAnimal === animal.id
                    ? 'border-indigo-500 bg-indigo-50 shadow-md'
                    : 'border-gray-200 hover:border-indigo-300'
                }`}
              >
                <div className="text-3xl mb-1">{animal.emoji}</div>
                <div className="text-xs font-medium text-gray-700">{animal.name}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Username
          </label>
          <Input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full"
          />
        </div>

        <Button
          onClick={handleSignup}
          disabled={!username || !selectedAnimal}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Enter Chat
        </Button>
      </Card>
    </div>
  )
}
