# How to Connect Signup/Login with Home Map

## Overview

This guide explains how to connect your friend's signup/login pages with your interactive map.

## Architecture Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      app/page.tsx                           │
│                    (Main Entry Point)                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │   useAuth Hook   │
                    │ (Authentication) │
                    └──────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────┐    ┌──────────────┐     ┌──────────────┐
│   Loading    │    │ Not Auth     │     │ Authenticated│
│   Spinner    │    │ (Login/      │     │ (Show Map)   │
│              │    │  Signup)     │     │              │
└──────────────┘    └──────────────┘     └──────────────┘
                            │                     │
                    ┌───────┴────────┐           │
                    ▼                ▼           ▼
            ┌─────────────┐  ┌─────────────┐   ┌──────────┐
            │ Your Friend │  │ Your Friend │   │   YOUR   │
            │ Signup Page │  │ Login Page  │   │ Home Map │
            └─────────────┘  └─────────────┘   └──────────┘
                    │                │               │
                    └────────┬───────┘               │
                             ▼                       ▼
                    After successful           User clicks
                    signup/login, call:        location to
                    - setAuthState()           join chat
                    - Redirect to map               │
                                                    ▼
                                            ┌──────────────┐
                                            │ Your Friend  │
                                            │ Chat Session │
                                            └──────────────┘
```

---

## Step-by-Step Integration

### Step 1: Your Friend Implements `useAuth()` Hook

**File:** `hooks/use-auth.ts`

Your friend should implement these functions:

```typescript
// Check if user is logged in on page load
useEffect(() => {
  // Check localStorage/session
  // Validate token
  // Load user data
  // Update isAuthenticated
}, [])

// Login function
const login = async (email, password) => {
  // Call your backend API
  // Get user data and token
  // Store token in localStorage/cookies
  // Update authState with user data
}

// Signup function
const signup = async (email, password, username, animal) => {
  // Create new user account
  // Automatically login after signup
  // Update authState
}

// Logout function
const logout = async () => {
  // Clear session
  // Clear user data
  // Reset authState
}
```

---

### Step 2: Your Friend Creates Signup/Login Components

Create these components:
- `components/signup-page.tsx`
- `components/login-page.tsx`

**Example structure:**

```typescript
// components/signup-page.tsx
'use client'

import { useAuth } from '@/hooks/use-auth'

export function SignupPage() {
  const { signup } = useAuth()

  const handleSignup = async (formData) => {
    await signup(
      formData.email,
      formData.password,
      formData.username,
      formData.selectedAnimal // User chooses their animal
    )
    // After successful signup, useAuth will update
    // and app/page.tsx will automatically redirect to map
  }

  return (
    <form onSubmit={handleSignup}>
      {/* Signup form fields */}
      {/* Animal selection */}
    </form>
  )
}
```

---

### Step 3: Connect Signup/Login to Main Page

**File:** `app/page.tsx` (Already updated!)

Replace this section:

```typescript
// Line 44-66 in app/page.tsx
if (!isAuthenticated || !user) {
  // REPLACE THIS ENTIRE SECTION
  return <YourFriendSignupPage />
}
```

With your friend's component:

```typescript
import { SignupPage } from '@/components/signup-page'

