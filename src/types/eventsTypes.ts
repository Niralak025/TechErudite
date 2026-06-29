export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  priceFrom: number;
  priceTo: number;
  location: string;
  keywords: string[];
  isFavorite: boolean;
}

export interface DanceStyle {
  ds_id: number;
  ds_name: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ApiEvent {
  event_id: number;
  event_name: string;
  description: string;
  event_profile_pic: string;
  event_profile_img: string;
  event_url: string;
  event_price_from: number;
  event_price_to: number;
  readable_from_date: string;
  readable_to_date: string;
  isFavorite: number;
  city: string;
  country: string;
  keywords: string[];
  danceStyles: DanceStyle[];
  event_date_id: number;
}

export interface ApiEventsData {
  events: ApiEvent[];
  total: number;
}

export interface ApiEventsResponse {
  success: boolean;
  message: string;
  data: ApiEventsData;
}
