import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Button from '~/components/Button';
import FilterView from '@explore/components/FilterView';
import NavigationHeader from '@explore/components/NavigationHeader';
import RegionSectionList from '@explore/components/RegionSectionList';
import DestinationSearchInput from '@explore/components/DestinationSearchInput';
import {useRegionFilter} from '@explore/hooks/use-region-filter';

function ClearButton({
  filterCount,
  onPress,
}: {
  filterCount: number;
  onPress: () => void;
}) {
  if (!filterCount) {
    return null;
  }

  return (
    <Button variant="secondary" onPress={onPress}>
      <Button.Text color="accent">Clear all ({filterCount})</Button.Text>
    </Button>
  );
}

export default function DestinationScreen() {
  const [query, setQuery] = useState('');
  const {isRegionsReady, regions, clearFilters} = useRegionFilter();
  const {goBack} = useNavigation();

  const appliedFilterCount = regions.filter(region => region.isSelected).length;

  return (
    <>
      <NavigationHeader
        title="Where"
        action={
          <ClearButton
            filterCount={appliedFilterCount}
            onPress={clearFilters}
          />
        }
      />
      <FilterView onSubmit={goBack}>
        <DestinationSearchInput
          value={query}
          onChangeText={text => setQuery(text)}
          onClear={() => setQuery('')}
        />
        {isRegionsReady && <RegionSectionList query={query} />}
      </FilterView>
    </>
  );
}
