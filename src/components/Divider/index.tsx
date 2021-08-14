import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import colors from '~/theme/colors';

const styles = StyleSheet.create({
  divider: {height: 2, backgroundColor: colors.gray200},
});

interface Props {
  style?: StyleProp<ViewStyle>;
}

export default function Divider(props: Props) {
  return <View style={[styles.divider, props.style]} />;
}
