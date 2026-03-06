import React from 'react';
import { Metadata } from 'next';
import InvitationClient from '@/components/InvitationClient';
import { findGuestById } from '@/lib/guestStorage';
import { GuestData, WeddingEventData } from '@/types';

// Force dynamic rendering since guest data comes from Redis and can change
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Generate metadata for each page
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ guestId: string }> 
}): Promise<Metadata> {
  const { guestId } = await params;
  
  let guestName = 'Quý khách';
  if (guestId !== 'generic') {
    try {
      const guest = await findGuestById(guestId);
      if (guest) {
        guestName = guest.name;
      }
    } catch (error) {
      console.error('[generateMetadata] Error finding guest:', error);
      // Continue with default name
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://wedding-hung-ha.vercel.app';

  return {
    title: 'Thiệp mời cưới Hưng - Hà',
    description: `Trân trọng kính mời ${guestName} tham dự lễ thành hôn`,
    openGraph: {
      title: 'Thiệp mời cưới Hưng - Hà',
      description: `Trân trọng kính mời ${guestName} tham dự lễ thành hôn`,
      type: 'website',
      locale: 'vi_VN',
      url: `${baseUrl}/invitation/${guestId}`,
      siteName: 'Thiệp mời cưới Hưng - Hà',
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Thiệp mời cưới Khánh Hưng - Đinh Hà',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Thiệp mời cưới Hưng - Hà',
      description: `Trân trọng kính mời ${guestName} tham dự lễ thành hôn`,
      images: [`${baseUrl}/og-image.jpg`],
    },
  };
}

// Wedding event data constants
const groomEventData: WeddingEventData = {
  groomName: 'Khánh Hưng',
  brideName: 'Đinh Hà',
  tieCuoiDate: '21/03/2026',
  tieCuoiTime: 'Lúc 16h:00, Thứ bảy',
  tieCuoiLunarDate: '(Tức ngày 3, tháng 2 năm Bính Ngọ)',
  tieCuoiLocation: 'Thôn Mạnh Tiến 1, xã Lạc Thủy',
  tieCuoiProvince: 'Tỉnh Hòa Bình',
  thanhHonDate: '22/03/2026',
  thanhHonTime: 'Lúc 10h:00, Chủ Nhật',
  thanhHonLunarDate: '(Tức ngày 4, tháng 2 năm Bính Ngọ)',
  thanhHonLocation: 'Thôn Mạnh Tiến 1, xã Lạc Thủy',
  thanhHonProvince: 'Tỉnh Hòa Bình',
};

const brideEventData: WeddingEventData = {
  groomName: 'Khánh Hưng',
  brideName: 'Đinh Hà',
  tieCuoiDate: '21/03/2026',
  tieCuoiTime: 'Lúc 16h:30, Thứ bảy',
  tieCuoiLunarDate: '(Tức ngày 3, tháng 2 năm Bính Ngọ)',
  tieCuoiLocation: 'Tổ dân phố số 3, Phường Lý Thường Kiệt',
  tieCuoiProvince: 'Tỉnh Ninh Bình',
  thanhHonDate: '22/03/2026',
  thanhHonTime: 'Lúc 08h:30, Chủ Nhật',
  thanhHonLunarDate: '(Tức ngày 4, tháng 2 năm Bính Ngọ)',
  thanhHonLocation: 'Tổ dân phố số 3, Phường Lý Thường Kiệt',
  thanhHonProvince: 'Tỉnh Ninh Bình',
};

export default async function InvitationPage({ 
  params 
}: { 
  params: Promise<{ guestId: string }> 
}) {
  const { guestId } = await params;
  
  console.log('[InvitationPage] Loading page for guestId:', guestId);
  
  // Fetch guest data from storage
  let guestData: GuestData;
  
  try {
    if (guestId === 'generic') {
      guestData = {
        id: 'generic',
        name: 'generic',
        guestType: 'groom',
      };
    } else {
      const guest = await findGuestById(guestId);
      
      if (guest) {
        console.log('[InvitationPage] Found guest:', guest.name);
        guestData = guest;
      } else {
        console.log('[InvitationPage] Guest not found, using fallback');
        // Fallback for guests not in the list (SSR)
        guestData = {
          id: guestId,
          name: 'Quý khách',
          guestType: guestId.includes('groom') ? 'groom' : 'bride',
        };
      }
    }
  } catch (error) {
    console.error('[InvitationPage] Error loading guest data:', error);
    // Fallback on error
    guestData = {
      id: guestId,
      name: 'Quý khách',
      guestType: 'groom',
    };
  }

  return (
    <InvitationClient
      guestData={guestData}
      groomEventData={groomEventData}
      brideEventData={brideEventData}
    />
  );
}
