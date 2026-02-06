# Quick Start Guide for Your Friend 👋

Hey! Thanks for working on the login/signup and chat features. Here's everything you need to get started.

---

## 🚀 Getting Started (5 minutes)

### 1. Clone the Repository
```bash
git clone <repo-url-here>
cd coral-reef
npm install
```

### 2. Run the App
```bash
npm run dev
# Open http://localhost:3000
```

You'll see a placeholder message where your signup/login should go.

---

## 📋 What You Need to Build

### Part 1: Authentication System ✅

**Create these files:**
- `app/signup/page.tsx` - Signup page
- `app/login/page.tsx` - Login page
- `components/signup-form.tsx` - Signup form with animal selection
- `components/login-form.tsx` - Login form
- `lib/auth.ts` - Your auth utilities

**Modify this file:**
- `hooks/use-auth.ts` - Replace mock code with real authentication

**Requirements:**
- User must enter username
- User must choose an animal (rabbit, fox, bear, wolf, owl, deer)
- Store user data (localStorage, database, your choice)
- Return user object in this format:
```typescript
{
  id: string
  username: string
  animal: string  // 'fox', 'bear', etc.
  status: 'available' | 'hiring' | 'looking-for-work' | 'mentoring'
  skills: string[]
  title?: string
  company?: string
}
```

### Part 2: Chat Room 💬

**Create these files:**
- `components/chat-room.tsx` - Main chat component (replaces chat-session.tsx)
- Any other components you need for chat

**Your chat component receives:**
```typescript
interface ChatRoomProps {
  username: string    // Current user's name
  animal: string      // Current user's animal ('fox', 'bear', etc.)
  topic: string       // Which chat room ('tech-hub', 'design-studio', etc.)
  onBack: () => void  // Call this to return to the map
}
```

**Chat Topics Available:**
- tech-hub - Tech & Software Development
- design-studio - UI/UX & Design
- business-plaza - Business & Marketing
- healthcare - Medical & Healthcare
- education - Teaching & Education
- finance - Finance & Accounting
- coffee-lounge - Casual Chat
- gaming-zone - Gaming & Entertainment

---

## 🔌 Integration Points

### Point 1: Connect Your Signup to the Map

**In `app/page.tsx`, replace lines 42-66:**
```typescript
// REPLACE THIS:
if (!isAuthenticated || !user) {
  return (
    <div>...placeholder message...</div>
  )
}

// WITH YOUR COMPONENT:
if (!isAuthenticated || !user) {
  return <SignupPage />  // or <LoginPage /> with routing
}
```

### Point 2: Connect Your Chat to the Map

**In `app/page.tsx`, line 77:**
```typescript
// REPLACE ChatSession with your ChatRoom component:
import ChatRoom from '@/components/chat-room'

if (step === 'chat') {
  return (
    <ChatRoom
      username={user.username}
      animal={user.animal}
      topic={selectedTopic}
      onBack={() => setStep('home')}
    />
  )
}
```

---

## 🧪 Testing Your Work

1. **Test Signup:**
   - Open app → Should see your signup page
   - Create account with username + animal
   - After signup → Should see the Coral Reef map

2. **Test Login:**
   - Logout
   - Open app → Should see your login page
   - Login with credentials
   - Should see the Coral Reef map

3. **Test Chat:**
   - Click any location on the map
   - Your chat room should open
   - Test sending messages
   - Click "Back to Map" → Should return to map

---

## 📁 Files You'll Create

```
Your new files:
├── app/
│   ├── signup/page.tsx       ← You create
│   └── login/page.tsx        ← You create
├── components/
│   ├── signup-form.tsx       ← You create
│   ├── login-form.tsx        ← You create
│   └── chat-room.tsx         ← You create (replaces chat-session)
└── lib/
    └── auth.ts               ← You create
```

## 📁 Files You'll Modify

```
Existing files to update:
├── hooks/
│   └── use-auth.ts           ← Replace mock with real auth
└── app/
    └── page.tsx              ← Add your components (2 places)
```

## 📁 Files You DON'T Touch

```
Leave these alone (already complete):
├── components/
│   └── home-map.tsx          ← Map component (complete)
├── types/
│   └── user.ts               ← User types (read-only)
└── lib/
    └── integration-helpers.ts ← Utilities (read-only)
```

---

## 💡 Tips

1. **Read these docs first:**
   - `HOW_TO_CONNECT.md` - Detailed integration guide
   - `INTEGRATION.md` - All data structures and APIs
   - `types/user.ts` - User data structure

2. **Use the provided types:**
   ```typescript
   import { UserProfile } from '@/types/user'
   ```

3. **Available chat topics:**
   ```typescript
   import { TOPICS, ANIMALS } from '@/lib/integration-helpers'
   ```

4. **Test often:**
   - Test signup → map transition
   - Test login → map transition
   - Test map → chat → map flow

---

## 🐛 Common Issues

**Issue:** Type errors about UserProfile
- **Fix:** Make sure your user object matches the UserProfile interface in `types/user.ts`

**Issue:** Map doesn't show after login
- **Fix:** Check that useAuth() returns `isAuthenticated: true` and a valid user object

**Issue:** Chat doesn't receive props
- **Fix:** Check your ChatRoom component accepts username, animal, topic, and onBack props

---

## 🤝 Collaboration

### Create a Branch
```bash
git checkout -b feature/auth-system
# Do your work
git add .
git commit -m "feat: add signup and login"
git push origin feature/auth-system
```

### Create a Pull Request
1. Go to GitHub repo
2. Click "Pull Requests" → "New"
3. Select your branch
4. Add description
5. Create PR

---

## ✅ Definition of Done

Your work is complete when:

- [ ] User can sign up with username and animal
- [ ] User can log in
- [ ] After auth, Coral Reef map appears
- [ ] User info displays correctly on map
- [ ] Clicking any map location opens your chat
- [ ] Chat works for sending/receiving messages
- [ ] Chat shows user profiles with badges
- [ ] Back button returns to map
- [ ] Logout works
- [ ] No TypeScript errors
- [ ] No console errors in browser

---

## 📞 Need Help?

Check these files:
- `HOW_TO_CONNECT.md` - Step-by-step connection guide
- `INTEGRATION.md` - Technical specs
- `GIT_COLLABORATION.md` - Git workflow

Or ask your teammate! Good luck! 🎉
