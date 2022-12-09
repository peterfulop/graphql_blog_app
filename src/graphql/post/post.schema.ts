export const postTypeDefs = `#graphql
  extend type Query {
    getPost(id: ID!): Post
  }

  extend type Mutation {
    postCreate(input: PostCreateInput!): PostPayload!
  }

  input PostCreateInput {
    title: String!
    content: String!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    createdAt: String!
    publisched: Boolean!
    user: User!
  }

  type PostPayload {
    userErrors: [UserError!]!
    post: Post
  }
`;
