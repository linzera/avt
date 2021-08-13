import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useRegionFilter} from '@explore/hooks/use-region-filter';
import {useSearchFilter} from '@explore/context/filter-provider';
import routes from '~/features/explore/navigation/routes';
import Button from '~/components/Button';
import colors from '~/theme/colors';
import Divider from '~/components/Divider';
import SearchInput from './SearchFilterInput';

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

export default function SearchFilter() {
  const {navigate} = useNavigation();
  const {formattedPeriod} = useSearchFilter();
  const {regions, isAnyDestination} = useRegionFilter();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const onSearchInputPress = (route: string) => navigate(route);

  function buildDestinationValue() {
    if (isAnyDestination) {
      return 'Any destination';
    }

    return regions
      .filter(region => region.isSelected)
      .map(region => region.name)
      .sort()
      .join(', ');
  }

  return (
    <>
      <View style={styles.container}>
        <SearchInput
          label="Destination"
          placeholder="Select destination"
          onPress={() => onSearchInputPress(routes.destination)}
          value={buildDestinationValue()}
        />
        <Divider />
        <SearchInput
          label="Check In - Check Out"
          placeholder="Select dates"
          value={formattedPeriod}
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
