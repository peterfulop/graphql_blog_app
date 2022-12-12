import bcrypt from 'bcrypt';
import { validate } from 'email-validator';
import { v4 } from 'uuid';
import { ApolloContext } from '../../apollo';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import {
  AuthPayload,
  MutationSignupArgs,
} from '../../types/graphql-generated/graphql';
import { JWTSign } from '../../utils/jwt-sign';

export type SignupInput = {
  args: MutationSignupArgs;
  context: ApolloContext;
};

export const signupUseCase = async (
  input: SignupInput
): Promise<AuthPayload> => {
  const { name, credentials, passwordConfirm, bio } = input.args.input;
  const { email, password } = credentials;
  const { prisma } = input.context;

  const authPayload: AuthPayload = {
    token: null,
    userErrors: [],
  };

  if (!name || !email || !password || !bio) {
    return {
      ...authPayload,
      userErrors: [{ message: DBErrorMessages.MISSING_SIGNUP_DATA }],
    };
  }

  if (password.length < 6) {
    return {
      ...authPayload,
      userErrors: [{ message: DBErrorMessages.SHORT_PASSWORD }],
    };
  }
  if (password !== passwordConfirm) {
    return {
      ...authPayload,
      userErrors: [{ message: DBErrorMessages.PASSWORDS_DO_NOT_MATCH }],
    };
  }

  if (!validate(email)) {
    return {
      ...authPayload,
      userErrors: [{ message: DBErrorMessages.INVALID_EMAIL_ADDRESS }],
    };
  }

  const isEmailInUse = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (isEmailInUse) {
    return {
      ...authPayload,
      userErrors: [{ message: DBErrorMessages.EMAIL_ADDRESS_ALREADY_IN_USE }],
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        id: v4(),
        name,
        email,
        password: hashedPassword,
      },
    });
    await prisma.profile.create({
      data: {
        bio,
        userId: user.id,
      },
    });

    const token = JWTSign({ userId: user.id, email });

    return {
      ...authPayload,
      token,
    };
  } catch (error: any) {
    return {
      ...authPayload,
      userErrors: [{ message: DBErrorMessages.SERVER_ERROR }],
    };
  }
};
