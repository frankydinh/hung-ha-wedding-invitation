import crypto from 'crypto';

const ADMIN_PHONE = '0985722893';
const ADMIN_PIN = '0310';

// Generate admin access token from phone + pin
export function generateAdminToken(): string {
  const combined = ADMIN_PHONE + ADMIN_PIN;
  // Use simple base64 encoding for the token
  return Buffer.from(combined).toString('base64').replace(/=/g, '');
}

// Verify admin token
export function verifyAdminToken(token: string): boolean {
  const expectedToken = generateAdminToken();
  return token === expectedToken;
}

// Get expected admin credentials (for backward compatibility with auth route)
export function getAdminCredentials() {
  return {
    phone: ADMIN_PHONE,
    pin: ADMIN_PIN,
  };
}
