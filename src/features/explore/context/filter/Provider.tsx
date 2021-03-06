import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {useQuery} from '@apollo/client';
import {formatPeriodLabel, getNightsCount} from '~/util/date';
import {
  FilterState,
  GuestCountState,
  GuestVariant,
  RegionsQuery,
  RegionState,
} from './types';
import {GET_REGIONS_QUERY} from './queries';

export const initialGuestValues: Record<GuestVariant, GuestCountState> = {
  adult: {count: 0},
  children: {count: 0},
  infants: {count: 0},
  pets: {count: 0},
};

const initialValues = {
  regions: [],
  period: {
    checkIn: '',
    checkOut: '',
  },
  guests: initialGuestValues,
  formattedPeriod: '',
  isRegionsReady: false,
  guestsCount: 0,
  filtersAppliedCount: 0,
  nightsCount: 0,
  isAnyDestination: true,
  setPeriod: () => undefined,
  setRegions: () => undefined,
  setGuests: () => undefined,
  clearFilters: () => undefined,
};

const SearchFilterContext = createContext<FilterState>(initialValues);

export default function SearchFilterProvider(props: {
  children: React.ReactNode;
}) {
  const [period, setPeriod] = useState(initialValues.period);
  const [guests, setGuests] = useState(initialValues.guests);
  const [regions, setRegions] = useState<RegionState[]>(initialValues.regions);
  const [isRegionsReady, setIsRegionsReady] = useState(
    initialValues.isRegionsReady,
  );

  const formattedPeriod = useMemo(() => formatPeriodLabel(period), [period]);
  const isAnyDestination = !regions.find(region => region.isSelected);

  const guestsCount = useMemo(() => {
    return Object.values(guests)
      .map(guest => guest.count)
      .reduce((result, cur) => result + cur, 0);
  }, [guests]);

  const nightsCount = useMemo(
    () => getNightsCount(period.checkIn, period.checkOut),
    [period],
  );

  const filtersAppliedCount = useMemo(() => {
    let counter = 0;

    if (regions.find(region => region.isSelected)) {
      counter++;
    }
    if (guestsCount > 0) {
      counter++;
    }
    if (period.checkIn || period.checkOut) {
      counter++;
    }

    return counter;
  }, [period, guestsCount, regions]);

  const {data: regionsQueryData} = useQuery<RegionsQuery>(GET_REGIONS_QUERY, {
    fetchPolicy: 'cache-first',
  });

  useEffect(() => {
    if (regionsQueryData) {
      const loadedRegions = regionsQueryData.regions.map(region => ({
        id: region.id,
        name: region.name,
        stateName: region.stateName,
        isSelected: false,
      }));

      setRegions(loadedRegions);
      setIsRegionsReady(true);
    }
  }, [regionsQueryData]);

  function clearFilters() {
    setRegions(regions.map(region => ({...region, isSelected: false})));
    setPeriod(initialValues.period);
    setGuests(initialValues.guests);
  }

  return (
    <SearchFilterContext.Provider
      value={{
        regions,
        guests,
        period,
        isRegionsReady,
        isAnyDestination,
        formattedPeriod,
        guestsCount,
        filtersAppliedCount,
        nightsCount,
        clearFilters,
        setRegions,
        setPeriod,
        setGuests,
      }}>
      {props.children}
    </SearchFilterContext.Provider>
  );
}

export function useSearchFilter() {
  return useContext(SearchFilterContext);
}
