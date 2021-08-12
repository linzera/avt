import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '~/components/Button';
import colors from '~/theme/colors';

import ChevronLeft from '@explore/assets/svg/chevron_left.svg';
import Typography from '~/components/Typography';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white100,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    marginLeft: 16,
    flex: 1,
  },
});

interface Props {
  title: string;
  action?: React.ReactNode;
}

export default function NavigationHeader({title, action}: Props) {
  const {goBack} = useNavigation();

  return (
    <>
      <StatusBar animated barStyle="dark-content" />
      <SafeAreaView edges={['top']} style={styles.container}>
        <Button variant="icon" onPress={goBack}>
          <ChevronLeft />
        </Button>
        <View style={styles.titleContainer}>
          <Typography fontType="medium" color="primary">
            Where
          </Typography>
        </View>
        {action}
      </SafeAreaView>
    </>
  );
}
