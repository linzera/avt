import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import ExploreStack from '~/features/Explore/navigation/ExploreStack';

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <ExploreStack />
    </NavigationContainer>
  );
}
