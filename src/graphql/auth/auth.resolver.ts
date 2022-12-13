import { ApolloContext } from '../../apollo';
import {
  AuthPayload,
  MutationSigninArgs,
  MutationSignupArgs,
} from '../../types/graphql-generated/graphql';
import { signinUseCase } from '../../use-case/auth-use-case/signin.use-case';
import { signupUseCase } from '../../use-case/auth-use-case/signup.use-case';

export const authGQLResolver = {
  Mutation: {
    signup: async (
      _parent: any,
      args: MutationSignupArgs,
      context: ApolloContext
    ): Promise<AuthPayload> => {
      return await signupUseCase({ args, context });
    },
    signin: async (
      _parent: any,
      args: MutationSigninArgs,
      context: ApolloContext
    ): Promise<AuthPayload> => {
      return await signinUseCase({ args, context });
    },
  },
};
