import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FliesScreen from '~/screens/FliesScreen/FliesScreen';
import ImitateesScreen from '~/screens/ImitateesScreen/ImitateesScreen';

const Tab = createBottomTabNavigator();

const BottomTabsNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Flies" component={FliesScreen} />
      <Tab.Screen name="Imitatees" component={ImitateesScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabsNavigator;
