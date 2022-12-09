export const postTypeDefs = `#graphql
  extend type Query {
    getPost(id: ID!): Post
    posts: [Post!]!
  }

  extend type Mutation {
    postCreate(input: PostCreateInput!): PostPayload!
    postUpdate(input: PostUpdateInput!): PostPayload!
  }

  input PostCreateInput {
    title: String!
    content: String!
  }

  input PostUpdateInput {
    postId: ID!
    title: String
    content: String
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    createdAt: String!
    updatedAt: String!
    publisched: Boolean!
    user: User!
  }

  type PostPayload {
    userErrors: [UserError!]!
    post: Post
  }
`;
