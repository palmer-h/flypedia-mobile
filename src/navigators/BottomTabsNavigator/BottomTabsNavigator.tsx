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
import { faBug, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useReduxSelector } from '~/hooks/redux';
import UserFavouriteFliesScreen from '~/screens/UserFavouriteFliesScreen/UserFavouriteFliesScreen';
import { AppScreen } from '~/core/constants';

const Tab = createBottomTabNavigator<BottomTabsNavigatorScreenParams>();

const TabBarIcon: React.FC<TabBarIconProps> = props => (
  <FontAwesomeIcon
    icon={props.icon}
    color={props.focused ? theme.colors.disabled : theme.colors.primary}
    size={28}
  />
);

const BottomTabsNavigator = () => {
  const isLoggedIn: boolean = useReduxSelector(state => state.user.isLoggedIn);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          height: 72,
          borderTopWidth: 2,
          borderTopColor: theme.colors.primary,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '600',
          paddingBottom: 4,
        },
        tabBarInactiveTintColor: theme.colors.primary,
        tabBarActiveTintColor: theme.colors.disabled,
      }}>
      {isLoggedIn ? (
        <Tab.Screen
          name={AppScreen.USER_FAVOURITE_FLIES}
          component={UserFavouriteFliesScreen}
          options={{
            tabBarIcon: ({ focused }) => TabBarIcon({ focused, icon: faHeart }),
          }}
        />
      ) : null}
      <Tab.Screen
        name={AppScreen.FLIES}
        component={FliesScreen}
        options={{
          tabBarIcon: ({ focused }) => TabBarIcon({ focused, icon: faBug }),
        }}
      />
      <Tab.Screen
        name={AppScreen.IMITATEES}
        component={ImitateesScreen}
        options={{
          tabBarIcon: ({ focused }) => TabBarIcon({ focused, icon: faBug }),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabsNavigator;
