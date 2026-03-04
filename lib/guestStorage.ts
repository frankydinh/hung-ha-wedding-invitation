import fs from 'fs';
import path from 'path';

export interface Guest {
  id: string;
  name: string;
  guestType: 'groom' | 'bride';
  createdAt: string;
}

const GUESTS_FILE_PATH = path.join(process.cwd(), 'data', 'guests.json');

// Ensure data directory exists
function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data');
  console.log('[guestStorage] Checking data directory:', dataDir);
  if (!fs.existsSync(dataDir)) {
    console.log('[guestStorage] Creating data directory...');
    fs.mkdirSync(dataDir, { recursive: true });
    console.log('[guestStorage] Data directory created successfully');
  } else {
    console.log('[guestStorage] Data directory exists');
  }
}

// Read guests from file
export function readGuests(): Guest[] {
  try {
    console.log('[readGuests] Reading from:', GUESTS_FILE_PATH);
    ensureDataDirectory();
    if (!fs.existsSync(GUESTS_FILE_PATH)) {
      console.log('[readGuests] File not found, creating empty file');
      fs.writeFileSync(GUESTS_FILE_PATH, JSON.stringify([], null, 2));
      console.log('[readGuests] Empty file created');
      return [];
    }
    const fileContent = fs.readFileSync(GUESTS_FILE_PATH, 'utf-8');
    const guests = JSON.parse(fileContent);
    console.log(`[readGuests] Successfully read ${guests.length} guests`);
    return guests;
  } catch (error) {
    console.error('[readGuests] Error reading guests file:', error);
    return [];
  }
}

// Write guests to file
export function writeGuests(guests: Guest[]): boolean {
  try {
    console.log(`[writeGuests] Writing ${guests.length} guests to:`, GUESTS_FILE_PATH);
    ensureDataDirectory();
    fs.writeFileSync(GUESTS_FILE_PATH, JSON.stringify(guests, null, 2));
    console.log('[writeGuests] Write successful');
    return true;
  } catch (error) {
    console.error('[writeGuests] Error writing guests file:', error);
    return false;
  }
}

// Add a guest
export function addGuest(guest: Guest): boolean {
  console.log('[addGuest] Adding new guest:', guest);
  const guests = readGuests();
  guests.push(guest);
  const result = writeGuests(guests);
  console.log('[addGuest] Result:', result ? 'SUCCESS' : 'FAILED');
  return result;
}

// Delete a guest
export function deleteGuest(id: string): boolean {
  console.log('[deleteGuest] Deleting guest with ID:', id);
  const guests = readGuests();
  const filteredGuests = guests.filter(g => g.id !== id);
  console.log(`[deleteGuest] Removed ${guests.length - filteredGuests.length} guest(s)`);
  return writeGuests(filteredGuests);
}

// Find a guest by ID
export function findGuestById(id: string): Guest | null {
  const guests = readGuests();
  return guests.find(g => g.id === id) || null;
}
