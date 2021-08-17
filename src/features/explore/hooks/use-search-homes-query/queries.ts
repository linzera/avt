import {gql} from '@apollo/client';

import HomeItem from '@explore/components/HomesList/HomeItem';

export const GET_HOMES_QUERY = gql`
  ${HomeItem.fragments.home}
  query SearchHomes(
    $period: BookingPeriod
    $guests: Int
    $region: UUID
    $page: Int
    $pageSize: Int
  ) {
    homes(
      region: $region
      period: $period
      guests: $guests
      page: $page
      pageSize: $pageSize
    ) {
      results {
        ...Home_fragment
      }
      count
    }
  }
`;

export const GET_HOMES_PRICING_QUERY = gql`
  query GetHomesPricing($period: BookingPeriod!, $ids: [UUID]!) {
    homesPricing(ids: $ids, period: $period) {
      homeId
      total
    }
  }
`;
