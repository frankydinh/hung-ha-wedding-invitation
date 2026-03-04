export interface GuestData {
  name: string;
  guestType: 'groom' | 'bride';
  id: string;
}

export interface WeddingEventData {
  groomName: string;
  brideName: string;
  tieCuoiDate: string;
  tieCuoiTime: string;
  tieCuoiLunarDate: string;
  tieCuoiLocation: string;
  tieCuoiProvince: string;
  thanhHonDate: string;
  thanhHonTime: string;
  thanhHonLunarDate: string;
  thanhHonLocation: string;
  thanhHonProvince: string;
}

export interface AdminCredentials {
  pin: string;
  phoneNumber: string;
}
