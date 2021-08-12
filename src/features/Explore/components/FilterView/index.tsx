import React, {PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '~/components/Button';
import colors from '~/theme/colors';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white100,
  },
  container: {
    flex: 1,
  },
  submitContainer: {
    borderTopWidth: 1,
    borderColor: colors.gray300,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
});

interface Props {
  onSubmit: () => void;
}

export default function FilterView({
  children,
  onSubmit,
}: PropsWithChildren<Props>) {
  return (
    <SafeAreaView edges={['bottom']} style={styles.safeArea}>
      <View style={styles.container}>{children}</View>
      <View style={styles.submitContainer}>
        <Button onPress={onSubmit}>
          <Button.Text>Search</Button.Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
