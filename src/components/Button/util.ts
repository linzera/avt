import {StyleSheet, ViewStyle} from 'react-native';
import colors, {Color} from '~/theme/colors';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'common'
  | 'icon'
  | 'outlined';
export type ButtonVariantProp = Exclude<ButtonVariant, 'common'>;

export const buttonStyles: Record<ButtonVariant, ViewStyle> = StyleSheet.create(
  {
    common: {
      paddingVertical: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    primary: {
      backgroundColor: colors.primary,
      borderRadius: 2,
    },
    secondary: {
      backgroundColor: colors.white100,
    },
    icon: {
      height: 24,
      width: 24,
    },
    outlined: {
      backgroundColor: colors.white100,
      borderWidth: 2,
      borderColor: colors.primary,
      borderRadius: 2,
      paddingVertical: 8,
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
    default:
      return 'primary';
  }
}
