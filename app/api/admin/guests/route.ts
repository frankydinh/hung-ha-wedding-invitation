import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { readGuests, addGuest, deleteGuest, Guest } from '@/lib/guestStorage';

export async function GET(request: Request) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!token || !verifyToken(token)) {
    console.log('[GET /api/admin/guests] Unauthorized request');
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  console.log('[GET /api/admin/guests] Fetching guests...');
  const guests = await readGuests();
  console.log(`[GET /api/admin/guests] Returning ${guests.length} guests`);
  return NextResponse.json({ success: true, guests });
}

export async function POST(request: Request) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!token || !verifyToken(token)) {
    console.log('[POST /api/admin/guests] Unauthorized request');
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    console.log('[POST /api/admin/guests] Request body:', body);
    
    const { name, guestType } = body;
    
    const newGuest: Guest = {
      id: `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      guestType,
      createdAt: new Date().toISOString(),
    };
    
    console.log('[POST /api/admin/guests] Created guest object:', newGuest);

    const addResult = await addGuest(newGuest);
    console.log('[POST /api/admin/guests] addGuest result:', addResult);
    
    if (!addResult) {
      console.error('[POST /api/admin/guests] Failed to add guest to storage');
      return NextResponse.json(
        { success: false, message: 'Failed to save guest to storage' },
        { status: 500 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    console.log('[POST /api/admin/guests] Base URL:', baseUrl);
    
    const guestLink = `${baseUrl}/invitation/${newGuest.id}`;
    console.log('[POST /api/admin/guests] Generated link:', guestLink);

    return NextResponse.json({ 
      success: true, 
      guest: newGuest,
      link: guestLink 
    });
  } catch (error) {
    console.error('[POST /api/admin/guests] Error:', error);
    return NextResponse.json(
      { success: false, message: 'Error creating guest', error: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!token || !verifyToken(token)) {
    console.log('[DELETE /api/admin/guests] Unauthorized request');
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    console.log('[DELETE /api/admin/guests] Guest ID:', id);

    if (!id) {
      console.log('[DELETE /api/admin/guests] No ID provided');
      return NextResponse.json({ success: false, message: 'Guest ID required' }, { status: 400 });
    }

    const deleteResult = await deleteGuest(id);
    console.log('[DELETE /api/admin/guests] Delete result:', deleteResult);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[DELETE /api/admin/guests] Error:', error);
    return NextResponse.json(
      { success: false, message: 'Error deleting guest', error: String(error) },
      { status: 500 }
    );
  }
}
