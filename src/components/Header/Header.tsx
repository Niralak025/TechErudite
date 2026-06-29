import React from 'react';
import { StyleSheet, View, Text, ViewStyle } from 'react-native';
import { COLORS } from '../../theme/colors';
import { FONT_STYLES } from '../../utils/Fonts';
import { SPACING } from '../../utils/constants/spacing';

type HeaderProps = {
  title: string;
  subtitle?: string;
  style?: ViewStyle;
};

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  style,
}): React.JSX.Element => {
  return (
    <View style={[styles.header, style]}>
      <Text style={styles.headerTitle}>{title}</Text>
      {!!subtitle && <Text style={styles.headerSubtitle}>{subtitle}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.md,
  },
  headerTitle: {
    ...FONT_STYLES.semibold_xxl,
    color: COLORS.black,
    marginBottom: SPACING.xs,
  },
  headerSubtitle: {
    ...FONT_STYLES.regular_md,
    color: COLORS.textMutedDark,
  },
});

export default Header;
