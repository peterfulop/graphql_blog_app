import { gql } from 'apollo-server-express';
import { postTypeDefs } from './post/post.schema';
import { profileTypeDefs } from './profile/profile.schema';
import { userTypeDefs } from './user/user.schema';

const BASE_TYPE_DEF = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export const typeDefs = [
  BASE_TYPE_DEF,
  postTypeDefs,
  profileTypeDefs,
  userTypeDefs,
];
