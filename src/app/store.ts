import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import thanksReducer from '../features/thanks/thanksSlice';

export const store = configureStore({
  reducer: {
    thanks: thanksReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
