'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import AnimalAvatar from '@/components/animal-avatar'
import MessageBubble from '@/components/message-bubble'

const ANIMALS = [
  { id: 'rabbit', name: 'Rabbit', emoji: '🐰' },
  { id: 'fox', name: 'Fox', emoji: '🦊' },
  { id: 'bear', name: 'Bear', emoji: '🐻' },
  { id: 'wolf', name: 'Wolf', emoji: '🐺' },
  { id: 'owl', name: 'Owl', emoji: '🦉' },
  { id: 'deer', name: 'Deer', emoji: '🦌' },
]

interface Message {
  id: string
  user: string
  text: string
  animal: string
  timestamp: number
  reaction?: 'laugh' | 'love' | 'wow' | 'sad'
}

interface User {
  username: string
  animal: string
  id: string
}

interface ReactionEmoji {
  laugh: string
  love: string
  wow: string
  sad: string
}

const REACTIONS: ReactionEmoji = {
  laugh: '😂',
  love: '❤️',
  wow: '🤩',
  sad: '😢',
}

const mockUsers: User[] = [
  { username: 'Alex', animal: 'fox', id: '1' },
  { username: 'Jordan', animal: 'bear', id: '2' },
  { username: 'Casey', animal: 'owl', id: '3' },
]

const TOPIC_INFO: Record<string, { name: string; icon: string }> = {
  work: { name: 'Work District', icon: '💼' },
  health: { name: 'Health Center', icon: '🏥' },
  coffee: { name: 'Coffee Shop', icon: '☕' },
  fitness: { name: 'Gym', icon: '💪' },
  tourist: { name: 'Tourist Center', icon: '🗺️' },
  gaming: { name: 'Game Zone', icon: '🎮' },
  education: { name: 'Library', icon: '📚' },
  food: { name: 'Restaurant', icon: '🍔' },
}

export default function ChatSession({
  username,
  animal,
  topic,
  onBack,
}: {
  username: string
  animal: string
  topic: string
  onBack: () => void
}) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [speakingUsers, setSpeakingUsers] = useState<Set<string>>(new Set())
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [activeUsers] = useState<User[]>([
    { username, animal, id: '0' },
    ...mockUsers,
  ])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (input.trim()) {
      // Simulate user speaking
      setSpeakingUsers((prev) => new Set(prev).add('0'))

      const newMessage: Message = {
        id: Date.now().toString(),
        user: username,
        text: input,
        animal,
        timestamp: Date.now(),
      }

      setMessages([...messages, newMessage])
      setInput('')

      // Stop speaking after 1 second
      setTimeout(() => {
        setSpeakingUsers((prev) => {
          const next = new Set(prev)
          next.delete('0')
          return next
        })
      }, 1000)

      // Simulate other users responding
      setTimeout(() => {
        const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)]
        setSpeakingUsers((prev) => new Set(prev).add(randomUser.id))

        const responses = [
          'That sounds great!',
          'I agree with you!',
          'Interesting point!',
          'Tell me more!',
          'Absolutely!',
        ]
        const randomResponse = responses[Math.floor(Math.random() * responses.length)]

        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            user: randomUser.username,
            text: randomResponse,
            animal: randomUser.animal,
            timestamp: Date.now(),
          },
        ])

        setTimeout(() => {
          setSpeakingUsers((prev) => {
            const next = new Set(prev)
            next.delete(randomUser.id)
            return next
          })
        }, 1000)
      }, 1500)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{TOPIC_INFO[topic]?.icon || '💬'}</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {TOPIC_INFO[topic]?.name || 'Group Chat'}
              </h1>
              <p className="text-sm text-gray-600">Community Chat Room</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">
                {ANIMALS.find((a) => a.id === animal)?.emoji}
              </span>
              <span className="text-gray-700 font-medium">{username}</span>
            </div>
            <Button
              onClick={onBack}
              variant="outline"
              className="text-sm bg-transparent"
            >
              Back to Map
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex gap-4 max-w-6xl w-full mx-auto p-4 overflow-hidden">
        {/* 3D Animals Area */}
        <div className="hidden lg:flex flex-col gap-4 w-80 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="font-bold text-gray-800 mb-3">Online Members</h2>
            <div className="space-y-3">
              {activeUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-indigo-50 border border-indigo-200"
                >
                  <AnimalAvatar
                    animal={user.animal}
                    isSpeaking={speakingUsers.has(user.id)}
                    size="sm"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-800 text-sm">{user.username}</div>
                    {speakingUsers.has(user.id) && (
                      <div className="text-xs text-indigo-600 font-semibold">Speaking...</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3D Scene */}
          <div className="bg-white rounded-lg shadow-md p-4 flex-1 flex items-center justify-center overflow-hidden">
            <div className="w-full h-full">
              <AnimalAvatar animal={animal} isSpeaking={speakingUsers.has('0')} size="lg" />
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 flex flex-col bg-white rounded-lg shadow-md">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-400">
                <p>No messages yet. Start the conversation!</p>
              </div>
            ) : (
              messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  animal={ANIMALS.find((a) => a.id === msg.animal)}
                />
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t p-4 flex gap-2">
            <Input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6"
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
