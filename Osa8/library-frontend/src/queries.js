import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author {
      name
      born
      bookCount
    }
    published
    genres
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`;
