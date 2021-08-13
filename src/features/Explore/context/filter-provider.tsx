import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {useQuery} from '@apollo/client';
import {formatPeriodLabel} from '~/util/date';
import {FilterState, RegionsQuery, RegionState} from './types';
import {GET_REGIONS_QUERY} from './queries';

const initialValues = {
  isRegionsReady: false,
  regions: [],
  setRegions: () => undefined,
  period: {
    checkIn: '',
    checkOut: '',
  },
  setPeriod: () => undefined,
  formattedPeriod: '',
};

const SearchFilterContext = createContext<FilterState>(initialValues);

export default function SearchFilterProvider(props: {
  children: React.ReactNode;
}) {
  const [period, setPeriod] = useState(initialValues.period);
  const [regions, setRegions] = useState<RegionState[]>(initialValues.regions);
  const [isRegionsReady, setIsRegionsReady] = useState(
    initialValues.isRegionsReady,
  );

  const formattedPeriod = useMemo(() => formatPeriodLabel(period), [period]);

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

  return (
    <SearchFilterContext.Provider
      value={{
        regions,
        isRegionsReady,
        setRegions,
        period,
        setPeriod,
        formattedPeriod,
      }}>
      {props.children}
    </SearchFilterContext.Provider>
  );
}

export function useSearchFilter() {
  return useContext(SearchFilterContext);
}
