import { Fly, Imitatee } from '~/services/flyApi/flyApi.types';

export type MainAppNavigatorScreenParams = {
  Home: undefined;
  'Fly Details': {
    id: Fly['id'];
    name: Fly['name'];
  };
  'Imitatee Details': {
    id: Imitatee['id'];
    name: Imitatee['name'];
  };
};
