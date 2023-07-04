import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabsNavigator from '~/navigators/BottomTabsNavigator/BottomTabsNavigator';
import FlyDetailsScreen from '~/screens/FlyDetailsScreen/FlyDetailsScreen';
import ImitateeDetailsScreen from '~/screens/ImitateeDetailsScreen/ImitateeDetailsScreen';

const Stack = createStackNavigator();

const MainAppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={BottomTabsNavigator} />
      <Stack.Screen name="Fly Details" component={FlyDetailsScreen} />
      <Stack.Screen name="Imitatee Details" component={ImitateeDetailsScreen} />
    </Stack.Navigator>
  );
};

export default MainAppNavigator;
