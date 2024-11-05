import { UserProfile } from '@/types/user.ts';
import { Booking } from '@/types/booking.ts';

export interface Property {
  address: string;
  country: string;
  createdAt: string;
  description: string;
  id: number;
  name: string;
  owner: UserProfile;
  pricePerNight: number;
  rating: number | null;
  type: AccommodationType;
}

export type AccommodationType = 'BNB' | 'LODGE' | 'BEACH_HOUSE' | 'APARTMENT' | 'TREE_HOUSE' | 'CASTLE' | 'VILLA' | 'DUNGEON' | 'MANSION' | 'BARN';

export interface PropertyReview {
  id: number;
  booking: Booking;
  score: number;
  message: string;
  createdAt: string;
}
