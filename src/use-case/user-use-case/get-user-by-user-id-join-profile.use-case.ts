import { ApolloContext } from '../../apollo';
import { userLoader } from '../../service/loader/user-loader.service';
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
  return (await userLoader.load(parent.userId)) as unknown as User;
};
