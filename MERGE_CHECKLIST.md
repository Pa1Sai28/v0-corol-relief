# Merge Checklist - Integration Steps

Follow these steps to merge the Map/Navigation system with Signup and Chat components.

## Before You Start

- [ ] Read `INTEGRATION.md` for complete documentation
- [ ] Review `types/user.ts` for shared data structures
- [ ] Review `lib/integration-helpers.ts` for utility functions

## Step-by-Step Integration

### Step 1: Merge User Authentication

**Files to Modify:** `app/page.tsx` (lines 8-16)

- [ ] Replace mock user state with real authentication
- [ ] Import your friend's auth hook/context
- [ ] Update `username` to use authenticated user
- [ ] Update `selectedAnimal` to use user's avatar choice
- [ ] Add user profile data from signup

**Example:**
```typescript
// BEFORE (Mock):
const [username] = useState('TestUser')
const [selectedAnimal] = useState('fox')

// AFTER (Real):
const { user } = useAuth()
const username = user.username
const selectedAnimal = user.animal
```

### Step 2: Merge Chat Component

**Files to Replace:** `components/chat-session.tsx`

- [ ] Replace entire file with your friend's chat implementation
- [ ] Ensure it accepts props: `username`, `animal`, `topic`, `onBack`
- [ ] Import and use `TOPIC_INFO` from `lib/integration-helpers.ts`
- [ ] Test navigation back to map with `onBack()` callback

### Step 3: Connect User Profiles

**Files to Update:** Your friend's signup component

- [ ] Import `UserProfile` type from `types/user.ts`
- [ ] Collect all profile fields during signup:
  - username, animal, status, skills, title, company, bio, lookingFor
- [ ] Store complete profile in auth context or database
- [ ] Validate using `validateUserProfile()` from integration helpers

### Step 4: Database Integration (Optional)

If using a database:

- [ ] Add `UserProfile` schema to your database
- [ ] Store user profiles on signup
- [ ] Load profiles when rendering chat participants
- [ ] Add ability to update profiles

### Step 5: Testing

- [ ] Test signup flow → creates complete user profile
- [ ] Test map displays with authenticated user
- [ ] Test clicking each topic → enters correct chat room
- [ ] Test chat room displays topic name and icon
- [ ] Test back button → returns to map
- [ ] Test switching between different topics
- [ ] Test user profile display in chat sidebar

## Common Issues

### Issue: Props not matching
**Solution:** Check that chat component accepts exact prop names listed in `INTEGRATION.md`

### Issue: Topic not displaying correctly
**Solution:** Import and use `getTopicInfo(topicId)` from `lib/integration-helpers.ts`

### Issue: User profile incomplete
**Solution:** Ensure all required fields in `UserProfile` type are collected during signup

### Issue: Navigation not working
**Solution:** Verify `onBack` callback is called correctly, check console for errors

## File Ownership

**Map/Navigation (My Part - Complete):**
- `components/home-map.tsx` ✓
- `components/animal-avatar.tsx` ✓
- `components/animal-model.tsx` ✓
- `public/map-background.png` ✓

**Shared (Both Use):**
- `types/user.ts` ✓
- `lib/integration-helpers.ts` ✓
- `app/page.tsx` (needs integration)

**Signup/Chat (Your Friend's Part - To Replace):**
- Signup component (add to project)
- `components/chat-session.tsx` (replace stub)
- `components/message-bubble.tsx` (optional replacement)
- `components/user-profile-card.tsx` (optional replacement)

## Final Checks

- [ ] No TypeScript errors
- [ ] All imports resolve correctly
- [ ] User can complete full flow: signup → map → chat → back to map
- [ ] Console is clear of errors
- [ ] User profiles display correctly
- [ ] All 8 chat topics are accessible

## Need Help?

If you encounter issues:
1. Check console for specific error messages
2. Verify prop types match between components
3. Ensure shared types are imported from correct location
4. Test each integration point individually

## Ready to Deploy?

- [ ] All tests pass
- [ ] No console errors or warnings
- [ ] User experience is smooth
- [ ] All features work as expected
- [ ] Code is documented and clean
