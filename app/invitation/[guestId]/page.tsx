import React from 'react';
import { Metadata } from 'next';
import InvitationClient from '@/components/InvitationClient';
import { findGuestById, readGuests } from '@/lib/guestStorage';
import { GuestData, WeddingEventData } from '@/types';

// Enable static generation for known guests, allow SSR for unknown ones
export const dynamicParams = true;

// Generate static pages for all guests in the list
export async function generateStaticParams() {
  try {
    const guests = await readGuests();
    
    // Include 'generic' for the default invitation
    const params = [
      { guestId: 'generic' },
      ...guests.map((guest) => ({
        guestId: guest.id,
      })),
    ];
    
    return params;
  } catch (error) {
    console.error('Error generating static params:', error);
    return [{ guestId: 'generic' }];
  }
}

// Generate metadata for each page
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ guestId: string }> 
}): Promise<Metadata> {
  const { guestId } = await params;
  
  let guestName = 'Quý khách';
  if (guestId !== 'generic') {
    const guest = await findGuestById(guestId);
    if (guest) {
      guestName = guest.name;
    }
  }

  return {
    title: 'Thiệp mời cưới Hưng - Hà',
    description: `Trân trọng kính mời ${guestName} tham dự lễ thành hôn`,
    openGraph: {
      title: 'Thiệp mời cưới Hưng - Hà',
      description: `Trân trọng kính mời ${guestName} tham dự lễ thành hôn`,
    },
  };
}

// Wedding event data constants
const groomEventData: WeddingEventData = {
  groomName: 'Khánh Hưng',
  brideName: 'Đinh Hà',
  tieCuoiDate: '21/03/2026',
  tieCuoiTime: 'Lúc 16h, Thứ bảy',
  tieCuoiLunarDate: '(Tức ngày 3, tháng 2 năm Bính Ngọ)',
  tieCuoiLocation: 'Thôn Mạnh Tiến 1, xã Lạc Thủy',
  tieCuoiProvince: 'Tỉnh Hòa Bình',
  thanhHonDate: '22/03/2026',
  thanhHonTime: 'Lúc 10:00, Chủ Nhật',
  thanhHonLunarDate: '(Tức ngày 4, tháng 2 năm Bính Ngọ)',
  thanhHonLocation: 'Thôn Mạnh Tiến 1, xã Lạc Thủy',
  thanhHonProvince: 'Tỉnh Hòa Bình',
};

const brideEventData: WeddingEventData = {
  groomName: 'Khánh Hưng',
  brideName: 'Đinh Hà',
  tieCuoiDate: '21/03/2026',
  tieCuoiTime: 'Lúc 17:00, Thứ bảy',
  tieCuoiLunarDate: '(Tức ngày 3, tháng 2 năm Bính Ngọ)',
  tieCuoiLocation: 'Tổ dân phố số 3, Phường Lý Thường Kiệt',
  tieCuoiProvince: 'Tỉnh Ninh Bình',
  thanhHonDate: '22/03/2026',
  thanhHonTime: 'Lúc 08:30, Chủ Nhật',
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
  
  // Fetch guest data from storage
  let guestData: GuestData;
  
  if (guestId === 'generic') {
    guestData = {
      id: 'generic',
      name: 'generic',
      guestType: 'groom',
    };
  } else {
    const guest = await findGuestById(guestId);
    
    if (guest) {
      guestData = guest;
    } else {
      // Fallback for guests not in the list (SSR)
      guestData = {
        id: guestId,
        name: 'Quý khách',
        guestType: guestId.includes('groom') ? 'groom' : 'bride',
      };
    }
  }

  return (
    <InvitationClient
      guestData={guestData}
      groomEventData={groomEventData}
      brideEventData={brideEventData}
    />
  );
}
