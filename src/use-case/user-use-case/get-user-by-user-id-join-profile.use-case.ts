import { ApolloContext } from '../../apollo';
import {
  ResolversParentTypes,
  User,
} from '../../types/graphql-generated/graphql';

export type getUserByUserIdJoinProfileUseCaseInput = {
  parent: ResolversParentTypes['Profile'];
  context: ApolloContext;
};

export const getUserByUserIdJoinProfileUseCase = async (
  input: getUserByUserIdJoinProfileUseCaseInput
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
