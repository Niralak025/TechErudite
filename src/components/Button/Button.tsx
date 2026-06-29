import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { COLORS } from '../../theme/colors';
import { SPACING, BORDER_RADIUS, SIZES } from '../../utils/constants/spacing';
import { FONT_STYLES } from '../../utils/Fonts';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Button: React.FC<ButtonProps> = ({
  title,
  loading = false,
  variant = 'primary',
  style,
  textStyle,
  disabled,
  ...props
}): React.JSX.Element => {
  const getButtonStyles = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondaryButton;
      case 'outline':
        return styles.outlineButton;
      case 'primary':
      default:
        return styles.primaryButton;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'outline':
        return styles.outlineText;
      case 'secondary':
        return styles.secondaryText;
      case 'primary':
      default:
        return styles.primaryText;
    }
  };

  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.baseButton,
        getButtonStyles(),
        isDisabled ? styles.disabledButton : null,
        style,
      ]}
      disabled={isDisabled}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' ? COLORS.green : '#FFFFFF'}
          size="small"
        />
      ) : (
        <Text style={[styles.baseText, getTextStyle(), textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  baseButton: {
    borderRadius: BORDER_RADIUS.md,
    height: SIZES.btn_height,
    paddingHorizontal: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primaryButton: {
    backgroundColor: COLORS.green,
  },
  secondaryButton: {
    backgroundColor: COLORS.green,
    borderWidth: 1,
    borderColor: COLORS.green,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.green,
  },
  disabledButton: {
    opacity: 0.6,
  },
  baseText: {
    ...FONT_STYLES.semibold_lg,
  },
  primaryText: {
    color: COLORS.white,
  },
  secondaryText: {
    color: COLORS.textDark,
  },
  outlineText: {
    color: COLORS.green,
  },
});
