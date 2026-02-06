'use client'

import { UserProfile, STATUS_CONFIG } from '@/types/user'
import { Button } from '@/components/ui/button'

const ANIMALS = [
  { id: 'rabbit', name: 'Rabbit', emoji: '🐰' },
  { id: 'fox', name: 'Fox', emoji: '🦊' },
  { id: 'bear', name: 'Bear', emoji: '🐻' },
  { id: 'wolf', name: 'Wolf', emoji: '🐺' },
  { id: 'owl', name: 'Owl', emoji: '🦉' },
  { id: 'deer', name: 'Deer', emoji: '🦌' },
]

export default function UserProfileCard({
  profile,
  onClose,
}: {
  profile: UserProfile
  onClose: () => void
}) {
  const animal = ANIMALS.find((a) => a.id === profile.animal)
  const statusConfig = STATUS_CONFIG[profile.status]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="text-5xl">{animal?.emoji}</div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{profile.username}</h2>
              {profile.title && (
                <p className="text-sm text-gray-600">{profile.title}</p>
              )}
              {profile.company && (
                <p className="text-xs text-gray-500">{profile.company}</p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Status Badge */}
        <div className="mb-6">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${statusConfig.color} text-white text-sm font-semibold`}>
            <span>{statusConfig.icon}</span>
            <span>{statusConfig.label}</span>
          </div>
        </div>

        {/* Skills */}
        {profile.skills && profile.skills.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Skills & Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Looking For */}
        {profile.lookingFor && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Looking For</h3>
            <p className="text-sm text-gray-600">{profile.lookingFor}</p>
          </div>
        )}

        {/* Bio */}
        {profile.bio && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">About</h3>
            <p className="text-sm text-gray-600">{profile.bio}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
            Send Message
          </Button>
          <Button variant="outline" className="flex-1 bg-transparent">
            View Full Profile
          </Button>
        </div>
      </div>
    </div>
  )
}
