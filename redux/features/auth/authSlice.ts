import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { TTokenUser } from '@/types';

type TIState = {
  user: TTokenUser | null;
  accessToken: string | null;
  otp: number | null;
  theme: string;
  isLoading: boolean;
};

const darkThemePreference = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-color-scheme:dark)').matches;

const initialState: TIState = {
  user: {
    email: '',
    name: '',
    id: '',
    profileImg: '',
    role: '',
    isVerified: false,
    failedLoginAttempt: 0,
    createAt: new Date(),
    isBlocked: false,
  },
  isLoading: true,
  accessToken: '',
  otp: null,
  theme: darkThemePreference() ? 'dark' : 'light',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, accessToken } = action.payload;

      state.user = user;
      state.accessToken = accessToken;
      state.isLoading = false;
      localStorage.setItem('accessToken', accessToken);
    },
    logOut: state => {
      localStorage.removeItem('accessToken');
      state.accessToken = null;
      state.user = null;
    },
    setUserProfileImage: (state, action) => {
      if (state.user) {
        state.user.profileImg = action.payload;
      }
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setOtp: (state, action) => {
      state.otp = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setVerifiedUser: (state, action) => {
      state.user = state.user
        ? { ...state.user, isVerified: action.payload }
        : state.user;
    },
  },
});

export const {
  setUser,
  logOut,
  setUserProfileImage,
  setOtp,
  setTheme,
  setVerifiedUser,
  setLoading,
} = authSlice.actions;
export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.accessToken;
export const selectCurrentUser = (state: RootState) => state.auth.user;
