import { useState, useEffect, createRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";

import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs, createBlog } from "./reducers/blogReducer.js";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const blogFormRef = createRef();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const likeBlog = async (id) => {
    const blog = blogs.find((b) => b.id === id);
    //const changedBlog = { ...blog, user: blog.user.id, likes: blog.likes + 1 };

    try {
      /*
      const updatedBlog = await blogService.update(id, changedBlog);
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)));
      dispatch(setNotification([`Blog '${blog.title}' was liked!`, true], 5));
      */
    } catch (exception) {
      dispatch(
        setNotification(
          [`Blog '${blog.title}' was already removed from server`, false],
          5
        )
      );
      //setBlogs(blogs.filter((b) => b.id !== id));
    }
  };

  const addBlog = async (blogToAdd) => {
    try {
      blogFormRef.current.toggleVisibility();
      dispatch(
        setNotification(
          [`Blog ${blogToAdd.title} was successfully added`, true],
          5
        )
      );
      dispatch(createBlog(blogToAdd));
    } catch (exception) {
      dispatch(
        setNotification([`Cannot add blog ${blogToAdd.title}`, false], 5)
      );
    }
  };

  const removeBlog = async (id) => {
    const blog = blogs.find((b) => b.id === id);

    try {
      /*
      await blogService.deleteBlog(blog);
      setBlogs(blogs.filter((blog) => blog.id !== id));
      dispatch(
        setNotification(
          [`Blog '${blog.title}' was removed from server`, true],
          5
        )
      );
      */
    } catch (exception) {
      dispatch(
        setNotification(
          [`Blog '${blog.title}' was already removed from server`, false],
          5
        )
      );

      //setBlogs(blogs.filter((b) => b.id !== id));
    }
  };

  const handleLogout = async () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  if (user === null) {
    return (
      <div>
        <h2>Blogs</h2>
        <Notification />
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          setUser={setUser}
        />
      </div>
    );
  }

  return (
    <div>
      {user.username} logged in{" "}
      <button type="submit" onClick={handleLogout}>
        Log out
      </button>
      <h2>Blogs</h2>
      <Notification />
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={likeBlog}
            removeBlog={removeBlog}
            user={user}
          />
        ))}
      <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    </div>
  );
};

export default App;
