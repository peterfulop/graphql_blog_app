import { ApolloContext } from '../../apollo';
import {
  ResolversParentTypes,
  User,
} from '../../types/graphql-generated/graphql';

export type getUserByUserIdJoinPostUseCaseInput = {
  parent: ResolversParentTypes['Post'];
  context: ApolloContext;
};

export const getUserByUserIdJoinPostUseCase = async (
  input: getUserByUserIdJoinPostUseCaseInput
): Promise<User> => {
  const { parent } = input;
  const { prisma } = input.context;
  const user = await prisma.user.findUnique({
    where: {
      id: parent.userId,
    },
  });
  return user as unknown as User;
};
