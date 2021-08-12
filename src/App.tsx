import React from 'react';
import {ApolloProvider} from '@apollo/client';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootNavigation from '~/navigation';
import apolloClient from '~/services/apollo';

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <SafeAreaProvider>
        <RootNavigation />
      </SafeAreaProvider>
    </ApolloProvider>
  );
}
