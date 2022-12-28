export const profileTypeDefs = `#graphql
  extend type Query {
    getProfile(userId: ID!): Profile
  }

  type Profile {
    id: ID!
    bio: String!
    userId: String!
    user: User!
    isMyProfile: Boolean!
  }
`;
