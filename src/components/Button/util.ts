import {StyleSheet, ViewStyle} from 'react-native';
import colors, {Color} from '~/theme/colors';
import {TypographyProps} from '../Typography';

export type ButtonVariant = 'primary' | 'secondary' | 'common';
export type ButtonVariantProp = Exclude<ButtonVariant, 'common'>;

export const buttonStyles: Record<ButtonVariant, ViewStyle> = StyleSheet.create(
  {
    common: {
      padding: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    primary: {
      backgroundColor: colors.blue500,
      borderRadius: 2,
    },
    secondary: {
      backgroundColor: colors.white100,
    },
  },
);

export function getDerivedChildrenColorByVariant(
  variant: ButtonVariantProp,
): Color {
  switch (variant) {
    case 'primary':
      return 'white100';
    case 'secondary':
      return 'black60';
  }
}
