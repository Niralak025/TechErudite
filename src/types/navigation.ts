import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type MainTabParamList = {
  Search: undefined;
  Events: undefined;
  Favourites: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  MainTab: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
