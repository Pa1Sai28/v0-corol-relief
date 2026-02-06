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

// Map locations based on the Club Penguin-style map image
const LOCATIONS: Location[] = [
  {
    id: 'coffee',
    name: 'Coffee Shop',
    icon: '☕',
    color: 'from-amber-600 to-amber-800',
    description: 'Casual Chats & Relaxation',
    position: { top: '52%', left: '21%' },
  },
  {
    id: 'gaming',
    name: 'Game Room',
    icon: '🎮',
    color: 'from-fuchsia-600 to-fuchsia-800',
    description: 'Gaming & Entertainment',
    position: { top: '70%', left: '15%' },
  },
  {
    id: 'tourist',
    name: 'Lighthouse',
    icon: '🗺️',
    color: 'from-violet-600 to-violet-800',
    description: 'Travel & Exploration',
    position: { top: '60%', left: '8%' },
  },
  {
    id: 'food',
    name: 'Pizza Parlor',
    icon: '🍕',
    color: 'from-rose-600 to-rose-800',
    description: 'Food & Cooking',
    position: { top: '28%', left: '48%' },
  },
  {
    id: 'education',
    name: 'Library',
    icon: '📚',
    color: 'from-indigo-600 to-indigo-800',
    description: 'Learning & Knowledge',
    position: { top: '20%', left: '60%' },
  },
  {
    id: 'fitness',
    name: 'Dojo',
    icon: '💪',
    color: 'from-orange-600 to-orange-800',
    description: 'Fitness & Sports',
    position: { top: '55%', left: '52%' },
  },
  {
    id: 'work',
    name: 'Ski Lodge',
    icon: '🏢',
    color: 'from-slate-500 to-slate-700',
    description: 'Business & Career',
    position: { top: '20%', left: '22%' },
  },
  {
    id: 'health',
    name: 'Wellness Center',
    icon: '🏥',
    color: 'from-emerald-500 to-emerald-700',
    description: 'Health & Wellness',
    position: { top: '40%', left: '75%' },
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
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gray-900/80 backdrop-blur-sm shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{currentAnimal?.emoji}</div>
            <div>
              <h2 className="font-bold text-white">{username}</h2>
              <p className="text-xs text-gray-300">{currentAnimal?.name}</p>
            </div>
          </div>
          
          <Button onClick={onBack} variant="outline" size="sm" className="bg-gray-800 text-white border-gray-700">
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Map Container */}
      <div className="relative h-screen pt-16 flex items-center justify-center">
        {/* Map Title */}
        <div className="absolute top-20 left-0 right-0 text-center z-30 pointer-events-none">
          <h1 className="text-5xl font-black text-white drop-shadow-2xl mb-1 text-balance" style={{ textShadow: '0 4px 8px rgba(0,0,0,0.8)' }}>
            Coral Reef
          </h1>
          <p className="text-lg text-white drop-shadow-lg font-semibold" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
            Hover over locations to explore chat rooms
          </p>
        </div>

        {/* Map Image Container */}
        <div className="absolute inset-0 flex items-center justify-center pt-32 pb-24">
          <div className="relative w-[95vw] h-[75vh] max-w-6xl max-h-[700px]">
            {/* Background Map Image */}
            <img
              src="/map-background.png"
              alt="Coral Reef Map"
              className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl"
            />

            {/* Interactive Hover Regions */}
            {LOCATIONS.map((location) => (
              <div
                key={location.id}
                onMouseEnter={() => setHoveredLocation(location.id)}
                onMouseLeave={() => setHoveredLocation(null)}
                onClick={() => onTopicSelect(location.id)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
                style={{
                  top: location.position.top,
                  left: location.position.left,
                }}
              >
                {/* Invisible Large Hover Area */}
                <div className="w-32 h-32 flex items-center justify-center">
                  {/* Pulsing Indicator (always visible but subtle) */}
                  <div
                    className={`absolute w-6 h-6 rounded-full transition-all duration-300 ${
                      hoveredLocation === location.id
                        ? 'w-12 h-12 opacity-0'
                        : 'opacity-60 animate-ping'
                    }`}
                    style={{
                      background: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
                    }}
                  />

                  {/* Small Dot Marker (always visible) */}
                  <div
                    className={`w-4 h-4 rounded-full border-2 border-white shadow-lg transition-all duration-300 ${
                      hoveredLocation === location.id ? 'scale-150' : 'scale-100'
                    } bg-gradient-to-br ${location.color}`}
                  />
                </div>

                {/* Hover Card - Appears on hover */}
                {hoveredLocation === location.id && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-fade-in pointer-events-none">
                    {/* Spotlight Effect */}
                    <div className="absolute inset-0 -m-32 rounded-full bg-gradient-radial from-white/30 via-white/10 to-transparent animate-pulse" />
                    
                    {/* Location Card */}
                    <div className={`relative bg-gradient-to-br ${location.color} rounded-2xl shadow-2xl border-4 border-white p-6 min-w-[220px] pointer-events-auto`}>
                      {/* Icon */}
                      <div className="text-6xl text-center mb-3 animate-bounce">
                        {location.icon}
                      </div>
                      
                      {/* Name */}
                      <h3 className="text-xl font-bold text-white text-center mb-2">
                        {location.name}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-sm text-white/90 text-center mb-4">
                        {location.description}
                      </p>
                      
                      {/* Online Count */}
                      <div className="flex items-center justify-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-sm font-semibold text-white">
                          {Math.floor(Math.random() * 20) + 5} online
                        </span>
                      </div>
                      
                      {/* Click Button */}
                      <button 
                        onClick={() => onTopicSelect(location.id)}
                        className="w-full bg-white/30 hover:bg-white/40 text-white font-bold py-2 rounded-lg transition-all"
                      >
                        Join Chat
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Info Bar */}
        <div className="absolute bottom-6 right-6 pointer-events-none">
          {/* Online Counter */}
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-lg flex items-center gap-3 border border-white/20 pointer-events-auto">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="font-bold text-white text-lg">
                {Math.floor(Math.random() * 50) + 20}
              </span>
            </div>
            <span className="text-gray-300 text-sm">players online</span>
          </div>
        </div>
      </div>
    </div>
  )
}
