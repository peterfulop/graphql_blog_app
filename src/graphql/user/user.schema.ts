export const userTypeDefs = `#graphql
  extend type Query {
    getUser(id: ID!): User
  }

  extend type Mutation {
    signup(input:SignupInput!):UserPayload!
  }

  input SignupInput {
    name: String!
    email: String!
    password: String!
    passwordConfirm: String!
    bio: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    profile: Profile
    posts: [Post!]!
  }

  type UserPayload {
    userErrors: [UserError!]!
    user: User
  }
`;
