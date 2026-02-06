# Git Collaboration Guide - Coral Reef Project

## Overview
This guide explains how to collaborate on the Coral Reef project. One developer (you) has built the **Home Map & Topic Selection**, and your friend is building the **Login/Signup & Chat features**.

---

## Repository Setup

### 1. Share Your Repository

**Option A: Add Friend as Collaborator (Recommended)**
```bash
# On GitHub:
# 1. Go to your repo Settings → Collaborators
# 2. Click "Add people"
# 3. Enter your friend's GitHub username
# 4. They'll receive an invitation email
```

**Option B: Fork and Pull Request**
```bash
# Your friend forks your repo and submits PRs
# Good for open-source style collaboration
```

---

## Workflow for Your Friend

### Step 1: Clone Your Repository
```bash
# Your friend runs this on their machine
git clone <your-repo-url>
cd <repo-name>

# Install dependencies
npm install
```

### Step 2: Create a Feature Branch
```bash
# Your friend creates their own branch
git checkout -b feature/auth-system

# OR for multiple features:
git checkout -b feature/signup-login
git checkout -b feature/chat-room
```

### Step 3: Identify Integration Files

**Files Your Friend WILL MODIFY:**
- `hooks/use-auth.ts` - Replace mock with real auth logic
- `app/page.tsx` - Replace the !isAuthenticated placeholder with their signup/login component
- `components/chat-session.tsx` - Replace entire file with their chat implementation

**Files Your Friend SHOULD NOT TOUCH:**
- `components/home-map.tsx` - Your map component (complete)
- `types/user.ts` - Shared types (only modify if adding new fields)
- `lib/integration-helpers.ts` - Shared utilities

**Files Your Friend WILL CREATE:**
- `app/signup/page.tsx` - Their signup page
- `app/login/page.tsx` - Their login page  
- `components/signup-form.tsx` - Their signup form
- `components/login-form.tsx` - Their login form
- `lib/auth.ts` or similar - Their auth utilities
- Any chat-related components they need

---

## Step-by-Step Integration Process

### Phase 1: Your Friend Implements Auth (Signup/Login)

```bash
# Friend's work
git checkout -b feature/auth-system

# Create their auth files
# - app/signup/page.tsx
# - app/login/page.tsx
# - components/signup-form.tsx
# - components/login-form.tsx
# - lib/auth.ts
```

**In `hooks/use-auth.ts`:**
```typescript
// Your friend replaces the mock implementation with real auth
export function useAuth() {
  // Their real implementation here
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Check if user is logged in (localStorage, cookies, etc.)
    const checkAuth = async () => {
      // Their auth checking logic
      setIsLoading(false)
    }
    checkAuth()
  }, [])
  
  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login: async (credentials) => { /* their logic */ },
    logout: () => { /* their logic */ },
    signup: async (data) => { /* their logic */ }
  }
}
```

**In `app/page.tsx`:**
```typescript
// Your friend replaces this section (lines 42-66):
if (!isAuthenticated || !user) {
  // REPLACE THIS ENTIRE BLOCK with:
  return <SignupPage /> // or <LoginPage /> with routing
}
```

**Commit and Push:**
```bash
git add .
git commit -m "feat: add signup and login system"
git push origin feature/auth-system
```

---

### Phase 2: Your Friend Implements Chat

```bash
# Friend's work
git checkout -b feature/chat-room

# Create their chat files
# - components/chat-room.tsx (replaces chat-session.tsx)
# - components/message-list.tsx
# - components/message-input.tsx
# - lib/chat-helpers.ts
```

**In `app/page.tsx`:**
```typescript
// Your friend imports their chat component
import ChatRoom from '@/components/chat-room'

// Then in the chat section (line 79):
if (step === 'chat') {
  return (
    <ChatRoom  // Their component instead of ChatSession
      username={user.username}
      animal={user.animal}
      topic={selectedTopic}
      onBack={() => setStep('home')}
    />
  )
}
```

**Commit and Push:**
```bash
git add .
git commit -m "feat: add real-time chat room functionality"
git push origin feature/chat-room
```

---

## Merging the Work Together

### Option 1: Pull Request Workflow (Recommended)

**Your Friend:**
```bash
# After pushing their branch
# 1. Go to GitHub repo
# 2. Click "Pull Requests" → "New Pull Request"
# 3. Select their feature branch
# 4. Add description of changes
# 5. Click "Create Pull Request"
```

**You:**
```bash
# Review the PR on GitHub
# 1. Check the changes in the "Files changed" tab
# 2. Add comments or request changes if needed
# 3. Once satisfied, click "Merge Pull Request"
# 4. Pull the changes to your local machine
git checkout main
git pull origin main
```

### Option 2: Direct Merge (If friend is collaborator)

**Your Friend:**
```bash
# Merge their branch into main
git checkout main
git pull origin main  # Get latest changes
git merge feature/auth-system
git push origin main

# Later, merge chat feature
git merge feature/chat-room
git push origin main
```

---

## Handling Conflicts

If you both edit the same file, Git will show conflicts:

