import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '~/store';
import { INITIAL_USER_SLICE_STATE } from '~/store/slices/user/constants';

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: INITIAL_USER_SLICE_STATE,
  reducers: {},
});

export const {} = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectId = (state: RootState) => state.user.id;

export default userSlice.reducer;
