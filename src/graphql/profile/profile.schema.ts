export const profileTypeDefs = `#graphql
  extend type Query {
    getProfile(id: ID!): Profile
  }

  type Profile {
    id: ID!
    bio: String!
    user: User!
  }
`;