```bash
# When pulling/merging
git pull origin main
# CONFLICT in app/page.tsx

# Open the file and look for conflict markers:
<<<<<<< HEAD
// Your code
=======
// Friend's code
>>>>>>> feature/auth-system

# Edit the file to keep the right version
# Then:
git add app/page.tsx
git commit -m "fix: resolve merge conflict in page.tsx"
git push origin main
```

---

## Testing Before Merging

**Your Friend Should Test:**
1. User can sign up with animal selection
2. User can log in
3. After login, the Coral Reef map appears
4. Clicking a map location opens their chat
5. Chat works properly
6. Logging out returns to login page

**Testing Checklist:**
```bash
# Run the app locally
npm run dev

# Test flow:
✓ Open http://localhost:3000
✓ Should see signup/login (not the map)
✓ Complete signup with username and animal
✓ Should redirect to Coral Reef map
✓ Click any chat room location
✓ Chat should load and work
✓ Click "Back to Map" - returns to map
✓ Click logout - returns to login
```

---

## File Ownership Summary

| Component | Owner | Status |
|-----------|-------|--------|
| Home Map (topic selection) | You | ✅ Complete |
| User Types (`types/user.ts`) | Shared | ⚠️ Both can modify |
| Integration Helpers | Shared | ⚠️ Both can modify |
| Auth Hook (`use-auth.ts`) | Friend | 🚧 Friend implements |
| Signup/Login Pages | Friend | 🚧 Friend creates |
| Chat Component | Friend | 🚧 Friend creates |
| Main Page (`app/page.tsx`) | Both | ⚠️ Integration point |

---

## Communication Tips

**Before Starting:**
- [ ] Friend reviews `INTEGRATION.md` and `HOW_TO_CONNECT.md`
- [ ] Friend understands the UserProfile interface
- [ ] Friend knows available chat topics from `lib/integration-helpers.ts`
- [ ] Agree on branch naming convention

**During Development:**
- Communicate which files you're working on
- Push changes frequently to avoid large conflicts
- Test the integration points early
- Use GitHub Issues to track tasks

**Example GitHub Issues:**
```
Issue #1: Implement user authentication (signup/login)
Issue #2: Create chat room component
Issue #3: Connect auth to home map
Issue #4: Test full user flow
```

---

## Quick Reference Commands

```bash
# Your friend clones repo
git clone <repo-url>
cd <repo-name>
npm install

# Create feature branch
git checkout -b feature/their-feature

# Make changes, then:
git add .
git commit -m "feat: description of changes"
git push origin feature/their-feature

# Keep branch updated with main
git checkout main
git pull origin main
git checkout feature/their-feature
git merge main

# When done, create Pull Request on GitHub
```

---

## What Happens After Integration?

Once both parts are merged, the app flow will be:

```
User visits app
    ↓
Not logged in? → Friend's Signup/Login Page
    ↓
Sign up & choose animal
    ↓
Logged in → Your Home Map (Coral Reef)
    ↓
Click chat room → Friend's Chat Component
    ↓
Chat with users
    ↓
Back button → Your Home Map
    ↓
Logout → Friend's Login Page
```

---

## Need Help?

If you run into issues:

1. **Merge Conflicts:** Check which lines conflict and decide which version to keep
2. **Integration Issues:** Review `HOW_TO_CONNECT.md` for the data flow
3. **Type Errors:** Make sure both are using the same UserProfile interface
4. **Component Not Found:** Check import paths match the file structure

**Useful Commands:**
```bash
# See what changed
git status
git diff

# Undo local changes
git checkout -- filename

# See commit history
git log --oneline

# Create new branch from current state
git checkout -b backup-branch
```

---

## Success Checklist

Before considering the project complete:

- [ ] User can signup with username and animal selection
- [ ] User can login with credentials
- [ ] After auth, Coral Reef map displays correctly
- [ ] All 8 chat topics are clickable
- [ ] Clicking a topic opens the chat room
- [ ] Chat displays user profiles with status badges
- [ ] Messages can be sent and received
- [ ] Back button returns to map
- [ ] User data persists on refresh
- [ ] Logout works correctly
- [ ] No console errors in browser
- [ ] TypeScript compiles without errors

---

## Repository Structure After Integration

```
coral-reef/
├── app/
│   ├── page.tsx              # Main router (both touch)
│   ├── layout.tsx            # App layout
│   ├── signup/
│   │   └── page.tsx          # Friend creates
│   └── login/
│       └── page.tsx          # Friend creates
├── components/
│   ├── home-map.tsx          # Your work (complete)
│   ├── chat-room.tsx         # Friend creates
│   ├── signup-form.tsx       # Friend creates
│   ├── login-form.tsx        # Friend creates
│   └── ui/                   # Shared UI components
├── hooks/
│   └── use-auth.ts           # Friend implements
├── types/
│   └── user.ts               # Shared (both may modify)
├── lib/
│   ├── integration-helpers.ts # Shared utilities
│   └── auth.ts               # Friend creates
└── public/
    └── map-background.png    # Your map image
```

Good luck with the collaboration!
