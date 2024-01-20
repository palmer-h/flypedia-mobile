import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { flyApi } from '~/services/flyApi';
import user from '~/store/slices/user';

const reducer = combineReducers({
  [flyApi.reducerPath]: flyApi.reducer,
  user,
});

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(flyApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;
