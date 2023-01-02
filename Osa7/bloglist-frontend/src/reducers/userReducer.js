import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import loginService from "../services/login";

const initialState = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    removeUser() {
      return null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      await blogService.setToken(user.token);
      dispatch(setUser(user));
    }
  };
};

export const logIn = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({
      username,
      password,
    });
    window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
    blogService.setToken(user.token);
    dispatch(setUser(user));
  };
};

export const logOut = () => {
  return (dispatch) => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(removeUser());
  };
};

export default userSlice.reducer;
