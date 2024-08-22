import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { TTokenUser } from "@/types";

type TIState = {
  user: TTokenUser | null;
  accessToken: string | null;
};

const initialState: TIState = {
  user: {
    email: "",
    name: "",
    id: "",
    profileImg: "",
    role: "",
  },
  accessToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, accessToken } = action.payload;

      state.user = user;
      state.accessToken = accessToken;
    },
    logOut: (state) => {
      state.accessToken = null;
      state.user = null;
    },
    setUserProfileImage: (state, action) => {
      if (state.user) {
        state.user.profileImg = action.payload;
      }
    },
  },
});

export const { setUser, logOut, setUserProfileImage } = authSlice.actions;
export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.accessToken;
export const selectCurrentUser = (state: RootState) => state.auth.user;
