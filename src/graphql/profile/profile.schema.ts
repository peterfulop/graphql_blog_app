import { gql } from 'apollo-server-express';

export const profileTypeDefs = gql`
  extend type Query {
    getProfile(id: ID!): Profile
  }

  type Profile {
    id: ID!
  }
`;
