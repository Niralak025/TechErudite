import React, { useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ListRenderItem } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ScreenContainer, Header, EventCard } from '../../components';
import { toggleFavourite } from '../../redux/slices/favouritesSlice';
import { COLORS } from '../../theme/colors';
import { SPACING } from '../../utils/constants/spacing';
import { FONT_STYLES } from '../../utils/Fonts';
import { EventItem } from '../../types/eventsTypes';
import { APP_STRINGS } from '../../utils/constants/appStrings';

const EmptyComponent = React.memo(() => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>{APP_STRINGS.favourites?.emptyText}</Text>
  </View>
));

const FavouritesScreen: React.FC = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const favourites = useSelector((state: RootState) => state.favourites.items);
  const userInfo = useSelector((state: RootState) => state.auth.user);

  const handleToggleFavourite = useCallback(
    (item: EventItem) => {
      dispatch(toggleFavourite(item));
    },
    [dispatch],
  );

  const renderItem: ListRenderItem<EventItem> = useCallback(
    ({ item }) => (
      <EventCard
        item={item}
        isFavourite
        onToggleFavourite={() => handleToggleFavourite(item)}
      />
    ),
    [handleToggleFavourite],
  );

  const keyExtractor = useCallback((item: EventItem) => item.id.toString(), []);

  return (
    <ScreenContainer requiredSafeArea>
      <Header
        title={`Hello ${userInfo?.usr_fname}!`}
        subtitle={APP_STRINGS.events.headerSubtitle}
        style={styles.headerStyle}
      />
      <FlatList
        data={favourites}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={EmptyComponent}
        removeClippedSubviews
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={10}
      />
    </ScreenContainer>
  );
};

export default React.memo(FavouritesScreen);

const styles = StyleSheet.create({
  headerStyle: {
    paddingBottom: SPACING.lg,
  },
  list: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.sm + 2,
  },
  listContent: {
    flex: 1,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xxxl + SPACING.sm,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  emptyText: {
    ...FONT_STYLES.regular_lg,
    color: COLORS.black,
  },
});
