import { useState, useEffect, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { RootStackParamList, MainTabParamList } from '../../types/navigation';
import { EventItem } from '../../types/eventsTypes';
import { fetchEventsList } from './eventsService';

type EventsNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Events'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export const useEventsViewModel = () => {
  const navigation = useNavigation<EventsNavigationProp>();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    const allKeywords = events.flatMap(e => e.keywords);
    const uniqueKeywords = Array.from(new Set(allKeywords)).filter(Boolean);
    return ['All', ...uniqueKeywords];
  }, [events]);

  useEffect(() => {
    let active = true;

    fetchEventsList()
      .then(data => {
        if (active) {
          setEvents(data);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || event.keywords.includes(selectedCategory);

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
    logout: handleLogout,
  };
};
