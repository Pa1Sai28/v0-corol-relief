'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

const ANIMALS = [
  { id: 'rabbit', name: 'Rabbit', emoji: '🐰' },
  { id: 'fox', name: 'Fox', emoji: '🦊' },
  { id: 'bear', name: 'Bear', emoji: '🐻' },
  { id: 'wolf', name: 'Wolf', emoji: '🐺' },
  { id: 'owl', name: 'Owl', emoji: '🦉' },
  { id: 'deer', name: 'Deer', emoji: '🦌' },
]

interface Location {
  id: string
  name: string
  icon: string
  color: string
  description: string
  position: { top: string; left: string }
}

const LOCATIONS: Location[] = [
  {
    id: 'work',
    name: 'Work District',
    icon: '💼',
    color: 'from-blue-400 to-blue-600',
    description: 'Business & Career Talk',
    position: { top: '20%', left: '25%' },
  },
  {
    id: 'health',
    name: 'Health Center',
    icon: '🏥',
    color: 'from-green-400 to-green-600',
    description: 'Wellness & Fitness',
    position: { top: '35%', left: '65%' },
  },
  {
    id: 'coffee',
    name: 'Coffee Shop',
    icon: '☕',
    color: 'from-amber-400 to-amber-600',
    description: 'Casual Conversations',
    position: { top: '60%', left: '35%' },
  },
  {
    id: 'fitness',
    name: 'Gym',
    icon: '💪',
    color: 'from-orange-400 to-orange-600',
    description: 'Exercise & Sports',
    position: { top: '25%', left: '75%' },
  },
  {
    id: 'tourist',
    name: 'Tourist Center',
    icon: '🗺️',
    color: 'from-purple-400 to-purple-600',
    description: 'Travel & Adventures',
    position: { top: '70%', left: '70%' },
  },
  {
    id: 'gaming',
    name: 'Game Zone',
    icon: '🎮',
    color: 'from-pink-400 to-pink-600',
    description: 'Gaming & Entertainment',
    position: { top: '55%', left: '15%' },
  },
  {
    id: 'education',
    name: 'Library',
    icon: '📚',
    color: 'from-indigo-400 to-indigo-600',
    description: 'Learning & Education',
    position: { top: '40%', left: '45%' },
  },
  {
    id: 'food',
    name: 'Restaurant',
    icon: '🍔',
    color: 'from-red-400 to-red-600',
    description: 'Food & Cooking',
    position: { top: '15%', left: '50%' },
  },
]

export default function HomeMap({
  username,
  animal,
  onTopicSelect,
  onBack,
}: {
  username: string
  animal: string
  onTopicSelect: (topic: string) => void
  onBack: () => void
}) {
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null)
  const currentAnimal = ANIMALS.find((a) => a.id === animal)

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 via-sky-200 to-emerald-200 relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-white/90 backdrop-blur-sm shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{currentAnimal?.emoji}</div>
            <div>
              <h2 className="font-bold text-gray-800">{username}</h2>
              <p className="text-sm text-gray-600">{currentAnimal?.name}</p>
            </div>
          </div>
          <Button onClick={onBack} variant="outline" size="sm">
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Map Area */}
      <div className="relative h-screen pt-20">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Trees */}
          <div className="absolute top-[10%] left-[5%] text-6xl opacity-70">🌲</div>
          <div className="absolute top-[15%] left-[10%] text-5xl opacity-60">🌲</div>
          <div className="absolute top-[80%] right-[8%] text-6xl opacity-70">🌲</div>
          <div className="absolute top-[85%] right-[15%] text-5xl opacity-60">🌲</div>
          <div className="absolute bottom-[10%] left-[12%] text-6xl opacity-70">🌳</div>
          
          {/* Clouds */}
          <div className="absolute top-[5%] right-[20%] text-4xl opacity-50 animate-pulse">☁️</div>
          <div className="absolute top-[8%] left-[30%] text-5xl opacity-40 animate-pulse">☁️</div>
        </div>

        {/* Center Title */}
        <div className="text-center pt-8 pb-4 relative z-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 text-balance">
            Welcome to Animal Town
          </h1>
          <p className="text-lg text-gray-700">Choose a location to start chatting</p>
        </div>

        {/* Interactive Locations */}
        <div className="relative w-full h-[calc(100vh-250px)] max-w-6xl mx-auto">
          {LOCATIONS.map((location) => (
            <button
              key={location.id}
              onClick={() => onTopicSelect(location.id)}
              onMouseEnter={() => setHoveredLocation(location.id)}
              onMouseLeave={() => setHoveredLocation(null)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group"
              style={{
                top: location.position.top,
                left: location.position.left,
              }}
            >
              {/* Location Building/Icon */}
              <div
                className={`relative flex flex-col items-center justify-center w-32 h-32 rounded-2xl bg-gradient-to-br ${location.color} shadow-lg transform transition-all duration-300 ${
                  hoveredLocation === location.id
                    ? 'scale-110 shadow-2xl rotate-3'
                    : 'hover:scale-105'
                }`}
              >
                <div className="text-5xl mb-2 transform group-hover:scale-110 transition-transform">
                  {location.icon}
                </div>
                <div className="text-white font-bold text-sm text-center px-2">
                  {location.name}
                </div>

                {/* Pulse animation for interactivity */}
                <div className="absolute inset-0 rounded-2xl bg-white/20 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Hover Tooltip */}
              {hoveredLocation === location.id && (
                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap shadow-xl z-30 animate-fade-in">
                  {location.description}
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Online Counter */}
        <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <span className="font-semibold text-gray-800">
            {Math.floor(Math.random() * 50) + 20} online
          </span>
        </div>
      </div>
    </div>
  )
}
