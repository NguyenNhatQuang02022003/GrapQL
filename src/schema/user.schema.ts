export const userTypeDefs = `
  type User {
    id: ID!
    name: String!
    dob: String!
    email: String!
    role: String!
    createdAt: String
    updatedAt: String
  }

  input UserInput {
    name: String!
    dob: String!
    email: String!
    role: String
  }

  extend type Query {
    users: [User]
    user(id: ID!): User
  }

  extend type Mutation {
    createUser(input: UserInput!): User
    updateUser(id: ID!, input: UserInput!): User
    deleteUser(id: ID!): User
  }
`;
