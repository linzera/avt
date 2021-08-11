import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SearchForm from '~/features/Explore/components/SearchForm';
import theme from '~/theme';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'red'},
  safeArea: {
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 16,
    width: '100%',
    padding: 16,
    backgroundColor: theme.colors.backgroundColor,
  },
  formWrapper: {
    flex: 1,
    backgroundColor: theme.colors.backgroundColor,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  subtitle: {
    marginVertical: 24,
    textAlign: 'center',
    color: 'gray',
  },
});

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaView edges={['bottom']} style={styles.safeArea}>
        <View style={styles.formWrapper}>
          <View style={styles.textContainer}>
            <Text>Go together, Go Far</Text>
            <Text style={styles.subtitle}>
              Welcome travelers! Discover new locations with spaces designer for
              you and the people you love.
            </Text>
          </View>
          <SearchForm />
        </View>
      </SafeAreaView>
    </View>
  );
}