if (!isAuthenticated || !user) {
  return <SignupPage />
}
```

---

### Step 4: Replace Chat Component

**File:** `app/page.tsx` (Line 74-80)

Your friend should replace `ChatSession` with their chat implementation:

```typescript
if (step === 'chat') {
  return (
    <YourFriendChatComponent
      username={user.username}
      animal={user.animal}
      topic={selectedTopic}
      onBack={() => setStep('home')}
    />
  )
}
```

---

## Data Flow Example

### 1. User Opens App
```
app/page.tsx loads
↓
useAuth() checks for existing session
↓
isLoading = true (shows spinner)
↓
No session found
↓
isAuthenticated = false
↓
Show Signup/Login page
```

### 2. User Signs Up
```
User fills signup form
↓
signup() function called
↓
Backend creates account
↓
Token stored in localStorage
↓
authState updates with user data:
{
  id: "123",
  username: "JohnDoe",
  email: "john@example.com",
  animal: "fox",
  profile: { ... }
}
↓
isAuthenticated = true
↓
app/page.tsx automatically shows HomeMap
```

### 3. User Selects Topic on Map
```
User clicks "Tech Hub" on map
↓
handleTopicSelect("tech-hub") called
↓
step = "chat"
↓
ChatSession component renders
↓
User chats with others
```

### 4. User Returns to Map
```
User clicks "Back to Map" in chat
↓
onBack() called
↓
step = "home"
↓
HomeMap component renders
```

---

## Key Integration Points

### 1. User Data Structure

Make sure your friend's user object matches this structure:

```typescript
interface AuthUser {
  id: string
  username: string
  email: string
  animal: string        // e.g., "fox", "bear", "owl"
  profile: UserProfile  // See types/user.ts
}
```

### 2. Available Animals

Users can choose from these animals during signup:
- `fox` 🦊
- `bear` 🐻
- `rabbit` 🐰
- `wolf` 🐺
- `owl` 🦉
- `deer` 🦌

### 3. Available Chat Topics

When user selects a location on the map, these topic IDs are passed:
- `tech-hub` - Tech & Programming
- `design-studio` - UI/UX Design
- `business-plaza` - Business & Marketing
- `healthcare` - Medical & Health
- `education` - Teaching & Learning
- `finance` - Finance & Accounting
- `coffee-lounge` - Casual Chat
- `gaming-zone` - Gaming & Esports

---

## Testing the Integration

### Test Checklist

1. **Signup Flow**
   - [ ] User can create account
   - [ ] User selects animal during signup
   - [ ] After signup, user sees map automatically

2. **Login Flow**
   - [ ] Returning user can login
   - [ ] Session persists on page refresh
   - [ ] User data loads correctly

3. **Map Navigation**
   - [ ] Authenticated user sees Coral Reef map
   - [ ] User can click locations
   - [ ] Correct username and animal display

4. **Chat Integration**
   - [ ] Clicking location opens chat
   - [ ] Correct topic passed to chat
   - [ ] Back button returns to map

5. **Logout**
   - [ ] User can logout
   - [ ] Returns to login/signup page
   - [ ] Session cleared

---

## Common Issues & Solutions

### Issue: Infinite Loading Spinner
**Solution:** Make sure `isLoading` is set to `false` after auth check completes

### Issue: User Data Not Showing on Map
**Solution:** Verify `user.username` and `user.animal` are populated in authState

### Issue: Can't Access Map After Login
**Solution:** Check that `isAuthenticated` is set to `true` after successful login

### Issue: Chat Doesn't Receive Topic
**Solution:** Verify `selectedTopic` state is passed correctly to chat component

---

## Quick Start Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
# Navigate to http://localhost:3000
```

---

## File Structure

```
coral-reef/
├── app/
│   └── page.tsx              ← Main entry (ALREADY UPDATED)
├── hooks/
│   └── use-auth.ts           ← Your friend implements this
├── components/
│   ├── home-map.tsx          ← YOUR WORK (Complete)
│   ├── chat-session.tsx      ← Your friend replaces this
│   ├── signup-page.tsx       ← Your friend creates this
│   └── login-page.tsx        ← Your friend creates this
└── types/
    └── user.ts               ← Shared types (Complete)
```

---

## Questions?

If you run into issues, check:
1. `INTEGRATION.md` - Detailed technical docs
2. `MERGE_CHECKLIST.md` - Step-by-step merge guide
3. Comments in `app/page.tsx` - Integration points marked
4. Comments in `hooks/use-auth.ts` - Implementation guide

Good luck with the integration! 🚀
