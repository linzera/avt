import {useQuery} from '@apollo/client';
import {useCallback, useRef, useState} from 'react';
import {SearchHomes} from '~/graphql/generated/SearchHomes';
import {useSearchFilter} from '../../context/filter/Provider';
import {GET_HOMES_QUERY} from './queries';

const INITIAL_PAGE = 1;

export function useSearchHomesPaginationQuery() {
  const {regions, guestsCount, period} = useSearchFilter();
  const currentPageRef = useRef(INITIAL_PAGE);

  const [variables, setVariables] = useState({
    period: period.checkIn && period.checkOut ? period : undefined,
    guests: guestsCount || undefined,
    region: regions.find(region => region.isSelected)?.id,
    page: INITIAL_PAGE,
    pageSize: 10,
  });

  const {loading, data, fetchMore} = useQuery<SearchHomes>(GET_HOMES_QUERY, {
    variables,
    refetchWritePolicy: 'overwrite',
    fetchPolicy: 'cache-first',
  });

  const refetch = useCallback(() => {
    setVariables({
      period: period.checkIn && period.checkOut ? period : undefined,
      guests: guestsCount || undefined,
      region: regions.find(region => region.isSelected)?.id,
      page: INITIAL_PAGE,
      pageSize: 10,
    });
    currentPageRef.current = INITIAL_PAGE;
  }, [period, guestsCount, regions]);

  const loadMore = useCallback(() => {
    const newPage = currentPageRef.current + 1;
    fetchMore({
      variables: {
        page: newPage,
      },
    });
    currentPageRef.current = newPage;
  }, [fetchMore]);

  return {loading, data, loadMore, refetch};
}
