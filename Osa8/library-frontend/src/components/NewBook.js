import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS } from "../queries";
import { CREATE_BOOK } from "../mutations";
import { updateAuthorCache, updateBookCache } from "../utils";

const NewBook = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join("\n");
      props.setError(messages);
      setTimeout(() => {
        props.setError("");
      }, 2000);
    },
    update: (cache, response) => {
      updateBookCache(cache, { query: ALL_BOOKS }, response.data.addBook);
      /*
			cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(response.data.addBook),
        };
      });
			
      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        return {
          allAuthors: allAuthors.concat(response.data.addBook.author),
        };
      });
			*/

      updateAuthorCache(
        cache,
        { query: ALL_AUTHORS },
        response.data.addBook.author
      );
    },
  });

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    createBook({
      variables: { title, published: parseInt(published), author, genres },
    });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          Title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            Add genre
          </button>
        </div>
        <div>Genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
