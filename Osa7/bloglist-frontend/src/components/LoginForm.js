import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

import { logIn } from "../reducers/userReducer.js";

const LoginForm = ({ username, password, setUsername, setPassword }) => {
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      dispatch(logIn(username, password));
      setUsername("");
      setPassword("");

      dispatch(setNotification(["logged in successfully", true], 5));
    } catch (exception) {
      dispatch(setNotification(["incorrect username or password", false], 5));
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>

      <div>
        Password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        Login
      </button>
    </form>
  );
};

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginForm;
