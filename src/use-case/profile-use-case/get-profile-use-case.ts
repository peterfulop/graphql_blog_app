import { ApolloContext } from '../../apollo';
import { QueryGetProfileArgs } from '../../types/graphql-generated/graphql';

export type GetProfileInput = {
  args: QueryGetProfileArgs;
  context: ApolloContext;
};

export const getProfileUseCase = async (input: GetProfileInput) => {
  const { id } = input.args;
  return await input.context.prisma.profile.findUnique({
    where: {
      id,
    },
  });
};
