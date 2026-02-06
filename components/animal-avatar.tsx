'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'

const AnimalModel = dynamic(() => import('@/components/animal-model'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-100 rounded-lg animate-pulse" />,
})

export default function AnimalAvatar({
  animal,
  isSpeaking,
  size = 'md',
}: {
  animal: string
  isSpeaking: boolean
  size?: 'sm' | 'md' | 'lg'
}) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-full h-full',
  }

  return (
    <div className={`${sizeClasses[size]} relative`}>
      <Suspense
        fallback={<div className="w-full h-full bg-gray-100 rounded-lg animate-pulse" />}
      >
        <AnimalModel animal={animal} isSpeaking={isSpeaking} />
      </Suspense>

      {isSpeaking && (
        <div className="absolute inset-0 rounded-lg ring-4 ring-green-400 ring-opacity-75 animate-pulse" />
      )}
    </div>
  )
}
