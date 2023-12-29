import { useQuery } from "@apollo/client";

import { ALL_BOOKS, ME } from "../queries";

const RecommendedBooks = (props) => {
  const result = useQuery(ALL_BOOKS);
  const resultUser = useQuery(ME);

  if (!props.show) {
    return null;
  }

  if (result.loading || resultUser.loading) {
    return <div>loading...</div>;
  }
  const books = result.data.allBooks;
  const favoriteGenre = resultUser.data.me.favoriteGenre;

  const filteredBooks = books.filter((b) => b.genres.includes(favoriteGenre));

  return (
    <div>
      <h2>Recommended Books</h2>

      <p>Books in your favorite genre {favoriteGenre}</p>

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
    </div>
  );
};

export default RecommendedBooks;
