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
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Read guests from file
export function readGuests(): Guest[] {
  try {
    ensureDataDirectory();
    if (!fs.existsSync(GUESTS_FILE_PATH)) {
      fs.writeFileSync(GUESTS_FILE_PATH, JSON.stringify([], null, 2));
      return [];
    }
    const fileContent = fs.readFileSync(GUESTS_FILE_PATH, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading guests file:', error);
    return [];
  }
}

// Write guests to file
export function writeGuests(guests: Guest[]): boolean {
  try {
    ensureDataDirectory();
    fs.writeFileSync(GUESTS_FILE_PATH, JSON.stringify(guests, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing guests file:', error);
    return false;
  }
}

// Add a guest
export function addGuest(guest: Guest): boolean {
  const guests = readGuests();
  guests.push(guest);
  return writeGuests(guests);
}

// Delete a guest
export function deleteGuest(id: string): boolean {
  const guests = readGuests();
  const filteredGuests = guests.filter(g => g.id !== id);
  return writeGuests(filteredGuests);
}

// Find a guest by ID
export function findGuestById(id: string): Guest | null {
  const guests = readGuests();
  return guests.find(g => g.id === id) || null;
}
