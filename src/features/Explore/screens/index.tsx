import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SearchForm from '@explore/components/SearchForm';
import Typography from '~/components/Typography';
import colors from '~/theme/colors';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.gray300},
  safeArea: {
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 16,
    padding: 16,
    backgroundColor: colors.white100,
  },
  formWrapper: {
    flex: 1,
    backgroundColor: colors.white100,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  subtitle: {
    marginVertical: 16,
    textAlign: 'center',
  },
});

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaView edges={['bottom']} style={styles.safeArea}>
        <View style={styles.formWrapper}>
          <View style={styles.textContainer}>
            <Typography component="h1">Go together, Go Far</Typography>
            <Typography style={styles.subtitle}>
              Welcome travelers! Discover new locations with spaces designer for
              you and the people you love.
            </Typography>
          </View>
          <SearchForm />
        </View>
      </SafeAreaView>
    </View>
  );
}
