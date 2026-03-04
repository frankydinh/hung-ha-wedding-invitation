import { generateAdminToken } from '@/lib/adminAuth';
import { redirect } from 'next/navigation';

export default function AdminRedirect() {
  const token = generateAdminToken();
  redirect(`/admin/${token}`);
}
