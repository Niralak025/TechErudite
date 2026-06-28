import { useState, useEffect, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { EventItem } from '../../types/eventsTypes';
import { fetchEventsList } from './eventsService';

type EventsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Events'>;

export const useEventsViewModel = () => {
  const navigation = useNavigation<EventsNavigationProp>();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  const categories = ['All', 'Tech Talk', 'Workshop', 'Hackathon'];

  useEffect(() => {
    let active = true;
    setIsLoading(true);

    fetchEventsList()
      .then((data) => {
        if (active) {
          setEvents(data);
        }
      })
      .finally(() => {
        if (active) {
          setIsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [events, searchQuery, selectedCategory]);

  const handleLogout = () => {
    navigation.replace('Login');
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    categories,
    filteredEvents,
    isLoading,
    logout: handleLogout,
  };
};
