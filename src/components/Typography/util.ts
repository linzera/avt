import {StyleSheet, TextStyle} from 'react-native';

export type TypographyComponent = 'h1' | 'body';

export const fontSizeMapping: {
  [key in TypographyComponent]: TextStyle;
} = StyleSheet.create({
  h1: {
    fontSize: 32,
  },
  body: {
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
