import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const SECRET_KEY = process.env.JWT_SECRET || 'wedding-secret-key-2026';
const VALID_PIN = '0310';
const VALID_PHONE = '0985722893';

export async function POST(request: Request) {
  try {
    const { pin, phoneNumber } = await request.json();

    if (pin === VALID_PIN && phoneNumber === VALID_PHONE) {
      const token = jwt.sign(
        { authorized: true, timestamp: Date.now() },
        SECRET_KEY,
        { expiresIn: '24h' }
      );

      return NextResponse.json({ 
        success: true, 
        token 
      });
    }

    return NextResponse.json(
      { success: false, message: 'Mã PIN hoặc số điện thoại không đúng' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Lỗi xác thực' },
      { status: 500 }
    );
  }
}
