import React from 'react';
import {
  Platform,
  Pressable,
  PressableProps,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {ButtonContextProvider} from './context';
import Text from './Text';
import {buttonStyles, ButtonVariantProp} from './util';

interface Props extends PressableProps {
  variant?: ButtonVariantProp;
  style?: ViewStyle;
}

function Button({variant, style, ...rest}: Props) {
  const defaultVariant = variant || 'primary';

  const buttonVariantStyle = buttonStyles[defaultVariant];
  const pressableStyle = StyleSheet.flatten([
    buttonStyles.common,
    buttonVariantStyle,
    style,
  ]);

  return (
    <ButtonContextProvider variant={defaultVariant}>
      <Pressable
        style={({pressed}) => [
          Platform.select({
            ios: {
              opacity: pressed ? 0.4 : 1,
            },
          }),
          pressableStyle,
        ]}
        android_ripple={{
          borderless: false,
        }}
        {...rest}
      />
    </ButtonContextProvider>
  );
}

Button.Text = Text;

export default Button;
