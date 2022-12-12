import { ApolloContext } from '../../apollo';
import {
  MutationSignupArgs,
  QueryGetProfileArgs,
  User,
  UserPayload,
} from '../../types/graphql-generated/graphql';
import { getUserUseCase } from '../../use-case/user-use-case/get-post.use-case';
import { SignupUseCase } from '../../use-case/user-use-case/signup-user.use-case';

export const userGQLResolver = {
  Query: {
    getUser: async (
      _source: any,
      args: QueryGetProfileArgs,
      context: ApolloContext
    ): Promise<User> => {
      return await getUserUseCase({ args, context });
    },
  },
  Mutation: {
    signup: async (
      _source: any,
      args: MutationSignupArgs,
      context: ApolloContext
    ): Promise<UserPayload> => {
      return await SignupUseCase({ args, context });
    },
  },
};
