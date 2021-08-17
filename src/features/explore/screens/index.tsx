import React from 'react';
import {Image, StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {hide} from 'react-native-bootsplash';
import Typography from '~/components/Typography';
import colors from '~/theme/colors';
import SearchFilter from '~/features/explore/components/SearchFilter';
import {useNavigation} from '@react-navigation/native';
import routes from '@explore/navigation/routes';

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
    borderTopLeftRadius: 12,
    borderTopEndRadius: 12,
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
    marginBottom: 24,
    textAlign: 'center',
  },
});

export default function ExploreScreen() {
  const {navigate} = useNavigation();

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
          onLoadEnd={() => hide({fade: true})}
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
            <SearchFilter
              showPeriod
              submitTitle="Show homes"
              onSubmit={() => navigate(routes.homes)}
            />
          </View>
        </SafeAreaView>
      </View>
    </>
  );
}
