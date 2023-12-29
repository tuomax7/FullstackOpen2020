import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import RecommendedBooks from "./components/RecommendedBooks";
import LoginForm from "./components/LoginForm";
import { useApolloClient } from "@apollo/client";

const App = () => {
  const client = useApolloClient();
  const [token, setToken] = useState(null);

  const [page, setPage] = useState("authors");
  const [error, setError] = useState("");

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (!token) {
    return (
      <div>
        {error === "" ? null : <p style={{ color: "red" }}>{error}</p>}
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={setError} />
      </div>
    );
  }

  return (
    <div>
      <div>
        <button onClick={logout}>Logout</button>
        <button onClick={() => setPage("authors")}>Authors</button>
        <button onClick={() => setPage("books")}>Books</button>
        <button onClick={() => setPage("recommended")}>Recommended</button>
        <button onClick={() => setPage("add")}>Add book</button>
      </div>
      {error === "" ? null : <p style={{ color: "red" }}>{error}</p>}

      <Authors setError={setError} show={page === "authors"} />

      <Books setError={setError} show={page === "books"} />

      <RecommendedBooks setError={setError} show={page === "recommended"} />

      <NewBook setError={setError} show={page === "add"} />
    </div>
  );
};

export default App;
