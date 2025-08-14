export const bookTypeDefs = `
  type Book {
    id: ID!
    title: String!
    author: String!
    userId: ID!
  }

  type Query {
    books: [Book]
    book(id: ID!): Book
  }

  type Mutation {
    addBook(title: String!, author: String!, userId: ID!): Book
    deleteBook(id: ID!): Book
    updateBook(id: ID!, title: String, author: String, userId: ID): Book
  }
`;
