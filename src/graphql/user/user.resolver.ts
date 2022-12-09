import { ApolloContext } from '../../apollo';
import {
  QueryGetProfileArgs,
  User,
} from '../../types/graphql-generated/graphql';
import { getUserUseCase } from '../../use-case/user-use-case/get-post-use-case';

export const userGQLResolver = {
  Query: {
    getUser: async (
      _source: any,
      args: QueryGetProfileArgs,
      context: ApolloContext
    ): Promise<User> => {
      return (await getUserUseCase({ args, context })) as unknown as User;
    },
  },
};
