import React from 'react';
import {Image, StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SearchForm from '@explore/components/SearchForm';
import Typography from '~/components/Typography';
import colors from '~/theme/colors';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.gray300},
  img: {
    width: '100%',
  },
  safeArea: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
    borderTopLeftRadius: 16,
    backgroundColor: colors.white100,
    width: '100%',
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
  title: {
    marginBottom: 20,
  },
  subtitle: {
    marginBottom: 30,
    textAlign: 'center',
  },
});

export default function ExploreScreen() {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor={colors.white100}
        barStyle="light-content"
      />
      <View style={styles.container}>
        <Image
          accessibilityIgnoresInvertColors
          resizeMode="stretch"
          source={require('../assets/img/bg.png')}
          style={styles.img}
        />
        <SafeAreaView edges={['bottom']} style={styles.safeArea}>
          <View style={styles.formWrapper}>
            <View style={styles.textContainer}>
              <Typography
                color="primary"
                component="text32"
                fontType="bold"
                style={styles.title}>
                Go together, Go Far
              </Typography>
              <Typography color="neutral" style={styles.subtitle}>
                Welcome travelers! Discover new locations with spaces designer
                for you and the people you love.
              </Typography>
            </View>
            <SearchForm />
          </View>
        </SafeAreaView>
      </View>
    </>
  );
}
