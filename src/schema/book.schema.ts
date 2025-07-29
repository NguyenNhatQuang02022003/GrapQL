export const bookTypeDefs = `
  type Book {
    id: ID!
    title: String!
    author: String!
  }

  type Query {
    books: [Book]
    book(id: ID!): Book
  }

  type Mutation {
    addBook(title: String!, author: String!): Book
    deleteBook(id: ID!): Book
    updateBook(id: ID!, title: String, author: String): Book
  }
`;
