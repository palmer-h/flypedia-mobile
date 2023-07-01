import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { flyApi } from '~/services/flyApi/flyApi';

const reducer = combineReducers({
  [flyApi.reducerPath]: flyApi.reducer,
});

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(flyApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;
