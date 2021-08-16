import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import colors from '~/theme/colors';

const styles = StyleSheet.create({
  divider: {height: 2, backgroundColor: colors.gray200},
  horizontal: {
    width: 2,
    backgroundColor: colors.gray200,
  },
});

interface Props {
  style?: StyleProp<ViewStyle>;
  horizontal?: boolean;
}

export default function Divider(props: Props) {
  return (
    <View
      style={[
        props.horizontal ? styles.horizontal : styles.divider,
        props.style,
      ]}
    />
  );
}
