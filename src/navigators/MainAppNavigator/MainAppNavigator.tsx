import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabsNavigator from '~/navigators/BottomTabsNavigator/BottomTabsNavigator';
import FlyDetailsScreen from '~/screens/FlyDetailsScreen/FlyDetailsScreen';
import ImitateeDetailsScreen from '~/screens/ImitateeDetailsScreen/ImitateeDetailsScreen';
import { MainAppNavigatorScreenParams } from '~/navigators/MainAppNavigator/types';

const Stack = createStackNavigator<MainAppNavigatorScreenParams>();

const MainAppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={BottomTabsNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Fly Details"
        component={FlyDetailsScreen}
        options={({ route }) => ({
          headerTitle: String(route.params.name),
        })}
      />
      <Stack.Screen
        name="Imitatee Details"
        component={ImitateeDetailsScreen}
        options={({ route }) => ({
          headerTitle: String(route.params.name),
        })}
      />
    </Stack.Navigator>
  );
};

export default MainAppNavigator;
