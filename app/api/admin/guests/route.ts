import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { readGuests, addGuest, deleteGuest, Guest } from '@/lib/guestStorage';

export async function GET(request: Request) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const guests = readGuests();
  return NextResponse.json({ success: true, guests });
}

export async function POST(request: Request) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { name, guestType } = await request.json();
    
    const newGuest: Guest = {
      id: `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      guestType,
      createdAt: new Date().toISOString(),
    };

    addGuest(newGuest);

    const guestLink = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/invitation/${newGuest.id}`;

    return NextResponse.json({ 
      success: true, 
      guest: newGuest,
      link: guestLink 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Error creating guest' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Guest ID required' }, { status: 400 });
    }

    deleteGuest(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Error deleting guest' },
      { status: 500 }
    );
  }
}
