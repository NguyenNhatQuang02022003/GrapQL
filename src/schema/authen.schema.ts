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

  type AuthPayload {
    token: String!
    user: User!
  }
  type MessageResponse {
    message: String!
  }

  input UserInput {
    name: String!
    dob: String!
    email: String!
    password: String!
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
    login(email: String!, password: String!): AuthPayload!
    resetPassword(email: String!, newPassword: String!): User
    changePassword(email: String!, oldPassword: String!, newPassword: String!): User!
    sendResetEmail(email: String!): MessageResponse!
  }
`;
