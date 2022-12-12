import { ApolloContext } from '../../apollo';
import { QueryGetUserArgs, User } from '../../types/graphql-generated/graphql';

export type GetUserInput = {
  args: QueryGetUserArgs;
  context: ApolloContext;
};

export const getUserUseCase = async (input: GetUserInput): Promise<User> => {
  const { id } = input.args;
  const { prisma } = input.context;

  return (await prisma.user.findUnique({
    where: {
      id,
    },
  })) as unknown as User;
};
