import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import SearchInput from './SearchInput';
import routes from '@explore/navigation/routes';
import Button from '~/components/Button';
import colors from '~/theme/colors';
import Divider from '~/components/Divider';

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: colors.gray200,
    marginBottom: 16,
    borderRadius: 2,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});

export default function SearchForm() {
  const {navigate} = useNavigation();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const onSearchInputPress = (route: string) => navigate(route);

  return (
    <>
      <View style={styles.container}>
        <SearchInput
          label="Destination"
          placeholder="Select destination"
          onPress={() => onSearchInputPress(routes.destination)}
        />
        <Divider />
        <SearchInput
          label="Check In - Check Out"
          placeholder="Select dates"
          onPress={() => onSearchInputPress(routes.period)}
        />
        <Divider />
        <SearchInput
          label="Who"
          placeholder="Add guests"
          onPress={() => onSearchInputPress(routes.guests)}
        />
      </View>
      <Button variant="primary">
        <Button.Text>Show homes</Button.Text>
      </Button>
    </>
  );
}
