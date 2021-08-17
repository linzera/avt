import React, {useMemo, useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import FilterView from '@explore/components/FilterView';
import NavigationHeader from '@explore/components/NavigationHeader';
import ClearButton from '@explore/components/ClearFilterButton';
import CountInput from '@explore/components/CountInput';

import Typography from '~/components/Typography';
import Divider from '~/components/Divider';
import {Guest, GuestVariant} from '@explore/context/filter/types';
import {
  initialGuestValues,
  useSearchFilter,
} from '@explore/context/filter/Provider';

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 16,
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemDescription: {
    opacity: 0.5,
  },
  divider: {
    marginVertical: 8,
  },
});

const GUESTS_MAPPING: Record<GuestVariant, Guest> = {
  adult: {
    id: 'adult',
    label: 'Adult',
    description: 'Age 14 and above',
  },
  children: {
    id: 'children',
    label: 'Children',
    description: 'Age from 2 to 12',
  },
  infants: {
    label: 'Infants',
    description: 'Under 2',
    id: 'infants',
  },
  pets: {
    label: 'Pets',
    description: '2 max',
    maxCount: 2,
    id: 'pets',
  },
};

export default function GuestsScreen() {
  const searchFilter = useSearchFilter();
  const [guests, setGuests] = useState(searchFilter.guests);
  const {goBack} = useNavigation();

  const data = useMemo(() => Object.values(GUESTS_MAPPING), []);

  const uniqueFiltersAppliedCount = Object.values(guests).filter(
    guest => guest.count != 0,
  ).length;

  const guestsCount = useMemo(() => {
    return Object.values(guests)
      .map(guest => guest.count)
      .reduce((result, cur) => result + cur, 0);
  }, [guests]);

  function clearGuests() {
    setGuests(initialGuestValues);
  }

  function onCountPress(newValue: number, id: GuestVariant) {
    setGuests({
      ...guests,
      [id]: {count: newValue},
    });
  }

  function onSubmit() {
    searchFilter.setGuests(guests);
    goBack();
  }

  function renderItem({label, description, id, maxCount}: Guest) {
    const guestsCount = guests[id].count;

    return (
      <View style={styles.item}>
        <View style={styles.itemTextContainer}>
          <Typography color="primary" fontType="medium">
            {label}
          </Typography>
          <Typography color="primary" style={styles.itemDescription}>
            {description}
          </Typography>
        </View>
        <CountInput
          value={guestsCount}
          onCountPress={newValue => onCountPress(newValue, id)}
          maxCount={maxCount}
        />
      </View>
    );
  }

  return (
    <>
      <NavigationHeader
        title="Who"
        action={
          <If condition={guestsCount > 0}>
            <ClearButton
              filterCount={uniqueFiltersAppliedCount}
              onPress={clearGuests}
            />
          </If>
        }
      />
      <FilterView onSubmit={onSubmit}>
        <FlatList
          style={styles.list}
          data={data}
          bounces={false}
          keyExtractor={item => item.label}
          renderItem={({item}) => renderItem(item)}
          ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        />
      </FilterView>
    </>
  );
}
