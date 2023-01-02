import { useState, useEffect, createRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";

import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import {
  initializeBlogs,
  createBlog,
  increaseLikes,
  deleteBlog,
} from "./reducers/blogReducer.js";
import { initializeUser, logOut } from "./reducers/userReducer.js";

import { initialUsers } from "./reducers/usersReducer.js";

import { Routes, Route, useNavigate, useMatch, Link } from "react-router-dom";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const blogFormRef = createRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initialUsers());
  }, [dispatch]);

  const users = useSelector((state) => state.users);

  const inspectedUserMatch = useMatch("/users/:id");
  const inspectedUser = inspectedUserMatch
    ? [...users].find((user) => user.id === inspectedUserMatch.params.id)
    : null;

  const inspectedBlogMatch = useMatch("/blogs/:id");
  const inspectedBlog = inspectedBlogMatch
    ? [...blogs].find((blog) => blog.id === inspectedBlogMatch.params.id)
    : null;

  const likeBlog = async (id) => {
    const blog = blogs.find((b) => b.id === id);

    try {
      dispatch(increaseLikes(blog));
      dispatch(setNotification([`Blog '${blog.title}' was liked!`, true], 5));
    } catch (exception) {
      dispatch(
        setNotification(
          [`Blog '${blog.title}' was already removed from server`, false],
          5
        )
      );
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
      dispatch(deleteBlog(blog));

      dispatch(
        setNotification(
          [`Blog '${blog.title}' was removed from server`, true],
          5
        )
      );
    } catch (exception) {
      dispatch(
        setNotification(
          [`Blog '${blog.title}' was already removed from server`, false],
          5
        )
      );
    }
  };

  const handleLogout = async () => {
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <div>
      <div>
        {user ? (
          <div>
            <div>
              <Link to="/blogs">Blogs</Link>
              <Link to="/users">Users</Link>
              {user.username} logged in{" "}
              <button type="submit" onClick={handleLogout}>
                Log out
              </button>
            </div>

            <h2>Blogs</h2>
            <Notification />
          </div>
        ) : (
          <div>
            <h2>Blogs</h2>
            <Notification />
            <LoginForm
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
            />
          </div>
        )}
      </div>
      <Routes>
        <Route
          path="/blogs"
          element={
            <div>
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
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <div>
              {inspectedBlog ? (
                <div>
                  <h3>{inspectedBlog.title}</h3>
                  <p>{inspectedBlog.url}</p>
                  <p>
                    Likes: {inspectedBlog.likes}{" "}
                    <button onClick={() => likeBlog(inspectedBlog.id)}>
                      Like
                    </button>
                  </p>
                  <p>Added by {inspectedBlog.user.username}</p>
                </div>
              ) : null}
            </div>
          }
        />
        <Route
          path="/users"
          element={
            <div>
              <h3>Users</h3>
              <table>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Blogs created</th>
                  </tr>
                </thead>
                <tbody>
                  {[...users].map((user) => (
                    <tr key={user.id}>
                      <td>
                        <Link to={`/users/${user.id}`}>{user.username}</Link>
                      </td>
                      <td>
                        {
                          [...blogs].filter((blog) => blog.user.id === user.id)
                            .length
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }
        />
        <Route
          path="/users/:id"
          element={
            <div>
              {inspectedUser ? (
                <div>
                  <h3>{inspectedUser.username}</h3>
                  <h4>Added blogs</h4>
                  <ul>
                    {[...blogs]
                      .filter((blog) => blog.user.id === inspectedUser.id)
                      .map((blog) => (
                        <li key={blog.id}>{blog.title}</li>
                      ))}
                  </ul>
                </div>
              ) : null}
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
