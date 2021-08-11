import React, {PropsWithChildren} from 'react';
import {TextStyle, Text, StyleSheet} from 'react-native';
import {
  fontSizeMapping,
  fontTypeMapping,
  TypographyComponent,
  FontType,
} from './util';
import colors, {Color} from '~/theme/colors';

export interface TypographyProps extends PropsWithChildren<TextStyle> {
  component?: TypographyComponent;
  fontType?: FontType;
  style?: TextStyle;
  color?: Color;
}

export default function Typography({
  component,
  fontType,
  style,
  color,
  ...rest
}: TypographyProps) {
  const fontSizeStyle = fontSizeMapping[component || 'body'];
  const fontTypeStyle = fontTypeMapping[fontType || 'regular'];
  const textColor = colors[color || 'black80'];

  const flattenedStyles = StyleSheet.flatten([
    style,
    fontSizeStyle,
    fontTypeStyle,
    {color: textColor},
  ]);

  return <Text style={flattenedStyles} {...rest} />;
}
