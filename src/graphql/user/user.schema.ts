import { gql } from 'apollo-server-express';

export const userTypeDefs = gql`
  extend type Query {
    getUser(id: ID!): User
  }

  type User {
    id: ID!
    email: String!
    name: String!
    password: String!
    date: String
  }
`;
