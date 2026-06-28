import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useLoginViewModel } from './useLoginViewModel';
import { COLORS } from '../../theme/colors';
import { SPACING, BORDER_RADIUS } from '../../utils/constants/spacing';
import { APP_STRINGS } from '../../utils/constants/appStrings';
import { Button, Input } from '../../components';

export default function LoginScreen() {
  const {
    email,
    password,
    emailError,
    passwordError,
    isLoading,
    onEmailChange,
    onPasswordChange,
    login,
  } = useLoginViewModel();

  const strings = APP_STRINGS.login;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerContainer}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>TE</Text>
          </View>
          <Text style={styles.title}>{strings.title}</Text>
          <Text style={styles.subtitle}>{strings.subtitle}</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>{strings.formTitle}</Text>
          <Text style={styles.formSubtitle}>{strings.formSubtitle}</Text>

          {/* Email Field */}
          <Input
            label={strings.emailLabel}
            placeholder={strings.emailPlaceholder}
            value={email}
            onChangeText={onEmailChange}
            error={emailError}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          {/* Password Field */}
          <Input
            label={strings.passwordLabel}
            placeholder={strings.passwordPlaceholder}
            value={password}
            onChangeText={onPasswordChange}
            error={passwordError}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />

          {/* Submit Button */}
          <Button
            title={strings.buttonText}
            onPress={login}
            loading={isLoading}
            style={styles.button}
          />

          {/* Alternative Actions */}
          <View style={styles.footerActions}>
            <TouchableOpacity>
              <Text style={styles.forgotPasswordText}>{strings.forgotPasswordText}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>{strings.footerText}</Text>
          <TouchableOpacity>
            <Text style={styles.signUpText}>{strings.signUpText}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xxl,
    paddingBottom: SPACING.xl,
    justifyContent: 'space-between',
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  logoContainer: {
    width: 64,
    height: 64,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    marginBottom: SPACING.md,
  },
  logoText: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  title: {
    color: COLORS.text,
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  subtitle: {
    color: COLORS.textMuted,
    fontSize: 14,
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 5,
    marginTop: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  formTitle: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  formSubtitle: {
    color: COLORS.textMuted,
    fontSize: 14,
    marginTop: SPACING.xs,
    marginBottom: SPACING.lg,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.md,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  footerActions: {
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  forgotPasswordText: {
    color: COLORS.secondary,
    fontSize: 14,
    fontWeight: '500',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  footerText: {
    color: COLORS.textMuted,
    fontSize: 14,
  },
  signUpText: {
    color: COLORS.primaryLight,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

