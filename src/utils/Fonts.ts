import { StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';

const GOTHIC_A1 = {
  REGULAR: 'GothicA1-Regular',
  MEDIUM: 'GothicA1-Medium',
  SEMIBOLD: 'GothicA1-SemiBold',
  BOLD: 'GothicA1-Bold',
} as const;

export const FONT_FAMILY = {
  REGULAR: GOTHIC_A1.REGULAR,
  MEDIUM: GOTHIC_A1.MEDIUM,
  SEMIBOLD: GOTHIC_A1.SEMIBOLD,
  BOLD: GOTHIC_A1.BOLD,
} as const;

export const FONT_SIZE = {
  XS: 10,
  SM: 12,
  MD: 14,
  LG: 16,
  XL: 18,
  XXL: 20,
  TITLE: 24,
  HERO: 32,
} as const;

const createFontStyle = (
  family: string,
  size: keyof typeof FONT_SIZE,
  weight: '400' | '500' | '600' | '700',
) => ({
  color: COLORS.black,
  fontFamily: family,
  fontSize: FONT_SIZE[size],
  fontWeight: weight,
});

export const FONT_STYLES = StyleSheet.create({
  default: createFontStyle(FONT_FAMILY.REGULAR, 'MD', '400'),

  regular_xs: createFontStyle(FONT_FAMILY.REGULAR, 'XS', '400'),
  regular_sm: createFontStyle(FONT_FAMILY.REGULAR, 'SM', '400'),
  regular_md: createFontStyle(FONT_FAMILY.REGULAR, 'MD', '400'),
  regular_lg: createFontStyle(FONT_FAMILY.REGULAR, 'LG', '400'),
  regular_xl: createFontStyle(FONT_FAMILY.REGULAR, 'XL', '400'),
  regular_xxl: createFontStyle(FONT_FAMILY.REGULAR, 'XXL', '400'),
  regular_title: createFontStyle(FONT_FAMILY.REGULAR, 'TITLE', '400'),
  regular_hero: createFontStyle(FONT_FAMILY.REGULAR, 'HERO', '400'),

  medium_xs: createFontStyle(FONT_FAMILY.MEDIUM, 'XS', '500'),
  medium_sm: createFontStyle(FONT_FAMILY.MEDIUM, 'SM', '500'),
  medium_md: createFontStyle(FONT_FAMILY.MEDIUM, 'MD', '500'),
  medium_lg: createFontStyle(FONT_FAMILY.MEDIUM, 'LG', '500'),
  medium_xl: createFontStyle(FONT_FAMILY.MEDIUM, 'XL', '500'),
  medium_xxl: createFontStyle(FONT_FAMILY.MEDIUM, 'XXL', '500'),
  medium_title: createFontStyle(FONT_FAMILY.MEDIUM, 'TITLE', '500'),
  medium_hero: createFontStyle(FONT_FAMILY.MEDIUM, 'HERO', '500'),

  semibold_xs: createFontStyle(FONT_FAMILY.SEMIBOLD, 'XS', '600'),
  semibold_sm: createFontStyle(FONT_FAMILY.SEMIBOLD, 'SM', '600'),
  semibold_md: createFontStyle(FONT_FAMILY.SEMIBOLD, 'MD', '600'),
  semibold_lg: createFontStyle(FONT_FAMILY.SEMIBOLD, 'LG', '600'),
  semibold_xl: createFontStyle(FONT_FAMILY.SEMIBOLD, 'XL', '600'),
  semibold_xxl: createFontStyle(FONT_FAMILY.SEMIBOLD, 'XXL', '600'),
  semibold_title: createFontStyle(FONT_FAMILY.SEMIBOLD, 'TITLE', '600'),
  semibold_hero: createFontStyle(FONT_FAMILY.SEMIBOLD, 'HERO', '600'),

  bold_xs: createFontStyle(FONT_FAMILY.BOLD, 'XS', '700'),
  bold_sm: createFontStyle(FONT_FAMILY.BOLD, 'SM', '700'),
  bold_md: createFontStyle(FONT_FAMILY.BOLD, 'MD', '700'),
  bold_lg: createFontStyle(FONT_FAMILY.BOLD, 'LG', '700'),
  bold_xl: createFontStyle(FONT_FAMILY.BOLD, 'XL', '700'),
  bold_xxl: createFontStyle(FONT_FAMILY.BOLD, 'XXL', '700'),
  bold_title: createFontStyle(FONT_FAMILY.BOLD, 'TITLE', '700'),
  bold_hero: createFontStyle(FONT_FAMILY.BOLD, 'HERO', '700'),
});
