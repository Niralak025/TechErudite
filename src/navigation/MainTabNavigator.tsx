import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../types/navigation';
import SearchScreen from '../features/search/SearchScreen';
import EventsScreen from '../features/events/EventsScreen';
import FavouritesScreen from '../features/favourites/FavouritesScreen';
import ProfileScreen from '../features/profile/ProfileScreen';
import {
  SearchIcon,
  CalendarIcon,
  HeartOutlineIcon,
  UserIcon,
} from '../assets';
import { AppSvgIcon } from '../components';
import { SPACING, SIZES, BORDER_RADIUS } from '../utils/constants/spacing';
import { COLORS } from '../theme/colors';
import { APP_STRINGS } from '../utils/constants/appStrings';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator: React.FC = (): React.JSX.Element => {
  return (
    <Tab.Navigator
      initialRouteName="Events"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.blackAlt,
        tabBarInactiveTintColor: COLORS.textMutedDark,
        tabBarStyle: {
          paddingVertical: SPACING.sm,
          height: SIZES.tab_height,
          backgroundColor: COLORS.white,
          borderTopWidth: 0,
          elevation: 5,
          shadowColor: COLORS.black,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: BORDER_RADIUS.xs,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: APP_STRINGS.tabs.search,
          tabBarIcon: ({ color }) => (
            <AppSvgIcon icon={SearchIcon} size={SIZES.icon_lg} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventsScreen}
        options={{
          tabBarLabel: APP_STRINGS.tabs.events,
          tabBarIcon: ({ color }) => (
            <AppSvgIcon icon={CalendarIcon} size={SIZES.icon_lg} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={{
          tabBarLabel: APP_STRINGS.tabs.favourites,
          tabBarIcon: ({ color }) => (
            <AppSvgIcon icon={HeartOutlineIcon} size={SIZES.icon_lg} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: APP_STRINGS.tabs.profile,
          tabBarIcon: ({ color }) => <AppSvgIcon icon={UserIcon} size={SIZES.icon_lg} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
