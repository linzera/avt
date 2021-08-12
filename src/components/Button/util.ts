import {StyleSheet, ViewStyle} from 'react-native';
import colors, {Color} from '~/theme/colors';

export type ButtonVariant = 'primary' | 'secondary' | 'common' | 'icon';
export type ButtonVariantProp = Exclude<ButtonVariant, 'common'>;

export const buttonStyles: Record<ButtonVariant, ViewStyle> = StyleSheet.create(
  {
    common: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    primary: {
      paddingVertical: 12,
      backgroundColor: colors.primary,
      borderRadius: 2,
    },
    secondary: {
      paddingVertical: 12,
      backgroundColor: colors.white100,
    },
    icon: {
      height: 24,
      width: 24,
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
    case 'icon':
      return 'white100';
  }
}
