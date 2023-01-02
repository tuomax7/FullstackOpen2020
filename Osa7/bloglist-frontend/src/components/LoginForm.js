import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

import { logIn } from "../reducers/userReducer.js";

import { useNavigate } from "react-router-dom";

import { Form, Button } from "react-bootstrap";

const LoginForm = ({ username, password, setUsername, setPassword }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      dispatch(logIn(username, password));
      setUsername("");
      setPassword("");

      dispatch(setNotification(["logged in successfully", true], 5));
      navigate("/blogs");
    } catch (exception) {
      dispatch(setNotification(["incorrect username or password", false], 5));
    }
  };

  return (
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
          id="username"
          type="text"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          id="password"
          type="password"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </Form.Group>
      <Button variant="primary" id="login-button" type="submit">
        Login
      </Button>
    </Form>
  );
};

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginForm;
