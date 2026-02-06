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

const LOCATIONS: Location[] = [
  {
    id: 'work',
    name: 'Business Plaza',
    icon: '🏢',
    color: 'from-slate-500 to-slate-700',
    description: 'Business & Career Discussions',
    position: { top: '25%', left: '15%' },
  },
  {
    id: 'health',
    name: 'Wellness District',
    icon: '🏥',
    color: 'from-emerald-500 to-emerald-700',
    description: 'Health & Mental Wellness',
    position: { top: '20%', left: '72%' },
  },
  {
    id: 'coffee',
    name: 'Cozy Café',
    icon: '☕',
    color: 'from-amber-600 to-amber-800',
    description: 'Casual Chats & Relaxation',
    position: { top: '65%', left: '25%' },
  },
  {
    id: 'fitness',
    name: 'Sports Arena',
    icon: '💪',
    color: 'from-orange-600 to-orange-800',
    description: 'Fitness & Sports Talk',
    position: { top: '45%', left: '80%' },
  },
  {
    id: 'tourist',
    name: 'Adventure Park',
    icon: '🗺️',
    color: 'from-violet-600 to-violet-800',
    description: 'Travel & Exploration',
    position: { top: '75%', left: '65%' },
  },
  {
    id: 'gaming',
    name: 'Arcade Center',
    icon: '🎮',
    color: 'from-fuchsia-600 to-fuchsia-800',
    description: 'Gaming & Entertainment',
    position: { top: '52%', left: '10%' },
  },
  {
    id: 'education',
    name: 'Grand Library',
    icon: '📚',
    color: 'from-indigo-600 to-indigo-800',
    description: 'Learning & Knowledge',
    position: { top: '40%', left: '45%' },
  },
  {
    id: 'food',
    name: 'Food Court',
    icon: '🍕',
    color: 'from-rose-600 to-rose-800',
    description: 'Cooking & Recipes',
    position: { top: '10%', left: '45%' },
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
    <div className={`min-h-screen bg-gradient-to-b ${theme.bg} relative overflow-hidden transition-all duration-1000`}>
      {/* Animated Background Clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[10%] text-6xl opacity-30 transition-transform duration-300"
          style={{ left: `${cloudPosition}%` }}
        >
          {theme.clouds}
        </div>
        <div
          className="absolute top-[20%] text-5xl opacity-40 transition-transform duration-300"
          style={{ left: `${(cloudPosition + 30) % 100}%` }}
        >
          {theme.clouds}
        </div>
        <div
          className="absolute top-[15%] text-7xl opacity-25 transition-transform duration-300"
          style={{ left: `${(cloudPosition + 60) % 100}%` }}
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
        <div className="absolute top-20 left-0 right-0 text-center z-10 pointer-events-none">
          <h1 className="text-5xl font-black text-white drop-shadow-lg mb-1 text-balance">
            Animal Town Map
          </h1>
          <p className="text-lg text-white/90 drop-shadow font-semibold">
            Click any region to join the conversation
          </p>
        </div>

        {/* Map SVG-style Ground */}
        <div className="absolute inset-0 flex items-center justify-center pt-32">
          <div className={`relative w-[90vw] h-[70vh] max-w-5xl max-h-[600px] rounded-3xl bg-gradient-to-br ${theme.ground} shadow-2xl border-4 border-white/30 overflow-hidden`}>
            {/* Decorative Elements on Map */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Roads/Paths */}
              <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-800/30 transform -translate-y-1/2" />
              <div className="absolute top-0 bottom-0 left-1/2 w-2 bg-gray-800/30 transform -translate-x-1/2" />
              
              {/* Seasonal decorations */}
              {theme.trees.map((tree, i) => (
                <div
                  key={i}
                  className="absolute text-4xl opacity-50 animate-pulse"
                  style={{
                    top: `${15 + i * 25}%`,
                    left: `${5 + i * 20}%`,
                    animationDelay: `${i * 0.5}s`,
                  }}
                >
                  {tree}
                </div>
              ))}
            </div>

            {/* Interactive Location Regions */}
            {LOCATIONS.map((location) => (
              <button
                key={location.id}
                onClick={() => onTopicSelect(location.id)}
                onMouseEnter={() => setHoveredLocation(location.id)}
                onMouseLeave={() => setHoveredLocation(null)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group z-10"
                style={{
                  top: location.position.top,
                  left: location.position.left,
                }}
              >
                {/* Building Structure */}
                <div className="relative">
                  {/* Building Base */}
                  <div
                    className={`relative flex flex-col items-center justify-end w-28 h-36 rounded-t-xl bg-gradient-to-b ${location.color} shadow-xl transform transition-all duration-300 border-2 border-white/40 ${
                      hoveredLocation === location.id
                        ? 'scale-110 shadow-2xl -translate-y-2'
                        : 'hover:scale-105'
                    }`}
                  >
                    {/* Windows */}
                    <div className="absolute top-3 left-0 right-0 flex justify-center gap-2">
                      <div className="w-3 h-3 bg-yellow-200/80 rounded-sm" />
                      <div className="w-3 h-3 bg-yellow-200/80 rounded-sm" />
                    </div>
                    <div className="absolute top-8 left-0 right-0 flex justify-center gap-2">
                      <div className="w-3 h-3 bg-yellow-200/80 rounded-sm" />
                      <div className="w-3 h-3 bg-yellow-200/80 rounded-sm" />
                    </div>
                    
                    {/* Icon */}
                    <div className="text-5xl mb-3 transform group-hover:scale-125 transition-transform drop-shadow-lg">
                      {location.icon}
                    </div>
                  </div>

                  {/* Door */}
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-10 bg-gray-800 rounded-t-md border-2 border-white/40" />
                  
                  {/* Name Label */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <div className="bg-white/95 px-3 py-1 rounded-full shadow-lg border border-gray-300">
                      <span className="text-xs font-bold text-gray-800">{location.name}</span>
                    </div>
                  </div>

                  {/* Hover Tooltip */}
                  {hoveredLocation === location.id && (
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap shadow-2xl z-50 animate-fade-in">
                      {location.description}
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                    </div>
                  )}

                  {/* Active Indicator */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full animate-pulse border-2 border-white shadow-lg" />
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
