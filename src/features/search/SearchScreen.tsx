import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header, ScreenContainer } from '../../components';
import { COLORS } from '../../theme/colors';
import { FONT_STYLES } from '../../utils/Fonts';
import { APP_STRINGS } from '../../utils/constants/appStrings';
import { SPACING } from '../../utils/constants/spacing';
import { useProfileViewModel } from '../profile/useProfileViewModel';

const SearchScreen: React.FC = (): React.JSX.Element => {
  const { greeting } = useProfileViewModel();
  return (
    <ScreenContainer requiredSafeArea>
      <Header
        title={greeting}
        subtitle={APP_STRINGS.events.headerSubtitle}
        style={styles.headerStyle}
      />
      <View style={styles.container}>
        <Text style={styles.text}>Search Screen</Text>
      </View>
    </ScreenContainer>
  );
};

export default React.memo(SearchScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  text: { ...FONT_STYLES.regular_lg },
  headerStyle: {
    paddingBottom: SPACING.lg,
  },
});
