# Setup Upstash Redis for Data Persistence

## ⚠️ Current Status

**Temporary Solution Active**: App currently uses `/tmp` directory on Vercel
- ✅ Works for testing
- ⚠️ Data will be lost when serverless function cold-starts (after ~15 minutes of inactivity)
- 🔄 Guest data resets periodically

**Recommended**: Migrate to Upstash Redis for permanent storage

---

## 🚀 Setup Upstash Redis (5 minutes)

### Step 1: Create Upstash Database

1. **Visit Vercel Dashboard**: https://vercel.com/dashboard
2. Click your project: **hung-ha-wedding-invitation**
3. Go to **Storage** tab
4. Click **Create Database**
5. Select **KV** (Key-Value / Redis)
6. Choose **Upstash** provider
7. Name: `wedding-guests-db`
8. Region: Choose closest to your users (e.g., Singapore for Vietnam)
9. Click **Create**

### Step 2: Environment Variables (Auto-configured)

Vercel automatically adds these to your project:
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `KV_REST_API_READ_ONLY_TOKEN`

Verify in: **Settings** → **Environment Variables**

### Step 3: Install Upstash Redis SDK

```bash
npm install @upstash/redis
```

### Step 4: Update guestStorage.ts

Replace content of `lib/guestStorage.ts` with:

```typescript
import { Redis } from '@upstash/redis';

export interface Guest {
  id: string;
  name: string;
  guestType: 'groom' | 'bride';
  createdAt: string;
}

// Initialize Redis client
// Falls back to in-memory storage if Redis not configured (for local dev)
let redis: Redis | null = null;

try {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    redis = new Redis({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    });
    console.log('[Redis] Connected successfully');
  } else {
    console.log('[Redis] No credentials found, using in-memory fallback');
  }
} catch (error) {
  console.error('[Redis] Connection error:', error);
}

const GUESTS_KEY = 'wedding:guests';

// In-memory fallback for local development
let memoryStore: Guest[] = [];

// Read guests
export async function readGuests(): Promise<Guest[]> {
  try {
    if (redis) {
      console.log('[readGuests] Reading from Redis...');
      const data = await redis.get<Guest[]>(GUESTS_KEY);
      const guests = data || [];
      console.log(`[readGuests] Found ${guests.length} guests in Redis`);
      return guests;
    } else {
      console.log(`[readGuests] Using memory store: ${memoryStore.length} guests`);
      return memoryStore;
    }
  } catch (error) {
    console.error('[readGuests] Error:', error);
    return memoryStore;
  }
}

// Write guests
export async function writeGuests(guests: Guest[]): Promise<boolean> {
  try {
    console.log(`[writeGuests] Writing ${guests.length} guests...`);
    if (redis) {
      await redis.set(GUESTS_KEY, guests);
      console.log('[writeGuests] Successfully wrote to Redis');
      return true;
    } else {
      memoryStore = guests;
      console.log('[writeGuests] Wrote to memory store');
      return true;
    }
  } catch (error) {
    console.error('[writeGuests] Error:', error);
    return false;
  }
}

// Add a guest
export async function addGuest(guest: Guest): Promise<boolean> {
  console.log('[addGuest] Adding new guest:', guest);
  const guests = await readGuests();
  guests.push(guest);
  const result = await writeGuests(guests);
  console.log('[addGuest] Result:', result ? 'SUCCESS' : 'FAILED');
  return result;
}

// Delete a guest
export async function deleteGuest(id: string): Promise<boolean> {
  console.log('[deleteGuest] Deleting guest with ID:', id);
  const guests = await readGuests();
  const filteredGuests = guests.filter(g => g.id !== id);
  console.log(`[deleteGuest] Removed ${guests.length - filteredGuests.length} guest(s)`);
  return await writeGuests(filteredGuests);
}

// Find a guest by ID
export async function findGuestById(id: string): Promise<Guest | null> {
  const guests = await readGuests();
  return guests.find(g => g.id === id) || null;
}
```

### Step 5: Update API Routes to Async

Since storage is now async, update routes:

**app/api/admin/guests/route.ts** - Change all functions to async:
```typescript
export async function GET(request: Request) {
  // ... auth code ...
  const guests = await readGuests(); // Add await
  return NextResponse.json({ success: true, guests });
}

export async function POST(request: Request) {
  // ... auth and create guest code ...
  const addResult = await addGuest(newGuest); // Add await
  // ... rest of code ...
}

export async function DELETE(request: Request) {
  // ... auth code ...
  const deleteResult = await deleteGuest(id); // Add await
  // ... rest of code ...
}
```

**app/api/guest/[id]/route.ts** - Add await:
```typescript
const guest = await findGuestById(id); // Add await
```

### Step 6: Deploy

```bash
git add -A
git commit -m "feat: Migrate to Upstash Redis for data persistence"
git push
```

Vercel will auto-deploy in ~1 minute.

### Step 7: Test

1. Create test guests in admin panel
2. Wait 30 minutes (let function cold-start)
3. Refresh admin panel
4. ✅ Guests should still be there!

---

## 🧪 Local Development

For local dev without Redis:
- App automatically uses in-memory storage
- Data resets when you restart server
- This is fine for development

To test with Redis locally:
```bash
# Add to .env.local
KV_REST_API_URL=https://your-redis-url.upstash.io
KV_REST_API_TOKEN=your-token
```

Get values from Vercel: **Storage** → **Your KV** → **Settings**

---

## 📊 Upstash Free Tier Limits

- ✅ 10,000 commands/day
- ✅ 256 MB storage
- ✅ TLS support
- ✅ Global replication

**For wedding app:** More than enough for 1000+ guests!

---

## 🔄 Migration Notes

### Current Data
If you already created guests with `/tmp` storage:
- They will be lost after cold-start
- Create them again after Redis setup
- Or export data first (add export feature if needed)

### Rollback
To rollback to file storage (not recommended):
```bash
git checkout HEAD~1 lib/guestStorage.ts
git commit -m "rollback: Revert to file storage"
git push
```

---

## ❓ FAQ

**Q: Do I need a credit card?**
A: No, Upstash free tier requires no payment info

**Q: Will data really persist?**
A: Yes! Redis is a proper database, not temporary storage

**Q: What if I exceed free tier?**
A: Upstash will email you. But 10k commands = ~2000 guest operations/day

**Q: Can I use other databases?**
A: Yes! MongoDB Atlas, PlanetScale, Supabase all work. Redis is just easiest for this use case.

---

## 🎯 Summary

**Current**: `/tmp` storage (temporary, for testing)
**Next**: Upstash Redis (permanent, 5 min setup)
**Benefit**: Guests won't disappear! 🎉
