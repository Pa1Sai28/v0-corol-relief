'use client'

import { useState } from 'react'

const REACTIONS = {
  laugh: '😂',
  love: '❤️',
  wow: '🤩',
  sad: '😢',
}

export default function MessageBubble({
  message,
  animal,
  onReaction,
}: {
  message: {
    id: string
    user: string
    text: string
    animal: string
    timestamp: number
    reaction?: keyof typeof REACTIONS
  }
  animal?: {
    id: string
    name: string
    emoji: string
  }
  onReaction?: (messageId: string, reaction: keyof typeof REACTIONS) => void
}) {
  const [showReactions, setShowReactions] = useState(false)
  const timestamp = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  const handleReaction = (reaction: keyof typeof REACTIONS) => {
    onReaction?.(message.id, reaction)
    setShowReactions(false)
  }

  return (
    <div className="flex gap-3 animate-fade-in group">
      <div className="text-2xl flex-shrink-0 w-8 h-8 flex items-center justify-center">
        {animal?.emoji}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-gray-800 text-sm">{message.user}</span>
          <span className="text-xs text-gray-400">{timestamp}</span>
        </div>
        <div className="flex items-end gap-2">
          <div className="bg-indigo-50 rounded-lg p-3 text-gray-800 max-w-sm break-words border border-indigo-100">
            {message.text}
          </div>

          {/* Reaction Button */}
          <div className="relative">
            <button
              onClick={() => setShowReactions(!showReactions)}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-xl p-1 hover:bg-gray-100 rounded-lg"
              title="Add reaction"
            >
              😊
            </button>

            {/* Reaction Picker */}
            {showReactions && (
              <div className="absolute bottom-full right-0 mb-2 bg-white border border-gray-300 rounded-lg shadow-lg p-2 flex gap-1 z-10">
                {(Object.entries(REACTIONS) as Array<[keyof typeof REACTIONS, string]>).map(
                  ([key, emoji]) => (
                    <button
                      key={key}
                      onClick={() => handleReaction(key)}
                      className="text-xl p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {emoji}
                    </button>
                  ),
                )}
              </div>
            )}
          </div>
        </div>

        {/* Show reaction if exists */}
        {message.reaction && (
          <div className="mt-1 text-sm text-gray-600">
            Reacted {REACTIONS[message.reaction]}
          </div>
        )}
      </div>
    </div>
  )
}
