import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {
  ChevronRightIcon,
  ShareIcon,
  HeartOutlineIcon,
  FilledHeartIcon,
} from '../../assets';
import { COLORS } from '../../theme/colors';
import { EventItem } from '../../types/eventsTypes';
import { BORDER_RADIUS, SPACING } from '../../utils/constants/spacing';
import { FONT_STYLES } from '../../utils/Fonts';

type EventCardProps = {
  item: EventItem;
  isFavourite: boolean;
  onToggleFavourite: () => void;
};

const EventCard: React.FC<EventCardProps> = ({
  item,
  isFavourite,
  onToggleFavourite,
}): React.JSX.Element => {
  const imageSource = item.image
    ? { uri: item.image }
    : require('../../assets/png/facebook.png');

  const priceText =
    item.priceFrom === 0 && item.priceTo === 0
      ? 'Free'
      : item.priceFrom === item.priceTo
      ? `€${item.priceFrom}`
      : `€${item.priceFrom} - €${item.priceTo}`;

  return (
    <View style={styles.card}>
      <Image source={imageSource} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.cardTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <ChevronRightIcon width={16} height={16} />
        </View>

        <View style={styles.cardDetails}>
          <View style={styles.cardDateRow}>
            <Text style={styles.cardDate}>{item.date}</Text>
            {!!item.location && (
              <Text style={styles.cardLocation}>{item.location}</Text>
            )}
          </View>
          <Text style={styles.cardPrice}>{priceText}</Text>
        </View>

        <View style={styles.cardFooterRow}>
          <View style={styles.chipsContainer}>
            {item.keywords?.slice(0, 3).map((keyword, idx) => (
              <View key={idx} style={styles.chip}>
                <Text style={styles.chipText}>{keyword}</Text>
              </View>
            ))}
          </View>

          <View style={styles.actionsContainer}>
            <TouchableOpacity>
              <ShareIcon width={20} height={20} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onToggleFavourite}>
              {isFavourite ? (
                <FilledHeartIcon width={24} height={24} />
              ) : (
                <HeartOutlineIcon
                  width={24}
                  height={24}
                  stroke={COLORS.blackAlt}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    flexDirection: 'row',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: BORDER_RADIUS.md,
    marginRight: SPACING.md,
    backgroundColor: COLORS.imagePlaceholder,
  },
  cardContent: {
    flex: 1,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardTitle: {
    ...FONT_STYLES.semibold_lg,
    color: COLORS.blackAlt,
    flex: 1,
    marginRight: SPACING.sm,
  },
  cardDetails: {
    marginTop: SPACING.sm,
  },
  cardDateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardDate: {
    ...FONT_STYLES.medium_md,
    fontSize: 13,
    color: COLORS.green,
  },
  cardLocation: {
    ...FONT_STYLES.regular_sm,
    color: COLORS.textMutedDark,
  },
  cardPrice: {
    ...FONT_STYLES.regular_sm,
    color: COLORS.textMutedDark,
    marginVertical: SPACING.xxs,
  },
  cardFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chipsContainer: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
  },
  chip: {
    backgroundColor: COLORS.chipBackground,
    paddingHorizontal: SPACING.sm_md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.lg,
    marginRight: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  chipText: {
    ...FONT_STYLES.semibold_sm,
    color: COLORS.blackAlt,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: SPACING.sm,
  },
});

export default EventCard;
