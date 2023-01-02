import { createSlice } from "@reduxjs/toolkit";
import usersService from "../services/users";

const initialState = [];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;

export const initialUsers = () => {
  return async (dispatch) => {
    const blogs = await usersService.getUsers();
    dispatch(setUsers(blogs));
  };
};

export default usersSlice.reducer;
