import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { StackScreenProps } from '@react-navigation/stack';
import { MainAppNavigatorScreenParams } from '~/navigators/MainAppNavigator/types';
import { BottomTabsNavigatorScreenParams } from '~/navigators/BottomTabsNavigator/types';
import { AppScreen } from '~/core/constants';

export type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabsNavigatorScreenParams, AppScreen.IMITATEES>,
  StackScreenProps<MainAppNavigatorScreenParams>
>;
