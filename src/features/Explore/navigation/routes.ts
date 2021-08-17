import {Home_fragment} from '~/graphql/generated/Home_fragment';

export type ExploreStackParamList = {
  HomeDetail: Omit<Home_fragment, '__typename'>;
  Explore: undefined;
  Destination: undefined;
  Period: undefined;
  Guests: undefined;
  Homes: undefined;
};

const routes = {
  explore: 'Explore',
  destination: 'Destination',
  period: 'Period',
  guests: 'Guests',
  homes: 'Homes',
  homeDetail: 'HomeDetail',
};

export default routes as {
  [key in keyof typeof routes]: keyof ExploreStackParamList;
};
