import { ApolloContext } from '../../apollo';
import {
  Profile,
  QueryGetProfileArgs,
} from '../../types/graphql-generated/graphql';
import { getProfileUseCase } from '../../use-case/profile-use-case/get-profile-use-case';

export const profileGQLResolver = {
  Query: {
    getProfile: async (
      _source: any,
      args: QueryGetProfileArgs,
      context: ApolloContext
    ): Promise<Profile> => {
      return getProfileUseCase({ args, context }) as unknown as Profile;
    },
  },
};
