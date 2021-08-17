import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import colors from '~/theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function LoadingView() {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        accessibilityHint="Loading"
        size="large"
        color={colors.primary}
      />
    </View>
  );
}
