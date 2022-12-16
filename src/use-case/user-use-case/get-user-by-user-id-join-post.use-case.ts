import { ApolloContext } from '../../apollo';
import { userLoader } from '../../service/loader/user-loader.service';
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
  return (await userLoader.load(parent.userId)) as unknown as User;
};
