import { Redis } from '@upstash/redis';

export interface Guest {
  id: string;
  name: string;
  guestType: 'groom' | 'bride';
  createdAt: string;
}

// Initialize Redis client
// Falls back to in-memory storage if Redis not configured (for local dev without Redis)
let redis: Redis | null = null;

try {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    redis = new Redis({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    });
    console.log('[Redis] Connected successfully to:', process.env.KV_REST_API_URL);
  } else {
    console.log('[Redis] No credentials found, using in-memory fallback');
  }
} catch (error) {
  console.error('[Redis] Connection error:', error);
}

const GUESTS_KEY = 'wedding:guests';

// In-memory fallback for local development without Redis
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
      return [...memoryStore]; // Return copy to prevent mutations
    }
  } catch (error) {
    console.error('[readGuests] Error:', error);
    // Always return a valid array, never throw
    return [...memoryStore];
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
  try {
    console.log('[findGuestById] Searching for guest:', id);
    const guests = await readGuests();
    const guest = guests.find(g => g.id === id) || null;
    console.log('[findGuestById] Result:', guest ? 'FOUND' : 'NOT FOUND');
    return guest;
  } catch (error) {
    console.error('[findGuestById] Error:', error);
    // Return null on error instead of throwing
    return null;
  }
}
