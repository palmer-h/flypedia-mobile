import { Fly, Imitatee } from '~/services/flyApi/types';
import { MainAppNavigatorScreen } from './constants';

export type MainAppNavigatorScreenParams = {
  Home: undefined;
  Login: undefined;
  [MainAppNavigatorScreen.FLY_DETAILS]: {
    id: Fly['id'];
  };
  [MainAppNavigatorScreen.IMITATEE_DETAILS]: {
    id: Imitatee['id'];
  };
};
