import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FliesScreen from '~/screens/FliesScreen/FliesScreen';
import ImitateesScreen from '~/screens/ImitateesScreen/ImitateesScreen';
import theme from '~/theme';
import {
  BottomTabsNavigatorScreenParams,
  TabBarIconProps,
} from '~/navigators/BottomTabsNavigator/types';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBug } from '@fortawesome/free-solid-svg-icons';

const Tab = createBottomTabNavigator<BottomTabsNavigatorScreenParams>();

const TabBarIcon: React.FC<TabBarIconProps> = props => (
  <FontAwesomeIcon
    icon={props.icon}
    color={props.focused ? theme.colors.pressedPrimary : theme.colors.primary}
    size={28}
  />
);

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
          backgroundColor: theme.colors.background,
          height: 100,
          borderTopWidth: 2,
          borderTopColor: theme.colors.primary,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '600',
        },
        tabBarInactiveTintColor: theme.colors.primary,
        tabBarActiveTintColor: theme.colors.pressedPrimary,
      }}>
      <Tab.Screen
        name="Flies"
        component={FliesScreen}
        options={{
          tabBarIcon: ({ focused }) => TabBarIcon({ focused, icon: faBug }),
        }}
      />
      <Tab.Screen
        name="Imitatees"
        component={ImitateesScreen}
        options={{
          tabBarIcon: ({ focused }) => TabBarIcon({ focused, icon: faBug }),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabsNavigator;
