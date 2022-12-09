export const userTypeDefs = `#graphql
  extend type Query {
    getUser(id: ID!): User
  }

  type User {
    id: ID!
    name: String!
    email: String!
    profile: Profile
    posts: [Post!]!
  }
`;
