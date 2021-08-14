const routes = {
  explore: 'Explore',
  destination: 'Destination',
  period: 'Period',
  guests: 'Guests',
  homes: 'Homes',
};

export type RouteKeys = keyof typeof routes;
export type Route = 'Explore' | 'Destination' | 'Period' | 'Guests' | 'Homes';

export type ExploreStackParamList = Record<Route, undefined>;

export default routes as {[key in RouteKeys]: Route};
