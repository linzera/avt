import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import ExploreStack from '~/features/explore/navigation';

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <ExploreStack />
    </NavigationContainer>
  );
}
