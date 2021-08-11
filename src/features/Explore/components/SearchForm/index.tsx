import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import SearchInput from './SearchInput';
import routes from '@explore/navigation/routes';
import Button from '~/components/Button';

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: 'gray',
    marginBottom: 16,
    borderRadius: 2,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});

export default function SearchForm() {
  const {navigate} = useNavigation();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore dale
  const onSearchInputPress = (route: string) => navigate(route);

  return (
    <>
      <View style={styles.container}>
        <SearchInput
          label="Destination"
          placeholder="Select a destination..."
          onPress={() => onSearchInputPress(routes.destination)}
        />
        <SearchInput
          label="Check In - Check Out"
          placeholder="Select dates..."
          onPress={() => onSearchInputPress(routes.period)}
        />
        <SearchInput
          label="Who"
          placeholder="Any guests"
          onPress={() => onSearchInputPress(routes.guests)}
        />
      </View>
      <Button variant="primary">
        <Button.Text style={{color: 'white'}}>Show homes</Button.Text>
      </Button>
    </>
  );
}
