import {gql} from '@apollo/client';

export const GET_REGIONS_QUERY = gql`
  query RegionsQuery {
    regions {
      id
      stateName
      name
    }
  }
`;
