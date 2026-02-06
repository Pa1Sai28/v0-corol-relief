'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import AnimalAvatar from '@/components/animal-avatar'
import MessageBubble from '@/components/message-bubble'
import UserProfileCard from '@/components/user-profile-card'
import { UserProfile, STATUS_CONFIG } from '@/types/user'
import { User } from '@/types/user' // Import User type

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
  userProfile?: UserProfile
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

// Mock user profiles with professional info
const mockUserProfiles: UserProfile[] = [
  {
    username: 'Sarah Chen',
    animal: 'fox',
    status: 'hiring',
    skills: ['React', 'TypeScript', 'Node.js'],
    title: 'Engineering Manager',
    company: 'TechCorp',
  },
  {
    username: 'Mike Rodriguez',
    animal: 'bear',
    status: 'looking-for-work',
    skills: ['UI/UX Design', 'Figma', 'CSS'],
    title: 'Senior Designer',
    lookingFor: 'Full-time design role',
  },
  {
    username: 'Emma Wilson',
    animal: 'owl',
    status: 'mentoring',
    skills: ['Python', 'Data Science', 'ML'],
    title: 'Data Scientist',
    company: 'DataLabs',
  },
]

const mockUsers = [
  { id: '1', username: 'John Doe', animal: 'rabbit' },
  { id: '2', username: 'Jane Smith', animal: 'wolf' },
  { id: '3', username: 'Alice Johnson', animal: 'deer' },
]

const TOPIC_INFO: Record<string, { name: string; icon: string }> = {
  'tech-hub': { name: 'Tech Hub', icon: '💻' },
  'design-studio': { name: 'Design Studio', icon: '🎨' },
  'business-plaza': { name: 'Business Plaza', icon: '💼' },
  'healthcare': { name: 'Healthcare Hub', icon: '🏥' },
  'education': { name: 'Education Center', icon: '📚' },
  'finance': { name: 'Finance District', icon: '💰' },
  'coffee-lounge': { name: 'Coffee Lounge', icon: '☕' },
  'gaming-zone': { name: 'Gaming Zone', icon: '🎮' },
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
  const [selectedUserProfile, setSelectedUserProfile] = useState<UserProfile | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  // Current user profile (will come from signup later)
  const currentUserProfile: UserProfile = {
    username,
    animal,
    status: 'available',
    skills: ['React', 'TypeScript'],
    title: 'Test User',
  }

  const [activeUsers] = useState<UserProfile[]>([
    currentUserProfile,
    ...mockUserProfiles,
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
      {/* User Profile Modal */}
      {selectedUserProfile && (
        <UserProfileCard
          profile={selectedUserProfile}
          onClose={() => setSelectedUserProfile(null)}
        />
      )}
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
        {/* User Profile Sidebar */}
        <div className="hidden lg:flex flex-col gap-4 w-80 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-md p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
            <h2 className="font-bold text-gray-800 mb-3 flex items-center justify-between">
              <span>Online Members</span>
              <span className="text-sm font-normal text-gray-600">{activeUsers.length}</span>
            </h2>
            <div className="space-y-2">
              {activeUsers.map((user, index) => {
                const statusConfig = STATUS_CONFIG[user.status]
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedUserProfile(user)}
                    className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-blue-50 border border-gray-200 hover:border-blue-300 transition-all text-left"
                  >
                    <div className="text-2xl flex-shrink-0">
                      {ANIMALS.find((a) => a.id === user.animal)?.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 text-sm truncate">
                        {user.username}
                      </div>
                      {user.title && (
                        <div className="text-xs text-gray-600 truncate">{user.title}</div>
                      )}
                      <div className="flex items-center gap-1 mt-1">
                        <div className={`w-2 h-2 rounded-full ${statusConfig.color}`} />
                        <span className="text-xs text-gray-500">{statusConfig.label}</span>
                      </div>
                      {user.skills && user.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {user.skills.slice(0, 2).map((skill, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded"
                            >
                              {skill}
                            </span>
                          ))}
                          {user.skills.length > 2 && (
                            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                              +{user.skills.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </button>
                )
              })}
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
