import { ApolloContext } from '../../apollo';
import {
  AuthPayload,
  MutationSignupArgs,
} from '../../types/graphql-generated/graphql';
import { SignupUseCase } from '../../use-case/auth-use-case/signup.use-case';

export const authGQLResolver = {
  Mutation: {
    signup: async (
      _source: any,
      args: MutationSignupArgs,
      context: ApolloContext
    ): Promise<AuthPayload> => {
      return await SignupUseCase({ args, context });
    },
  },
};
