'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

type Season = 'spring' | 'summer' | 'fall' | 'winter'

const ANIMALS = [
  { id: 'rabbit', name: 'Rabbit', emoji: '🐰' },
  { id: 'fox', name: 'Fox', emoji: '🦊' },
  { id: 'bear', name: 'Bear', emoji: '🐻' },
  { id: 'wolf', name: 'Wolf', emoji: '🐺' },
  { id: 'owl', name: 'Owl', emoji: '🦉' },
  { id: 'deer', name: 'Deer', emoji: '🦌' },
]

const SEASON_THEMES = {
  spring: {
    bg: 'from-sky-300 via-emerald-200 to-green-300',
    trees: ['🌸', '🌷', '🌺'],
    clouds: '☁️',
    ground: 'from-green-400 to-green-500',
  },
  summer: {
    bg: 'from-blue-400 via-yellow-200 to-amber-300',
    trees: ['🌳', '🌴', '☀️'],
    clouds: '☁️',
    ground: 'from-yellow-500 to-amber-600',
  },
  fall: {
    bg: 'from-orange-300 via-amber-200 to-yellow-300',
    trees: ['🍂', '🍁', '🌾'],
    clouds: '☁️',
    ground: 'from-orange-600 to-red-600',
  },
  winter: {
    bg: 'from-slate-300 via-blue-200 to-cyan-300',
    trees: ['❄️', '⛄', '🌨️'],
    clouds: '☁️',
    ground: 'from-blue-300 to-blue-400',
  },
}

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
    position: { top: '52%', left: '21%' }, // Coffee shop building on left side
  },
  {
    id: 'gaming',
    name: 'Game Room',
    icon: '🎮',
    color: 'from-fuchsia-600 to-fuchsia-800',
    description: 'Gaming & Entertainment',
    position: { top: '70%', left: '15%' }, // Dock area with boat
  },
  {
    id: 'tourist',
    name: 'Lighthouse',
    icon: '🗺️',
    color: 'from-violet-600 to-violet-800',
    description: 'Travel & Exploration',
    position: { top: '60%', left: '8%' }, // Lighthouse on left
  },
  {
    id: 'food',
    name: 'Pizza Parlor',
    icon: '🍕',
    color: 'from-rose-600 to-rose-800',
    description: 'Food & Cooking',
    position: { top: '28%', left: '48%' }, // Central plaza area
  },
  {
    id: 'education',
    name: 'Library',
    icon: '📚',
    color: 'from-indigo-600 to-indigo-800',
    description: 'Learning & Knowledge',
    position: { top: '20%', left: '60%' }, // Forest area top right
  },
  {
    id: 'fitness',
    name: 'Dojo',
    icon: '💪',
    color: 'from-orange-600 to-orange-800',
    description: 'Fitness & Sports',
    position: { top: '55%', left: '52%' }, // Center castle structure
  },
  {
    id: 'work',
    name: 'Ski Lodge',
    icon: '🏢',
    color: 'from-slate-500 to-slate-700',
    description: 'Business & Career',
    position: { top: '20%', left: '22%' }, // Building in upper left area
  },
  {
    id: 'health',
    name: 'Wellness Center',
    icon: '🏥',
    color: 'from-emerald-500 to-emerald-700',
    description: 'Health & Wellness',
    position: { top: '40%', left: '75%' }, // Right side forest area
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
  const [season, setSeason] = useState<Season>('spring')
  const [cloudPosition, setCloudPosition] = useState(0)
  const currentAnimal = ANIMALS.find((a) => a.id === animal)
  const theme = SEASON_THEMES[season]

  // Animate clouds
  useEffect(() => {
    const interval = setInterval(() => {
      setCloudPosition((prev) => (prev + 0.5) % 100)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-blue-500 relative overflow-hidden">
      {/* Animated Background Clouds (optional overlay) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute top-[5%] text-6xl opacity-20 transition-transform duration-300"
          style={{ left: `${cloudPosition}%` }}
        >
          {theme.clouds}
        </div>
        <div
          className="absolute top-[8%] text-5xl opacity-15 transition-transform duration-300"
          style={{ left: `${(cloudPosition + 40) % 100}%` }}
        >
          {theme.clouds}
        </div>
      </div>

      {/* Header with Season Selector */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gray-900/80 backdrop-blur-sm shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl animate-bounce">{currentAnimal?.emoji}</div>
            <div>
              <h2 className="font-bold text-white">{username}</h2>
              <p className="text-xs text-gray-300">{currentAnimal?.name}</p>
            </div>
          </div>
          
          {/* Season Switcher */}
          <div className="flex items-center gap-2">
            <div className="flex gap-1 bg-gray-800/60 rounded-lg p-1">
              {(['spring', 'summer', 'fall', 'winter'] as Season[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setSeason(s)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                    season === s
                      ? 'bg-white text-gray-900'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
            <Button onClick={onBack} variant="outline" size="sm" className="bg-gray-800 text-white border-gray-700">
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main Map Container */}
      <div className="relative h-screen pt-16 flex items-center justify-center">
        {/* Map Title */}
        <div className="absolute top-20 left-0 right-0 text-center z-30 pointer-events-none">
          <h1 className="text-5xl font-black text-white drop-shadow-2xl mb-1 text-balance" style={{ textShadow: '0 4px 8px rgba(0,0,0,0.8)' }}>
            Animal Town Map
          </h1>
          <p className="text-lg text-white drop-shadow-lg font-semibold" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
            Click any location to join the conversation
          </p>
        </div>

        {/* Map Image Container */}
        <div className="absolute inset-0 flex items-center justify-center pt-32 pb-24">
          <div className="relative w-[95vw] h-[75vh] max-w-6xl max-h-[700px]">
            {/* Background Map Image */}
            <img
              src="/map-background.png"
              alt="Animal Town Map"
              className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl"
            />

            {/* Interactive Location Hotspots */}
            {LOCATIONS.map((location) => (
              <button
                key={location.id}
                onClick={() => onTopicSelect(location.id)}
                onMouseEnter={() => setHoveredLocation(location.id)}
                onMouseLeave={() => setHoveredLocation(null)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 group z-20"
                style={{
                  top: location.position.top,
                  left: location.position.left,
                }}
              >
                {/* Clickable Hotspot Marker */}
                <div className="relative">
                  {/* Pulsing Ring Effect */}
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${location.color} opacity-40 animate-ping ${hoveredLocation === location.id ? 'opacity-60' : ''}`} />
                  
                  {/* Main Marker Circle */}
                  <div
                    className={`relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${location.color} shadow-2xl transform transition-all duration-200 border-4 border-white ${
                      hoveredLocation === location.id
                        ? 'scale-125 shadow-[0_0_30px_rgba(255,255,255,0.8)]'
                        : 'hover:scale-110'
                    }`}
                  >
                    {/* Icon */}
                    <div className="text-3xl transform group-hover:scale-110 transition-transform">
                      {location.icon}
                    </div>
                  </div>

                  {/* Location Name Label */}
                  <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap pointer-events-none">
                    <div className={`bg-gray-900/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-xl border-2 border-white/30 transition-all ${hoveredLocation === location.id ? 'scale-110' : ''}`}>
                      <span className="text-xs font-bold text-white">{location.name}</span>
                    </div>
                  </div>

                  {/* Hover Tooltip */}
                  {hoveredLocation === location.id && (
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white text-gray-900 px-4 py-2 rounded-lg text-sm whitespace-nowrap shadow-2xl z-50 animate-fade-in border-2 border-gray-200">
                      {location.description}
                      <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white border-r-2 border-b-2 border-gray-200 rotate-45" />
                    </div>
                  )}

                  {/* Online Indicator */}
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full animate-pulse border-3 border-white shadow-lg flex items-center justify-center">
                    <span className="text-xs text-white font-bold">{Math.floor(Math.random() * 9) + 1}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Map Controls & Info */}
        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between pointer-events-none">
          {/* Season Info */}
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-lg border border-white/20 pointer-events-auto">
            <p className="text-xs text-gray-400 mb-1">Current Season</p>
            <p className="text-lg font-bold text-white capitalize">{season}</p>
          </div>

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
