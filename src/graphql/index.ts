import { authGQLResolver } from './auth/auth.resolver';
import { authTypeDefs } from './auth/auth.schema';
import { postGQLResolvers } from './post/post.resolver';
import { postTypeDefs } from './post/post.schema';
import { profileGQLResolver } from './profile/profile.resolver';
import { profileTypeDefs } from './profile/profile.schema';
import { userGQLResolver } from './user/user.resolver';
import { userTypeDefs } from './user/user.schema';

const BASE_TYPE_DEF = `#graphql
 type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }

  type UserError {
    message: String!
  }
`;

export const typeDefs = [
  BASE_TYPE_DEF,
  postTypeDefs,
  userTypeDefs,
  profileTypeDefs,
  authTypeDefs,
];

const { Query: postQueries, Mutations: postMutations, Post } = postGQLResolvers;
const { Query: profileQueries, Profile } = profileGQLResolver;
const { Query: userQueries, User } = userGQLResolver;
const { Mutation: authMutations } = authGQLResolver;

export const resolvers = {
  Query: {
    ...postQueries,
    ...profileQueries,
    ...userQueries,
  },
  Mutation: {
    ...postMutations,
    ...authMutations,
  },
  Profile,
  Post,
  User,
};
