import React, {PropsWithChildren} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import {PathProps} from 'react-native-svg';
import {SafeAreaView as RawSafeAreaView} from 'react-native-safe-area-context';
import Button from '~/components/Button';
import colors from '~/theme/colors';

import Typography from '~/components/Typography';
import AnimatedSvgIcon, {chevronD} from '~/components/AnimatedSvgIcon';

const SafeAreaView = Animated.createAnimatedComponent(RawSafeAreaView);

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.white100,
  },
  container: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    marginLeft: 16,
    flex: 1,
    marginRight: 4,
  },
});

interface Props {
  title: string;
  action?: React.ReactNode;
  variant?: 'transparent' | 'default';
  style?: {
    backgroundColor: string | number;
  };
  iconAnimationProps?: PathProps;
  iconColor?: keyof typeof colors;
  onPress?: () => void;
}

export default function NavigationHeader({
  title,
  action,
  children,
  iconAnimationProps,
  iconColor,
  variant = 'default',
  style = styles.safeArea,
  onPress,
}: PropsWithChildren<Props>) {
  const {goBack} = useNavigation();

  return (
    <>
      <StatusBar
        animated
        barStyle={variant === 'default' ? 'dark-content' : 'light-content'}
      />
      <SafeAreaView edges={['top']} style={style}>
        <View style={styles.container}>
          <Button variant="icon" onPress={onPress ? onPress : goBack}>
            <AnimatedSvgIcon
              fill={iconColor}
              d={chevronD}
              animatedProps={iconAnimationProps}
            />
          </Button>
          <View style={styles.titleContainer}>
            <Typography numberOfLines={1} fontType="medium" color="primary">
              {title}
            </Typography>
          </View>
          {action}
        </View>
        {children}
      </SafeAreaView>
    </>
  );
}
