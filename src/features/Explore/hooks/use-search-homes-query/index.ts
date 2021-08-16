import {useQuery} from '@apollo/client';
import {useCallback, useState} from 'react';
import {SearchHomes} from '~/graphql/generated/SearchHomes';
import {useSearchFilter} from '../../context/filter/Provider';
import {GET_HOMES_QUERY} from './queries';

const INITIAL_PAGE = 1;

export function useSearchHomesPaginationQuery() {
  const {regions, guestsCount, period} = useSearchFilter();
  const [currentPage, setPage] = useState(INITIAL_PAGE);

  const [variables, setVariables] = useState({
    period: period.checkIn && period.checkOut ? period : undefined,
    guests: guestsCount || undefined,
    region: regions.find(region => region.isSelected)?.id,
    page: INITIAL_PAGE,
    pageSize: 10,
  });

  const {loading, data, fetchMore} = useQuery<SearchHomes>(GET_HOMES_QUERY, {
    variables,
    notifyOnNetworkStatusChange: true,
  });

  const refetch = useCallback(() => {
    const oldState = variables;
    const newState = {
      period: period.checkIn && period.checkOut ? period : undefined,
      guests: guestsCount || undefined,
      region: regions.find(region => region.isSelected)?.id,
      page: INITIAL_PAGE,
      pageSize: 10,
    };

    if (
      oldState.guests !== newState.guests ||
      oldState.period?.checkIn !== newState.period?.checkIn ||
      oldState.period?.checkOut !== newState.period?.checkOut ||
      oldState.region !== newState.region
    ) {
      setPage(INITIAL_PAGE);
      setVariables({
        period: period.checkIn && period.checkOut ? period : undefined,
        guests: guestsCount || undefined,
        region: regions.find(region => region.isSelected)?.id,
        page: INITIAL_PAGE,
        pageSize: 10,
      });
    }
  }, [period, guestsCount, regions, variables]);

  const loadMore = useCallback(() => {
    const newPage = currentPage + 1;
    fetchMore({
      variables: {
        page: newPage,
      },
    });
    setPage(newPage);
  }, [currentPage, fetchMore]);

  return {loading, data, loadMore, refetch};
}
