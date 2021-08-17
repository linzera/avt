import React from 'react';
import {StyleSheet, View} from 'react-native';
import Typography from '~/components/Typography';
import {useHomeItemHeight} from '@explore/hooks/use-home-item-height';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    maxWidth: 240,
    textAlign: 'center',
  },
  subtitle: {
    maxWidth: 278,
    marginTop: 12,
    textAlign: 'center',
  },
});

export default function EmptyState() {
  const itemHeight = useHomeItemHeight();
  return (
    <View style={[styles.container, {height: itemHeight}]}>
      <Typography
        component="text20"
        fontType="medium"
        color="primary"
        style={styles.title}>
        We couldn’t find any available homes...
      </Typography>
      <Typography color="primary05" style={styles.subtitle}>
        Please, try to select other dates to see available homes inside selected
        regions.
      </Typography>
    </View>
  );
}
