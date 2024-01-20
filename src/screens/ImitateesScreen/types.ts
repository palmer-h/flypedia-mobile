import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { StackScreenProps } from '@react-navigation/stack';
import { MainAppNavigatorScreenParams } from '~/navigators/MainAppNavigator/types';
import { BottomTabsNavigatorScreenParams } from '~/navigators/BottomTabsNavigator/types';
import { BottomTabsNavigatorScreen } from '~/navigators/BottomTabsNavigator/constants';

export type Props = CompositeScreenProps<
  BottomTabScreenProps<
    BottomTabsNavigatorScreenParams,
    BottomTabsNavigatorScreen.IMITATEES
  >,
  StackScreenProps<MainAppNavigatorScreenParams>
>;
