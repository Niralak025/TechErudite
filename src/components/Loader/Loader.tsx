import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { useAppSelector } from '../../redux/store';
import { COLORS } from '../../theme/colors';

export default function Loader() {
  const globalLoading = useAppSelector((state) => state.ui.globalLoading);

  if (!globalLoading) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size="large" color={COLORS.secondary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(11, 13, 23, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99999,
  },
  spinnerContainer: {
    padding: 24,
    borderRadius: 16,
    backgroundColor: 'rgba(21, 25, 44, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(42, 51, 83, 0.5)',
    shadowColor: COLORS.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
});
