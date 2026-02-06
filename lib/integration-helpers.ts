/**
 * Integration Helper Functions
 * 
 * These utilities help bridge between different parts of the app
 * created by different team members.
 */

import { UserProfile } from '@/types/user'

/**
 * TOPIC INFORMATION
 * Maps topic IDs to human-readable names and icons
 * Use this in your chat component to display the current room
 */
export const TOPIC_INFO: Record<string, { name: string; icon: string; description: string }> = {
  'tech-hub': {
    name: 'Tech Hub',
    icon: '💻',
    description: 'Software, Web Dev, AI & Tech Careers',
  },
  'design-studio': {
    name: 'Design Studio',
    icon: '🎨',
    description: 'UI/UX, Graphics, Product Design',
  },
  'business-plaza': {
    name: 'Business Plaza',
    icon: '💼',
    description: 'Marketing, Sales, Management Jobs',
  },
  'healthcare': {
    name: 'Healthcare Hub',
    icon: '🏥',
    description: 'Medical, Nursing, Health Professionals',
  },
  'education': {
    name: 'Education Center',
    icon: '📚',
    description: 'Teaching, Tutoring, Academia',
  },
  'finance': {
    name: 'Finance District',
    icon: '💰',
    description: 'Finance, Accounting, Investment',
  },
  'coffee-lounge': {
    name: 'Coffee Lounge',
    icon: '☕',
    description: 'Casual Chat & Networking',
  },
  'gaming-zone': {
    name: 'Gaming Zone',
    icon: '🎮',
    description: 'Gaming, Esports & Entertainment',
  },
}

/**
 * Get topic info by ID
 * Returns null if topic doesn't exist
 */
export function getTopicInfo(topicId: string) {
  return TOPIC_INFO[topicId] || null
}

/**
 * Get all available topics as an array
 * Useful for displaying topic lists in signup/settings
 */
export function getAllTopics() {
  return Object.entries(TOPIC_INFO).map(([id, info]) => ({
    id,
    ...info,
  }))
}

/**
 * ANIMAL AVATARS
 * Available animal options for user profiles
 */
export const AVAILABLE_ANIMALS = [
  { id: 'rabbit', name: 'Rabbit', emoji: '🐰' },
  { id: 'fox', name: 'Fox', emoji: '🦊' },
  { id: 'bear', name: 'Bear', emoji: '🐻' },
  { id: 'wolf', name: 'Wolf', emoji: '🐺' },
  { id: 'owl', name: 'Owl', emoji: '🦉' },
  { id: 'deer', name: 'Deer', emoji: '🦌' },
] as const

/**
 * Get animal emoji by ID
 */
export function getAnimalEmoji(animalId: string): string {
  const animal = AVAILABLE_ANIMALS.find((a) => a.id === animalId)
  return animal?.emoji || '🦊' // Default to fox
}

/**
 * Validate user profile data
 * Returns array of error messages, empty if valid
 */
export function validateUserProfile(profile: Partial<UserProfile>): string[] {
  const errors: string[] = []

  if (!profile.username || profile.username.trim().length === 0) {
    errors.push('Username is required')
  }

  if (!profile.animal) {
    errors.push('Animal avatar is required')
  }

  if (!profile.status) {
    errors.push('Status is required')
  }

  if (!profile.skills || profile.skills.length === 0) {
    errors.push('At least one skill is required')
  }

  return errors
}

/**
 * Format user profile for display
 * Useful for showing user info in chat or profiles
 */
export function formatUserDisplay(profile: UserProfile): string {
  const parts = [profile.username]

  if (profile.title) {
    parts.push(profile.title)
  }

  if (profile.company) {
    parts.push(`at ${profile.company}`)
  }

  return parts.join(' • ')
}
