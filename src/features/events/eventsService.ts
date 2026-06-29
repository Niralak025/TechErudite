import apiClient from '../../api/apiClient';
import { API_ENDPOINTS } from '../../api/apiServices';
import {
  EventItem,
  ApiEventsResponse,
  ApiEvent,
} from '../../types/eventsTypes';

export const fetchEventsList = async (): Promise<EventItem[]> => {
  try {
    const response = await apiClient.post<ApiEventsResponse>(
      API_ENDPOINTS.EVENTS,
    );

    const rawEvents = response.data?.data?.events || [];

    if (Array.isArray(rawEvents)) {
      return rawEvents.map((item: ApiEvent) => {
        let location = '';
        if (item.city && item.country)
          location = `${item.city}, ${item.country}`;
        else if (item.city) location = item.city;
        else if (item.country) location = item.country;

        return {
          id: String(
            item.event_date_id || item.event_id || Math.random().toString(),
          ),
          title: item.event_name || 'Event',
          description: item.description || '',
          date: item.readable_from_date || '',
          image: item.event_profile_img || '',
          priceFrom: Number(item.event_price_from) || 0,
          priceTo: Number(item.event_price_to) || 0,
          location,
          keywords: Array.isArray(item.keywords) ? item.keywords : [],
          isFavorite: item.isFavorite === 1,
        };
      });
    }

    return [];
  } catch (error) {
    console.warn('API events listing failed', error);
    return [];
  }
};
