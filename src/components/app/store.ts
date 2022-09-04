import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../../store/slices/user/userSlice';
import authReducer from '../../store/slices/auth/authSlice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer
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
