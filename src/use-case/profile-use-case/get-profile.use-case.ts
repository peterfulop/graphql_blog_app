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
): Promise<Profile | null> => {
  const { userId } = input.args;
  const { prisma, user } = input.context;

  const profile = await prisma.profile.findUnique({
    where: {
      userId,
    },
  });

  if (!profile) return null;

  const isMyProfile = userId === user?.userId;

  return {
    ...profile,
    isMyProfile,
  } as unknown as Profile;
};
