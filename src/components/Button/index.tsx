import React, {PropsWithChildren} from 'react';
import {
  Platform,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  TextProps,
  ViewStyle,
} from 'react-native';
import {buttonStyles} from './styles';

type ButtonVariant = 'primary' | 'secondary';

interface Props extends PressableProps {
  variant: ButtonVariant;
  style?: ViewStyle;
}

function Button({variant, style, ...rest}: Props) {
  const buttonVariantStyle = buttonStyles[variant];
  const pressableStyle = StyleSheet.flatten([
    buttonStyles.common,
    buttonVariantStyle,
    style,
  ]);

  return (
    <Pressable
      style={({pressed}) => [
        Platform.select({
          ios: {
            opacity: pressed ? 0.2 : 1,
          },
        }),
        pressableStyle,
      ]}
      android_ripple={{
        borderless: false,
      }}
      {...rest}
    />
  );
}

Button.Text = (props: PropsWithChildren<TextProps>) => <Text {...props} />;

export default Button;
