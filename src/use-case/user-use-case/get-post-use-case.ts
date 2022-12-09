import { ApolloContext } from '../../apollo';
import { QueryGetUserArgs } from '../../types/graphql-generated/graphql';

export type GetUserInput = {
  args: QueryGetUserArgs;
  context: ApolloContext;
};

export const getUserUseCase = async (input: GetUserInput) => {
  const { id } = input.args;
  return await input.context.prisma.user.findUnique({
    where: {
      id,
    },
  });
};
