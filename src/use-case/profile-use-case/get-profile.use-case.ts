import { ApolloContext } from '../../apollo';
import {
  Profile,
  QueryGetProfileArgs,
} from '../../types/graphql-generated/graphql';

export type GetProfileInput = {
  args: QueryGetProfileArgs;
  context: ApolloContext;
};

export const getProfileUseCase = async (
  input: GetProfileInput
): Promise<Profile> => {
  const { id } = input.args;
  const { prisma } = input.context;

  return (await prisma.profile.findUnique({
    where: {
      id,
    },
  })) as unknown as Profile;
};
