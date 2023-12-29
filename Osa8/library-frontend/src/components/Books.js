import { useState } from "react";
import { useQuery } from "@apollo/client";

import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);
  const [inspectedGenre, setInspectedGenre] = useState("all genres");

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }
  const books = result.data.allBooks;
  const genres = [...new Set(books.map((b) => b.genres).flat()), "all genres"];

  const filteredBooks =
    inspectedGenre === "all genres"
      ? books
      : books.filter((b) => b.genres.includes(inspectedGenre));

  return (
    <div>
      <h2>Books</h2>

      {inspectedGenre === null ? null : (
        <p>
          In <b>{inspectedGenre}</b>
        </p>
      )}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {genres.map((genre) => (
        <button key={genre} onClick={() => setInspectedGenre(genre)}>
          {genre}
        </button>
      ))}
    </div>
  );
};

export default Books;
