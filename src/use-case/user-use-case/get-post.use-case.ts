import { ApolloContext } from '../../apollo';
import { QueryGetUserArgs, User } from '../../types/graphql-generated/graphql';

export type GetUserInput = {
  args: QueryGetUserArgs;
  context: ApolloContext;
};

export const getUserUseCase = async (input: GetUserInput): Promise<User> => {
  const { id } = input.args;
  return (await input.context.prisma.user.findUnique({
    where: {
      id,
    },
  })) as unknown as User;
};
