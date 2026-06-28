import apiClient from '../../api/apiClient';
import { API_ENDPOINTS } from '../../api/apiServices';
import { EventItem } from '../../types/eventsTypes';

const MOCK_EVENTS: EventItem[] = [
  {
    id: '1',
    title: 'Global DevCon 2026',
    description: 'Explore the future of agentic AI coding, developer tooling, and decentralized software architectures.',
    date: 'July 15, 2026',
    category: 'Tech Talk',
    attendees: 1240,
  },
  {
    id: '2',
    title: 'React Native Deep Dive',
    description: 'Hands-on training session on React Native rearchitectures, Fabric renderer, and performance profiling.',
    date: 'July 22, 2026',
    category: 'Workshop',
    attendees: 450,
  },
  {
    id: '3',
    title: 'Antigravity Hackathon',
    description: '48 hours of building next-gen autonomous systems. Over $50k in cash prizes and workspace grants.',
    date: 'August 05, 2026',
    category: 'Hackathon',
    attendees: 890,
  },
  {
    id: '4',
    title: 'Securing Mobile API Gateways',
    description: 'Industry experts talk about token rotations, runtime validation, and securing APIs from automation attacks.',
    date: 'August 12, 2026',
    category: 'Tech Talk',
    attendees: 310,
  },
  {
    id: '5',
    title: 'Next.js 16 Workshop',
    description: 'Advanced patterns for SSR, static generation caching strategies, and partial prerendering configurations.',
    date: 'August 19, 2026',
    category: 'Workshop',
    attendees: 600,
  },
];

export const fetchEventsList = async (): Promise<EventItem[]> => {
  try {
    // Perform direct Axios GET request via configured endpoint
    const response = await apiClient.get(API_ENDPOINTS.EVENTS);

    // Extract array from response data configurations
    const rawEvents = response.data?.events || response.data?.data?.events || response.data?.data || response.data;

    if (Array.isArray(rawEvents)) {
      return rawEvents.map((item: any) => ({
        id: String(item.id || item.event_id || Math.random().toString()),
        title: item.title || item.name || item.event_title || 'Tech Event',
        description: item.description || item.desc || 'No description provided.',
        date: item.date || item.event_date || 'TBD',
        category: item.category || 'Tech Talk',
        attendees: Number(item.attendees || item.joined || 0),
      }));
    }

    return MOCK_EVENTS;
  } catch (error) {
    console.warn('API events listing failed, falling back to mock data', error);
    return MOCK_EVENTS;
  }
};
