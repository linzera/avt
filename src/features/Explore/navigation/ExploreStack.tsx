import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ExploreScreen from '~/features/Explore/screens';
import routes from '~/navigation/routes';

const Stack = createNativeStackNavigator();

export default function ExploreStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={routes.explore} component={ExploreScreen} />
    </Stack.Navigator>
  );
}
