export const authTypeDefs = `#graphql
 extend type Mutation {
    signup(input:SignupInput!):AuthPayload!
    signin(input:CredentialsInput!):AuthPayload!
  }

  input SignupInput {
    name: String!
    credentials:CredentialsInput!
    passwordConfirm: String!
    bio: String!
  }

  input CredentialsInput {
    email: String!
    password: String!
  }

  type AuthPayload {
    userErrors: [UserError!]!
    token: String
  }
`;
