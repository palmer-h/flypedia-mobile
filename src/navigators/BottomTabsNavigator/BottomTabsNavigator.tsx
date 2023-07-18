import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FliesScreen from '~/screens/FliesScreen/FliesScreen';
import ImitateesScreen from '~/screens/ImitateesScreen/ImitateesScreen';
import theme from '~/theme';
import { BottomTabsNavigatorScreenParams } from '~/navigators/BottomTabsNavigator/types';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBug, faHeart } from '@fortawesome/free-solid-svg-icons';

const Tab = createBottomTabNavigator<BottomTabsNavigatorScreenParams>();

const BottomTabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTitleStyle: {
          color: theme.colors.onPrimary,
        },
        tabBarStyle: {
          backgroundColor: theme.colors.primary,
          height: 100,
        },
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: '600',
        },
        tabBarInactiveTintColor: theme.colors.pressedPrimary,
        tabBarActiveTintColor: theme.colors.onPrimary,
      }}>
      <Tab.Screen
        name="Flies"
        component={FliesScreen}
        options={{
          tabBarIcon: () => (
            <FontAwesomeIcon icon={faHeart} color={theme.colors.onPrimary} size={32} />
          ),
        }}
      />
      <Tab.Screen
        name="Imitatees"
        component={ImitateesScreen}
        options={{
          tabBarIcon: () => (
            <FontAwesomeIcon icon={faBug} color={theme.colors.onPrimary} size={32} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabsNavigator;
