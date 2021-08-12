import React, {PropsWithChildren} from 'react';
import {TextStyle, Text, StyleSheet, StyleProp, TextProps} from 'react-native';
import colors, {Color} from '~/theme/colors';
import {
  fontSizeMapping,
  fontTypeMapping,
  TypographyComponent,
  FontType,
} from './util';

export interface TypographyProps extends PropsWithChildren<TextProps> {
  component?: TypographyComponent;
  fontType?: FontType;
  style?: StyleProp<TextStyle>;
  color?: Color;
}

export default function Typography({
  component,
  fontType,
  style,
  color,
  ...rest
}: TypographyProps) {
  const fontSizeStyle = fontSizeMapping[component || 'text16'];
  const fontTypeStyle = fontTypeMapping[fontType || 'regular'];
  const textColor = colors[color || 'black80'];

  const flattenedStyles = StyleSheet.flatten([
    fontSizeStyle,
    fontTypeStyle,
    {color: textColor},
    style,
  ]);

  return <Text style={flattenedStyles} {...rest} />;
}
