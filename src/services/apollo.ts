import {ApolloClient, InMemoryCache} from '@apollo/client';

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
        },
      },
    },
  }),
});

export default client;
