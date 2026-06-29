import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../theme/colors';
import { APP_STRINGS } from '../../utils/constants/appStrings';
import { SPACING, BORDER_RADIUS, SIZES } from '../../utils/constants/spacing';
import { FONT_STYLES } from '../../utils/Fonts';
import { Header, ScreenContainer } from '../../components';
import { useProfileViewModel } from './useProfileViewModel';

const ProfileScreen: React.FC = (): React.JSX.Element => {
  const { greeting, handleLogout } = useProfileViewModel();

  return (
    <ScreenContainer requiredSafeArea>
      <Header
        title={greeting}
        subtitle={APP_STRINGS.events.headerSubtitle}
        style={styles.headerStyle}
      />
      <View style={styles.container}>
        <Text style={styles.text}>{APP_STRINGS.profile.title}</Text>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>
            {APP_STRINGS.profile.logoutText}
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
};

export default React.memo(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
  },
  headerStyle: {
    paddingBottom: SPACING.lg,
  },
  text: {
    ...FONT_STYLES.regular_lg,
    color: COLORS.black,
    marginBottom: SPACING.xl,
  },
  logoutButton: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xxxl,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: SIZES.border_width,
    borderColor: COLORS.error,
    backgroundColor: COLORS.white,
  },
  logoutButtonText: {
    ...FONT_STYLES.bold_lg,
    color: COLORS.error,
  },
});
