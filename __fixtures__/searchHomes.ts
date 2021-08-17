import {
  SearchHomes,
  SearchHomes_homes_results,
} from '~/graphql/generated/SearchHomes';

export const searchHomesMock: SearchHomes = {
  homes: {
    __typename: 'PaginatedHomes',
    results: Array.from(Array(10)).map<SearchHomes_homes_results>(
      (_, index) => ({
        __typename: 'Home',
        id: index,
        bathroomsCount: 2,
        cityName: 'New York',
        regionName: 'Finger Lakes',
        stateCode: 'NY',
        hasPool: true,
        roomsCount: 4,
        maxOccupancy: 2,
        photos: [
          {
            __typename: 'HomePhoto',
            listOrder: 1,
            url: 'thisisauri',
          },
        ],
        title: `Finger Lakes ${index}`,
      }),
    ),
    count: 10,
  },
};
