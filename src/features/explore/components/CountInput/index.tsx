import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import Typography from '~/components/Typography';
import colors from '~/theme/colors';

import PlusIcon from '@explore/assets/svg/plus_icon.svg';
import PlusDisabledIcon from '@explore/assets/svg/plus_disabled_icon.svg';
import MinusDisabledIcon from '@explore/assets/svg/minus_disabled_icon.svg';
import MinusIcon from '@explore/assets/svg/minus_icon.svg';

const primaryOpacity30 = `${colors.primary}30`;

const styles = StyleSheet.create({
  container: {flexDirection: 'row'},
  actionContainer: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: primaryOpacity30,
  },
  countContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: primaryOpacity30,
  },
  left: {
    borderTopStartRadius: 2,
    borderBottomStartRadius: 2,
  },
  right: {
    borderTopEndRadius: 2,
    borderBottomEndRadius: 2,
  },
  disabledText: {
    color: primaryOpacity30,
  },
});

interface Props {
  value: number;
  onCountPress: (value: number) => void;
  maxCount?: number;
}

export default function CountInput({value, onCountPress, maxCount}: Props) {
  const isDisabled = value === 0;
  const isIncrementDisabled = !!maxCount && maxCount === value;

  return (
    <View style={styles.container}>
      <Pressable
        disabled={isDisabled}
        onPress={() => onCountPress(value - 1)}
        style={[styles.actionContainer, styles.left]}
        accessibilityHint="Decrement">
        <Choose>
          <When condition={isDisabled}>
            <MinusDisabledIcon />
          </When>
          <Otherwise>
            <MinusIcon />
          </Otherwise>
        </Choose>
      </Pressable>
      <View style={styles.countContainer}>
        <Typography
          color="primary"
          component="text20"
          style={[isDisabled && styles.disabledText]}>
          {value}
        </Typography>
      </View>
      <Pressable
        disabled={isIncrementDisabled}
        onPress={() => onCountPress(value + 1)}
        style={[styles.actionContainer, styles.right]}
        accessibilityHint="Increment">
        <Choose>
          <When condition={isIncrementDisabled}>
            <PlusDisabledIcon />
          </When>
          <Otherwise>
            <PlusIcon />
          </Otherwise>
        </Choose>
      </Pressable>
    </View>
  );
}
