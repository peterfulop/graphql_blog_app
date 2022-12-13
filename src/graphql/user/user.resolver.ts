import { ApolloContext } from '../../apollo';
import {
  Post,
  QueryGetUserArgs,
  ResolversParentTypes,
  User,
} from '../../types/graphql-generated/graphql';
import { getPostByUserIdJoinUserUseCase } from '../../use-case/post-use-case/get-post-by-user-id-join-user.use-case';
import { getUserUseCase } from '../../use-case/user-use-case/get-user.use-case';

export const userGQLResolver = {
  Query: {
    getUser: async (
      _parent: any,
      args: QueryGetUserArgs,
      context: ApolloContext
    ): Promise<User> => {
      return await getUserUseCase({ args, context });
    },
  },
  User: {
    posts: async (
      parent: ResolversParentTypes['Post'],
      _args: any,
      context: ApolloContext
    ): Promise<Post> => {
      return await getPostByUserIdJoinUserUseCase({ parent, context });
    },
  },
};
