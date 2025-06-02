import { configureStore } from '@reduxjs/toolkit';
import userProfileReducer from './slices/userProfileSlice';
import appointmentsReducer from './slices/appointmentsSlice';

export const store = configureStore({
  reducer: {
    userProfile: userProfileReducer,
    appointments: appointmentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
