import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const initialState = [];

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    likeBlog(state, action) {
      const likedBlog = action.payload;

      return state.map((blog) => (blog.id !== likedBlog.id ? blog : likedBlog));
    },
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    filterBlog(state, action) {
      const removedBlog = action.payload;

      return state.filter((blog) => blog.id !== removedBlog.id);
    },
  },
});

export const { setBlogs, appendBlog, likeBlog, filterBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const blog = await blogService.create(newBlog);
    dispatch(appendBlog(blog));
  };
};

export const increaseLikes = (blog) => {
  return async (dispatch) => {
    const likedBlog = { ...blog, user: blog.user.id, likes: blog.likes + 1 };
    const updatedBlog = await blogService.update(likedBlog.id, likedBlog);
    dispatch(likeBlog(updatedBlog));
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blog);
    dispatch(filterBlog(blog));
  };
};

export default blogSlice.reducer;
