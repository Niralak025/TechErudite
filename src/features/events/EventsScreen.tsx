import React, { useCallback } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useEventsViewModel } from './useEventsViewModel';
import { COLORS } from '../../theme/colors';
import { EventItem } from '../../types/eventsTypes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ScreenContainer, Header, EventCard } from '../../components';
import { toggleFavourite } from '../../redux/slices/favouritesSlice';
import { APP_STRINGS } from '../../utils/constants/appStrings';
import { SPACING } from '../../utils/constants/spacing';

const EventsScreen: React.FC = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const { filteredEvents } = useEventsViewModel();
  const userInfo = useSelector((state: RootState) => state.auth.user);
  const favourites = useSelector((state: RootState) => state.favourites.items);

  const renderItem = useCallback(
    ({ item }: { item: EventItem }) => {
      const isFavourite = favourites.some(
        favourite => favourite.id === item.id,
      );

      return (
        <EventCard
          item={item}
          isFavourite={isFavourite}
          onToggleFavourite={() => dispatch(toggleFavourite(item))}
        />
      );
    },
    [dispatch, favourites],
  );

  const keyExtractor = useCallback(
    (item: EventItem, index: number) => (item.id + '-' + index).toString(),
    [],
  );

  return (
    <ScreenContainer requiredSafeArea>
      <Header
        title={`Hello ${userInfo?.usr_fname}!`}
        subtitle={APP_STRINGS.events.headerSubtitle}
        style={styles.headerStyle}
      />
      <FlatList
        data={filteredEvents}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={10}
        updateCellsBatchingPeriod={50}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  headerStyle: {
    paddingBottom: SPACING.lg,
  },
  list: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.sm + 2,
  },
  listContent: {
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xxxl + SPACING.sm,
  },
});
export default React.memo(EventsScreen);
