export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  category: 'Tech Talk' | 'Workshop' | 'Hackathon';
  attendees: number;
}
