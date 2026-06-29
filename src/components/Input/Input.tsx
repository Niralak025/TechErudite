import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { COLORS } from '../../theme/colors';
import { SPACING, BORDER_RADIUS, SIZES } from '../../utils/constants/spacing';
import { FONT_STYLES } from '../../utils/Fonts';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string | false | undefined;
  containerStyle?: StyleProp<ViewStyle>;
  rightIcon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  style,
  rightIcon,
  ...props
}): React.JSX.Element => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View
        style={[styles.inputWrapper, !!error ? styles.inputErrorBorder : null]}
      >
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={COLORS.placeholder}
          {...props}
        />
        {rightIcon}
      </View>
      {!!error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.xl,
  },
  label: {
    ...FONT_STYLES.medium_md,
    color: COLORS.textDark,
    marginBottom: SPACING.sm,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: SIZES.border_width,
    borderColor: COLORS.borderLight,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 2,
    paddingHorizontal: SPACING.md,
  },
  input: {
    flex: 1,
    height: SIZES.btn_height,
    ...FONT_STYLES.regular_md,
    color: COLORS.textDark,
  },
  inputErrorBorder: {
    borderColor: COLORS.error,
  },
  errorText: {
    ...FONT_STYLES.regular_xs,
    color: COLORS.error,
    marginTop: SPACING.xs,
  },
});
