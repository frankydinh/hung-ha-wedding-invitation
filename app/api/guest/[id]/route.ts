import { NextResponse } from 'next/server';
import { findGuestById } from '@/lib/guestStorage';

// Get guest by ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  const guest = await findGuestById(id);
  
  if (!guest) {
    return NextResponse.json(
      { success: false, message: 'Guest not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json({ success: true, guest });
}
