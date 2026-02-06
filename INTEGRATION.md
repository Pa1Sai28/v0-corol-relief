# Integration Guide

This document explains how to integrate the Map/Navigation system with the Signup and Chat components.

## Project Structure

```
app/
  page.tsx                 → Main entry point, handles routing between map and chat
components/
  home-map.tsx            → Interactive map for selecting chat topics
  chat-session.tsx        → Chat room component (STUB - replace with your implementation)
  user-profile-card.tsx   → User profile modal
types/
  user.ts                 → Shared user profile interfaces
```

## Integration Points

### 1. User Authentication & Signup (Your Friend's Part)

Replace the mock user data in `app/page.tsx`:

```typescript
// CURRENT (Mock):
const [selectedAnimal] = useState<string>('fox')
const [username] = useState('TestUser')

// REPLACE WITH:
const { user, isAuthenticated } = useAuth() // Your friend's auth hook
const username = user?.username
const selectedAnimal = user?.animal
```

### 2. User Profile System

The `UserProfile` interface in `types/user.ts` defines the user data structure:

```typescript
interface UserProfile {
  id?: string
  username: string
  animal: string
  status: 'hiring' | 'looking-for-work' | 'mentoring' | 'available'
  skills: string[]
  title?: string
  company?: string
  bio?: string
  lookingFor?: string
}
```

**Your friend should populate this during signup** and pass it through the app.

### 3. Chat Room Component (Your Friend's Part)

Replace `components/chat-session.tsx` with your friend's chat implementation.

**Props the chat component should accept:**

```typescript
interface ChatSessionProps {
  username: string        // Current user's name
  animal: string         // Current user's animal avatar
  topic: string          // Selected chat room topic (e.g., 'tech-hub', 'design-studio')
  onBack: () => void     // Navigation back to map
}
```

**Available Topics:**

The map has 8 chat room topics:
- `tech-hub` → Tech Hub (Software, AI, Tech Careers)
- `design-studio` → Design Studio (UI/UX, Graphics)
- `business-plaza` → Business Plaza (Marketing, Sales, Management)
- `healthcare` → Healthcare Hub (Medical, Nursing)
- `education` → Education Center (Teaching, Academia)
- `finance` → Finance District (Finance, Accounting)
- `coffee-lounge` → Coffee Lounge (Casual Chat)
- `gaming-zone` → Gaming Zone (Gaming, Esports)

### 4. Navigation Flow

```
Page Load
   ↓
Signup (Your Friend) → Sets user profile
   ↓
Home Map (My Part) → User selects topic
   ↓
Chat Room (Your Friend) → Shows chat for selected topic
   ↓
Back to Map → User can select different topic
```

## How to Merge

### Step 1: Replace Signup
In `app/page.tsx`, replace the mock user state with your friend's signup/auth system.

### Step 2: Replace Chat
Replace `components/chat-session.tsx` with your friend's chat component. Just ensure it accepts the props listed above.

### Step 3: Update User Profiles
When a user signs up, collect the `UserProfile` data (skills, status, title, etc.) and store it in your auth context or database.

### Step 4: Test Integration
- User signs up → Profile created
- User sees map → Clicks a topic
- User enters chat → Can chat with others in that topic
- User clicks back → Returns to map

## Mock Data Locations

Remove these when integrating real data:

1. `app/page.tsx` lines 10-11: Mock username and animal
2. `components/chat-session.tsx` lines 44-68: Mock user profiles
3. Any other places with "mock" or "test" in the variable names

## Environment Setup

Make sure both parts use the same:
- React/Next.js versions
- TypeScript configuration
- Styling system (Tailwind CSS)
- State management approach

## Questions?

If anything is unclear, check the code comments or ask for clarification on specific integration points.
