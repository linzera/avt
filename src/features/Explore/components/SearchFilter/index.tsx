import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSearchFilter} from '@explore/context/filter/Provider';
import routes from '@explore/navigation/routes';
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

export default function SearchFilter(props: {
  onSubmit: () => void;
  submitTitle: string;
  showPeriod: boolean;
}) {
  const {navigate} = useNavigation();
  const {formattedPeriod, guestsCount, regions, isAnyDestination} =
    useSearchFilter();

  function onSearchInputPress(route: string) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    navigate(route);
  }

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

  function getGuestValue() {
    if (guestsCount === 0) {
      return '';
    }

    const baseValue = `${guestsCount} guest`;

    if (guestsCount === 1) {
      return baseValue;
    }

    // Plural, simple as possible, no need for INTL
    return `${baseValue}s`;
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
        <If condition={props.showPeriod}>
          <SearchInput
            label="Check In - Check Out"
            placeholder="Select dates"
            value={formattedPeriod}
            onPress={() => onSearchInputPress(routes.period)}
          />
          <Divider />
        </If>
        <SearchInput
          label="Who"
          placeholder="Add guests"
          value={getGuestValue()}
          onPress={() => onSearchInputPress(routes.guests)}
        />
      </View>
      <Button variant="primary" onPress={props.onSubmit}>
        <Button.Text>{props.submitTitle}</Button.Text>
      </Button>
    </>
  );
}
