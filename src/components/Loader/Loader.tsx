import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { useAppSelector } from '../../redux/store';
import { COLORS } from '../../theme/colors';
import { BORDER_RADIUS, SPACING } from '../../utils/constants/spacing';

const Loader: React.FC = (): React.JSX.Element | null => {
  const globalLoading = useAppSelector(state => state.ui.globalLoading);

  if (!globalLoading) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size="large" color={COLORS.green} />
      </View>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  spinnerContainer: {
    padding: SPACING.xl,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
});
