import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

const App = () => {
  const [page, setPage] = useState("authors");
  const [error, setError] = useState("");

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>Authors</button>
        <button onClick={() => setPage("books")}>Books</button>
        <button onClick={() => setPage("add")}>Add book</button>
      </div>
      {error === "" ? null : <p style={{ color: "red" }}>{error}</p>}

      <Authors setError={setError} show={page === "authors"} />

      <Books setError={setError} show={page === "books"} />

      <NewBook setError={setError} show={page === "add"} />
    </div>
  );
};

export default App;
