import {useState} from 'react';
import {useSearchFilter} from '@explore/context/filter/Provider';
import {RegionState} from '@explore/context/filter/types';

export function useRegionFilter() {
  const searchFilter = useSearchFilter();
  const [regions, setRegions] = useState(searchFilter.regions);

  const isAnyDestination = !regions.find(region => region.isSelected);

  function toggleRegion(region: RegionState) {
    const oldRegions = regions.filter(newRegion => newRegion.id !== region.id);
    setRegions([...oldRegions, {...region, isSelected: !region.isSelected}]);
  }

  function selectManyRegions(newRegions: RegionState[]) {
    const filteredRegions = regions.filter(r => !newRegions.includes(r));

    setRegions([
      ...filteredRegions,
      ...newRegions.map(r => ({...r, isSelected: true})),
    ]);
  }

  function clearFilters() {
    setRegions(regions.map(region => ({...region, isSelected: false})));
  }

  function onSubmit() {
    searchFilter.setRegions(regions);
  }

  return {
    regions,
    isAnyDestination,
    isRegionsReady: searchFilter.isRegionsReady,
    toggleRegion,
    selectManyRegions,
    clearFilters,
    onSubmit,
  };
}
