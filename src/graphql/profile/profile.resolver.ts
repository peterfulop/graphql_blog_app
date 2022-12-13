import { ApolloContext } from '../../apollo';
import {
  Profile,
  QueryGetProfileArgs,
  ResolversParentTypes,
  User,
} from '../../types/graphql-generated/graphql';
import { getProfileUseCase } from '../../use-case/profile-use-case/get-profile.use-case';
import { getUserByUserIdJoinProfileUseCase } from '../../use-case/user-use-case/get-user-by-user-id-join-profile.use-case';

export const profileGQLResolver = {
  Query: {
    getProfile: async (
      _parent: any,
      args: QueryGetProfileArgs,
      context: ApolloContext
    ): Promise<Profile> => {
      return await getProfileUseCase({ args, context });
    },
  },
  Profile: {
    user: async (
      parent: ResolversParentTypes['Profile'],
      _args: any,
      context: ApolloContext
    ): Promise<User> => {
      return await getUserByUserIdJoinProfileUseCase({ parent, context });
    },
  },
};
