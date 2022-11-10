import { gql } from 'apollo-server-express';

export const postTypeDefs = gql`
  type Query {
    getPost(id: ID!): Post
  }

  type Post {
    id: ID!
    title: String
    content: String
    publish: Boolean
    date: String
  }
`;
