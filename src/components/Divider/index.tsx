import React from 'react';
import {View, StyleSheet} from 'react-native';
import colors from '~/theme/colors';

const styles = StyleSheet.create({
  divider: {height: 2, backgroundColor: colors.gray200},
});

export default function Divider() {
  return <View style={styles.divider} />;
}
