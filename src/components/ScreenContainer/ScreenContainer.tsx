import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
  ScrollViewProps,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../theme/colors';

type ScreenContainerProps = {
  requiredSafeArea?: boolean;
  scrollView?: boolean;
  style?: ViewStyle;
  contentContainerStyle?: ScrollViewProps['contentContainerStyle'];
  edges?: Array<'top' | 'bottom' | 'left' | 'right'>;
  children: React.ReactNode;
};

const ScreenContainer: React.FC<ScreenContainerProps> = ({
  requiredSafeArea = false,
  scrollView = false,
  style,
  contentContainerStyle,
  edges = ['top', 'left', 'right'],
  children,
}) => {
  const Container = requiredSafeArea ? SafeAreaView : View;
  const safeAreaProps = requiredSafeArea ? { edges } : {};

  if (scrollView) {
    return (
      <Container style={[styles.container, style]} {...safeAreaProps}>
        <ScrollView
          contentContainerStyle={contentContainerStyle}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      </Container>
    );
  }

  return (
    <Container style={[styles.container, style]} {...safeAreaProps}>
      {children}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});

export default ScreenContainer;
