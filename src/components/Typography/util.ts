import {StyleSheet, TextStyle} from 'react-native';

export type TypographyComponent = 'text32' | 'text16';

export const fontSizeMapping: {
  [key in TypographyComponent]: TextStyle;
} = StyleSheet.create({
  text32: {
    fontSize: 32,
  },
  text16: {
    fontSize: 16,
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
