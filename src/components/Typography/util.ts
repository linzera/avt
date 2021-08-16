import {StyleSheet, TextStyle} from 'react-native';

export type TypographyComponent =
  | 'text32'
  | 'text20'
  | 'text18'
  | 'text16'
  | 'text14'
  | 'text12';

export const fontSizeMapping: Record<TypographyComponent, TextStyle> =
  StyleSheet.create({
    text32: {
      fontSize: 32,
    },
    text20: {
      fontSize: 20,
    },
    text18: {
      fontSize: 18,
    },
    text16: {
      fontSize: 16,
    },
    text14: {
      fontSize: 14,
    },
    text12: {
      fontSize: 12,
    },
  });

export type FontType = 'regular' | 'medium' | 'bold';

export const fontTypeMapping: {[key in FontType]: TextStyle} = {
  regular: {
    fontFamily: 'SourceSansPro-Regular',
  },
  medium: {
    fontFamily: 'SourceSansPro-SemiBold',
  },
  bold: {
    fontFamily: 'SourceSansPro-Bold',
  },
};
