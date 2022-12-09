import { ApolloContext } from '../../apollo';
import {
  Profile,
  QueryGetProfileArgs,
} from '../../types/graphql-generated/graphql';
import { getProfileUseCase } from '../../use-case/profile-use-case/get-profile-use-case';

export const profileGQLResolver = {
  Query: {
    getProfile: async (
      args: QueryGetProfileArgs,
      context: ApolloContext
    ): Promise<Profile> => {
      return await getProfileUseCase({ args, context });
    },
  },
};
