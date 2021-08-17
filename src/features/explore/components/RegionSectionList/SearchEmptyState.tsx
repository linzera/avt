import React from 'react';
import {StyleSheet, View} from 'react-native';
import Typography from '~/components/Typography';
import colors from '~/theme/colors';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  text: {
    textAlign: 'center',
    color: `${colors.primary}60`,
  },
});

export default function SearchEmptyState() {
  return (
    <View style={styles.container}>
      <Typography style={styles.text}>
        We could not find any destinations matching your request. Send us a chat
        if you need help!
      </Typography>
    </View>
  );
}
