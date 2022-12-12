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
];

const { Query: postQueries, Mutations: postMutations } = postGQLResolvers;
const { Query: profileQueries } = profileGQLResolver;
const { Query: userQueries, Mutation: userMutations } = userGQLResolver;

export const resolvers = {
  Query: {
    ...postQueries,
    ...profileQueries,
    ...userQueries,
  },
  Mutation: {
    ...postMutations,
    ...userMutations,
  },
};
