import {useSearchFilter} from '@explore/context/filter-provider';
import {RegionState} from '@explore/context/types';

export function useRegionFilter() {
  const {regions, isRegionsReady, setRegions} = useSearchFilter();

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

  return {
    regions,
    isAnyDestination,
    isRegionsReady,
    toggleRegion,
    selectManyRegions,
    clearFilters,
  };
}
