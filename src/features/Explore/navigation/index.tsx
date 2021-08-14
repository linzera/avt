import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ExploreScreen from '@explore/screens';
import PeriodScreen from '@explore/screens/Period';
import GuestsScreen from '@explore/screens/Guests';
import DestinationScreen from '@explore/screens/Destination';
import HomesScreen from '@explore/screens/Homes';
import SearchFilterProvider from '@explore/context/filter/Provider';
import routes from './routes';

export const Stack = createNativeStackNavigator();

export default function ExploreStack() {
  return (
    <SearchFilterProvider>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Group>
          <Stack.Screen name={routes.explore} component={ExploreScreen} />
          <Stack.Screen name={routes.homes} component={HomesScreen} />
        </Stack.Group>
        <Stack.Group
          screenOptions={{
            presentation: 'fullScreenModal',
            animation: 'slide_from_bottom',
          }}>
          <Stack.Screen
            name={routes.destination}
            component={DestinationScreen}
          />
          <Stack.Screen name={routes.period} component={PeriodScreen} />
          <Stack.Screen name={routes.guests} component={GuestsScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </SearchFilterProvider>
  );
}
