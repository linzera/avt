import {ApolloClient, InMemoryCache} from '@apollo/client';
import {concatPagination} from '@apollo/client/utilities';

const client = new ApolloClient({
  uri: 'https://fake-api.avantstay.dev/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          homes: {
            keyArgs: ['region', 'period', 'guests'],
            merge(existing = {}, incoming = {}) {
              const existingResults = existing?.results ?? [];
              const incomingResults = incoming?.results ?? [];
              return {
                ...incoming,
                results: existingResults.concat(incomingResults),
              };
            },
          },
          homesPricing: concatPagination(['ids', 'period']),
        },
      },
    },
  }),
});

export default client;
