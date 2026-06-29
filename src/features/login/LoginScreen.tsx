import React, { useCallback, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
} from 'react-native';
import { Formik } from 'formik';
import { useLoginViewModel } from './useLoginViewModel';
import { loginValidationSchema } from '../../validation/loginValidation';
import { appImages, EyeIcon, EyeOffIcon } from '../../assets';
import { FONT_STYLES } from '../../utils/Fonts';
import { COLORS } from '../../theme/colors';
import { APP_STRINGS } from '../../utils/constants/appStrings';
import { SPACING, BORDER_RADIUS, SIZES } from '../../utils/constants/spacing';
import { AppSvgIcon, Input, Button, ScreenContainer } from '../../components';
import { LoginFormValues } from '../../types/loginTypes';
export interface SocialButtonProps {
  source: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
  onPress?: () => void;
}
const SOCIAL_ICON_SIZE = SIZES.icon_lg * 1.2;

const LoginScreen: React.FC = (): React.JSX.Element => {
  const {
    isLoading,
    authError,
    handleLogin,
    togglePasswordVisibility,
    isPasswordVisible,
  } = useLoginViewModel();

  const passwordIcon = useMemo(
    () => (
      <TouchableOpacity
        onPress={togglePasswordVisibility}
        style={styles.eyeIconContainer}
      >
        <AppSvgIcon
          icon={isPasswordVisible ? EyeIcon : EyeOffIcon}
          size={SIZES.icon_md}
          color={COLORS.placeholder}
        />
      </TouchableOpacity>
    ),
    [isPasswordVisible, togglePasswordVisibility],
  );

  const SocialButton = React.memo(
    ({ source, style, onPress }: SocialButtonProps) => (
      <TouchableOpacity style={styles.socialBtn} onPress={onPress}>
        <Image
          source={source}
          style={[styles.socialIcon, style]}
          resizeMode="cover"
        />
      </TouchableOpacity>
    ),
  );

  const initialValues = useMemo(
    () => ({
      email: '',
      password: '',
    }),
    [],
  );

  const onSubmit = useCallback(
    (values: LoginFormValues) => {
      handleLogin(values);
    },
    [handleLogin],
  );

  return (
    <ScreenContainer requiredSafeArea style={styles.container}>
      <KeyboardAvoidingView
        style={styles.bottomHalf}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Top Half */}
          <View style={styles.topHalf}>
            <Text style={styles.logoText}>{APP_STRINGS.login.logo}</Text>
            <View style={styles.imagePlaceholder}>
              <Image source={appImages.appLogo} style={styles.imageStyle} />
            </View>
          </View>
          <View style={styles.formContainer}>
            <Formik
              initialValues={initialValues}
              validationSchema={loginValidationSchema}
              onSubmit={onSubmit}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <>
                  {/* Email Input */}
                  <Input
                    label={APP_STRINGS.login.emailLabel}
                    placeholder={APP_STRINGS.login.emailPlaceholder}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    error={touched.email && errors.email}
                  />

                  {/* Password Input */}
                  <Input
                    label={APP_STRINGS.login.passwordLabel}
                    placeholder={APP_STRINGS.login.passwordPlaceholder}
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    secureTextEntry={!isPasswordVisible}
                    autoCapitalize="none"
                    error={touched.password && errors.password}
                    rightIcon={passwordIcon}
                  />
                  {!!authError && (
                    <Text style={styles.errorText}>{authError}</Text>
                  )}

                  <View style={styles.forgotPasswordContainer}>
                    <Text style={styles.forgotPasswordText}>
                      {APP_STRINGS.login.forgotPasswordText}
                    </Text>
                  </View>

                  {/* Sign In Button */}
                  <View style={styles.signInButtonContainer}>
                    <Button
                      title={APP_STRINGS.login.buttonText}
                      onPress={handleSubmit}
                      loading={isLoading}
                      style={styles.signInButton}
                    />
                  </View>
                </>
              )}
            </Formik>

            {/* Sign Up Link */}
            <View style={styles.signUpContainer}>
              <Text style={styles.notAMemberText}>
                {APP_STRINGS.login.footerText}
              </Text>
              <TouchableOpacity>
                <Text style={styles.signUpText}>
                  {APP_STRINGS.login.signUpText}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.dividerContainer}>
              <View style={styles.line} />
              <Text style={styles.orText}>{APP_STRINGS.login.orText}</Text>
              <View style={styles.line} />
            </View>
            {/* Social Logins */}
            <View style={styles.socialContainer}>
              <SocialButton source={appImages.googleLogo} />
              <SocialButton source={appImages.appleLogo} />
              <SocialButton source={appImages.facebookLogo} />
            </View>
          </View>
          {/* Enter as Guest */}
          <View style={styles.guestContainer}>
            <TouchableOpacity>
              <Text style={styles.guestText}>
                {APP_STRINGS.login.guestText}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundGray,
  },
  imageStyle: {
    height: SIZES.btn_height,
    width: SIZES.btn_height,
  },
  topHalf: {
    height: '40%',
    backgroundColor: COLORS.backgroundGray,
    alignItems: 'center',
    paddingTop: SPACING.huge + 20,
  },
  logoText: {
    ...FONT_STYLES.bold_hero,
    fontSize: SIZES.btn_height + SPACING.md,
    color: COLORS.black,
    letterSpacing: SPACING.xxs,
  },
  imagePlaceholder: {
    marginTop: SPACING.xxxxl,
  },
  imagePlaceholderText: {
    fontSize: SIZES.btn_height + SPACING.xxs,
    color: COLORS.darkGray,
  },
  bottomHalf: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: BORDER_RADIUS.xl,
    borderTopRightRadius: BORDER_RADIUS.xl,
    marginTop: SPACING.neg_lg,
  },
  formContainer: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
  },
  errorText: {
    ...FONT_STYLES.regular_xs,
    color: COLORS.error,
    marginTop: SPACING.xs,
    marginBottom: SPACING.sm,
  },
  eyeIconContainer: {
    padding: SPACING.xs,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: SPACING.xxl,
  },
  forgotPasswordText: {
    ...FONT_STYLES.regular_sm,
    color: COLORS.textLightGray,
  },
  signInButtonContainer: {
    alignItems: 'flex-end',
    marginBottom: SPACING.lg,
  },
  signInButton: {
    paddingHorizontal: SPACING.xxxl,
    borderRadius: BORDER_RADIUS.sm,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: SPACING.xxxxl,
  },
  notAMemberText: {
    ...FONT_STYLES.regular_sm,
    color: COLORS.black,
  },
  signUpText: {
    ...FONT_STYLES.regular_sm,
    color: COLORS.black,
    textDecorationLine: 'underline',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xxxl - SPACING.xxs,
  },
  line: {
    flex: 1,
    height: SIZES.border_width,
    backgroundColor: COLORS.black,
  },
  orText: {
    marginHorizontal: SPACING.sm_md,
    ...FONT_STYLES.regular_sm,
    color: COLORS.black,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: SPACING.xxxxl,
  },
  socialBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: SPACING.md,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  socialIcon: {
    width: SOCIAL_ICON_SIZE,
    height: SOCIAL_ICON_SIZE,
  },
  guestContainer: {
    alignItems: 'flex-end',
    marginRight: SPACING.md,
  },
  guestText: {
    ...FONT_STYLES.regular_sm,
    color: COLORS.textLightGray,
  },
});
