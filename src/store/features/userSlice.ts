import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {
    user: {
      _id: "",
      firstName: "",
      lastName: "",
      phone: "",
      phoneNumberVerified: false,
      email: "",
      emailVerified: false,
      profileImage: "",
      role: "",
      status: "",
      id: "",
    },
    token: "",
  },
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.userInfo = action.payload;
    },
    updateUser: (state, action) => {
      state.userInfo.user = action.payload;
    },
    logoutUser: (state) => {
      state.userInfo = initialState.userInfo;
    }
  },
  selectors: {
    getUser: (state) => state?.userInfo,
  },
  extraReducers: (builder) => {
    builder.addCase("user/logout", (state) => {
      state.userInfo = {
        user: {
          _id: "",
          firstName: "",
          lastName: "",
          phone: "",
          phoneNumberVerified: false,
          email: "",
          emailVerified: false,
          profileImage: "",
          role: "",
          status: "",
          id: "",
        },
        token: "",
      };
    });
  },
});

export default userInfoSlice.reducer;
export const { addUser, logoutUser, updateUser} = userInfoSlice.actions;
export const { getUser } = userInfoSlice.selectors;
