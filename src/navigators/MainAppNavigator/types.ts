import { Fly, Imitatee } from '~/services/flyApi/flyApi.types';

export type MainAppNavigatorScreenParams = {
  Home: undefined;
  'Fly Details': {
    id: Fly['id'];
  };
  'Imitatee Details': {
    id: Imitatee['id'];
  };
};
