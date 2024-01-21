import { Fly, Imitatee } from '~/services/flypediaApi/types';
import { MainAppNavigatorScreen } from './constants';

export type MainAppNavigatorScreenParams = {
  [MainAppNavigatorScreen.HOME]: undefined;
  [MainAppNavigatorScreen.LOGIN]: undefined;
  [MainAppNavigatorScreen.USER_PROFILE]: undefined;
  [MainAppNavigatorScreen.FLY_DETAILS]: {
    id: Fly['id'];
  };
  [MainAppNavigatorScreen.IMITATEE_DETAILS]: {
    id: Imitatee['id'];
  };
};
