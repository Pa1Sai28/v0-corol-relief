'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera, Environment, Html } from '@react-three/drei'
import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'

interface AnimalModelProps {
  animal: string
  isSpeaking: boolean
}

function AnimalGeometry({ animal, isSpeaking }: AnimalModelProps) {
  const groupRef = useRef<THREE.Group>(null)
  const [animation, setAnimation] = useState<'idle' | 'speaking' | 'entering'>('entering')
  const animationTime = useRef(0)

  useEffect(() => {
    if (isSpeaking) {
      setAnimation('speaking')
    } else {
      setAnimation('idle')
    }
  }, [isSpeaking])

  useFrame((state, delta) => {
    if (!groupRef.current) return

    animationTime.current += delta

    // Idle animation - gentle bobbing
    if (animation === 'idle') {
      groupRef.current.position.y = Math.sin(animationTime.current * 2) * 0.2
      groupRef.current.rotation.z = Math.sin(animationTime.current * 1.5) * 0.1
    }

    // Speaking animation - more movement
    if (animation === 'speaking') {
      groupRef.current.position.y = Math.sin(animationTime.current * 4) * 0.3
      groupRef.current.rotation.x = Math.sin(animationTime.current * 3) * 0.15
      groupRef.current.rotation.z = Math.cos(animationTime.current * 3) * 0.15
    }

    // Entering animation
    if (animation === 'entering') {
      if (animationTime.current < 1) {
        groupRef.current.scale.setScalar(animationTime.current)
        groupRef.current.rotation.y = animationTime.current * Math.PI
      } else {
        setAnimation('idle')
      }
    }
  })

  // Create different animal shapes
  const getAnimalGeometry = () => {
    switch (animal) {
      case 'rabbit':
        return (
          <>
            {/* Body */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.6, 16, 16]} />
              <meshStandardMaterial color="#8B6F47" />
            </mesh>
            {/* Head */}
            <mesh position={[0, 1.2, 0]}>
              <sphereGeometry args={[0.5, 16, 16]} />
              <meshStandardMaterial color="#A0826D" />
            </mesh>
            {/* Left Ear */}
            <mesh position={[-0.3, 2.1, 0]}>
              <cylinderGeometry args={[0.15, 0.15, 0.8, 8]} />
              <meshStandardMaterial color="#8B6F47" />
            </mesh>
            {/* Right Ear */}
            <mesh position={[0.3, 2.1, 0]}>
              <cylinderGeometry args={[0.15, 0.15, 0.8, 8]} />
              <meshStandardMaterial color="#8B6F47" />
            </mesh>
          </>
        )

      case 'fox':
        return (
          <>
            {/* Body */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.6, 16, 16]} />
              <meshStandardMaterial color="#FF6B35" />
            </mesh>
            {/* Head */}
            <mesh position={[0, 1.1, 0]}>
              <sphereGeometry args={[0.45, 16, 16]} />
              <meshStandardMaterial color="#FF8C42" />
            </mesh>
            {/* Snout */}
            <mesh position={[0, 0.8, 0.6]}>
              <sphereGeometry args={[0.25, 12, 12]} />
              <meshStandardMaterial color="#FFD700" />
            </mesh>
            {/* Tail */}
            <mesh position={[0, -0.5, -0.8]} rotation={[Math.PI / 6, 0, 0]}>
              <coneGeometry args={[0.3, 1.5, 12]} />
              <meshStandardMaterial color="#FF6B35" />
            </mesh>
          </>
        )

      case 'bear':
        return (
          <>
            {/* Body */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.8, 16, 16]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
            {/* Head */}
            <mesh position={[0, 1.4, 0]}>
              <sphereGeometry args={[0.6, 16, 16]} />
              <meshStandardMaterial color="#A0522D" />
            </mesh>
            {/* Left Ear */}
            <mesh position={[-0.5, 2.3, 0]}>
              <sphereGeometry args={[0.2, 12, 12]} />
              <meshStandardMaterial color="#654321" />
            </mesh>
            {/* Right Ear */}
            <mesh position={[0.5, 2.3, 0]}>
              <sphereGeometry args={[0.2, 12, 12]} />
              <meshStandardMaterial color="#654321" />
            </mesh>
          </>
        )

      case 'wolf':
        return (
          <>
            {/* Body */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.7, 16, 16]} />
              <meshStandardMaterial color="#6B5344" />
            </mesh>
            {/* Head */}
            <mesh position={[0, 1.3, 0]}>
              <sphereGeometry args={[0.5, 16, 16]} />
              <meshStandardMaterial color="#5A4A3A" />
            </mesh>
            {/* Snout */}
            <mesh position={[0, 1, 0.6]}>
              <sphereGeometry args={[0.2, 12, 12]} />
              <meshStandardMaterial color="#7A6A5A" />
            </mesh>
            {/* Tail */}
            <mesh position={[0, -0.3, -0.9]} rotation={[Math.PI / 8, 0, 0]}>
              <coneGeometry args={[0.25, 1.4, 12]} />
              <meshStandardMaterial color="#6B5344" />
            </mesh>
          </>
        )

      case 'owl':
        return (
          <>
            {/* Body */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.5, 16, 16]} />
              <meshStandardMaterial color="#8B7355" />
            </mesh>
            {/* Head */}
            <mesh position={[0, 0.8, 0]}>
              <sphereGeometry args={[0.45, 16, 16]} />
              <meshStandardMaterial color="#A0826D" />
            </mesh>
            {/* Left Eye */}
            <mesh position={[-0.2, 1.1, 0.35]}>
              <sphereGeometry args={[0.15, 12, 12]} />
              <meshStandardMaterial color="#FFD700" />
            </mesh>
            {/* Right Eye */}
            <mesh position={[0.2, 1.1, 0.35]}>
              <sphereGeometry args={[0.15, 12, 12]} />
              <meshStandardMaterial color="#FFD700" />
            </mesh>
            {/* Wings */}
            <mesh position={[-0.6, 0.2, 0]}>
              <sphereGeometry args={[0.25, 12, 12]} />
              <meshStandardMaterial color="#7A6A5A" />
            </mesh>
            <mesh position={[0.6, 0.2, 0]}>
              <sphereGeometry args={[0.25, 12, 12]} />
              <meshStandardMaterial color="#7A6A5A" />
            </mesh>
          </>
        )

      case 'deer':
        return (
          <>
            {/* Body */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.6, 16, 16]} />
              <meshStandardMaterial color="#CD853F" />
            </mesh>
            {/* Head */}
            <mesh position={[0, 1.2, 0]}>
              <sphereGeometry args={[0.45, 16, 16]} />
              <meshStandardMaterial color="#D2A679" />
            </mesh>
            {/* Left Antler */}
            <mesh position={[-0.3, 2, 0]} rotation={[Math.PI / 4, 0, 0]}>
              <coneGeometry args={[0.08, 0.8, 8]} />
              <meshStandardMaterial color="#8B7355" />
            </mesh>
            {/* Right Antler */}
            <mesh position={[0.3, 2, 0]} rotation={[Math.PI / 4, 0, 0]}>
              <coneGeometry args={[0.08, 0.8, 8]} />
              <meshStandardMaterial color="#8B7355" />
            </mesh>
            {/* Snout */}
            <mesh position={[0, 0.8, 0.5]}>
              <sphereGeometry args={[0.15, 12, 12]} />
              <meshStandardMaterial color="#D2A679" />
            </mesh>
          </>
        )

      default:
        return (
          <mesh>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial color="#666" />
          </mesh>
        )
    }
  }

  return <group ref={groupRef}>{getAnimalGeometry()}</group>
}

export default function AnimalModel({ animal, isSpeaking }: AnimalModelProps) {
  return (
    <Canvas className="w-full h-full">
      <PerspectiveCamera makeDefault position={[0, 0, 3]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} />
      <Environment preset="studio" />
      <AnimalGeometry animal={animal} isSpeaking={isSpeaking} />
    </Canvas>
  )
}
