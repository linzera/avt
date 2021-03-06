import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import FilterView from '@explore/components/FilterView';
import NavigationHeader from '@explore/components/NavigationHeader';
import RegionSectionList from '@explore/components/RegionSectionList';
import DestinationSearchInput from '@explore/components/DestinationSearchInput';
import LoadingView from '@explore/components/LoadingView';
import ClearButton from '@explore/components/ClearFilterButton';
import {useRegionFilter} from '@explore/hooks/use-region-filter';

export default function DestinationScreen() {
  const [query, setQuery] = useState('');
  const {
    isRegionsReady,
    regions,
    clearFilters,
    onSubmit: onSubmitFilter,
    selectManyRegions,
    isAnyDestination,
    toggleRegion,
  } = useRegionFilter();

  const {goBack} = useNavigation();

  const appliedFilterCount = regions.filter(region => region.isSelected).length;

  function onSubmit() {
    onSubmitFilter();
    goBack();
  }

  return (
    <>
      <NavigationHeader
        title="Where"
        action={
          <If condition={appliedFilterCount > 0}>
            <ClearButton
              filterCount={appliedFilterCount}
              onPress={clearFilters}
            />
          </If>
        }
      />
      <FilterView onSubmit={onSubmit}>
        <Choose>
          <When condition={isRegionsReady}>
            <DestinationSearchInput
              value={query}
              onChangeText={text => setQuery(text)}
              onClear={() => setQuery('')}
            />
            <RegionSectionList
              regions={regions}
              isAnyDestination={isAnyDestination}
              onToggleMany={selectManyRegions}
              onToggle={toggleRegion}
              onClear={clearFilters}
              query={query}
            />
          </When>
          <Otherwise>
            <LoadingView />
          </Otherwise>
        </Choose>
      </FilterView>
    </>
  );
}
