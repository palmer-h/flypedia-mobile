import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { StackScreenProps } from '@react-navigation/stack';
import { MainAppNavigatorScreenParams } from '~/navigators/MainAppNavigator/types';
import { BottomTabsNavigatorScreenParams } from '~/navigators/BottomTabsNavigator/types';

export type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabsNavigatorScreenParams, 'Favourites'>,
  StackScreenProps<MainAppNavigatorScreenParams>
>;
