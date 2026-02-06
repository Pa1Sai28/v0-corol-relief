export type UserStatus = 'looking-for-work' | 'hiring' | 'mentoring' | 'casual' | 'available'

export interface UserProfile {
  username: string
  animal: string
  status: UserStatus
  skills: string[]
  title?: string
  company?: string
  bio?: string
  lookingFor?: string
}

export const STATUS_CONFIG = {
  'looking-for-work': {
    label: 'Looking for Work',
    color: 'bg-blue-500',
    icon: '💼',
  },
  'hiring': {
    label: 'Hiring',
    color: 'bg-green-500',
    icon: '🎯',
  },
  'mentoring': {
    label: 'Mentoring',
    color: 'bg-purple-500',
    icon: '🎓',
  },
  'casual': {
    label: 'Casual Chat',
    color: 'bg-gray-500',
    icon: '💬',
  },
  'available': {
    label: 'Available',
    color: 'bg-emerald-500',
    icon: '✅',
  },
}
