import bcrypt from 'bcrypt';
import { validate } from 'email-validator';
import { v4 } from 'uuid';
import { ApolloContext } from '../../apollo';
import { config } from '../../config/config';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import {
  MutationSignupArgs,
  User,
  UserPayload,
} from '../../types/graphql-generated/graphql';

export type SignupInput = {
  args: MutationSignupArgs;
  context: ApolloContext;
};

export const SignupUseCase = async (
  input: SignupInput
): Promise<UserPayload> => {
  const { name, email, password, passwordConfirm, bio } = input.args.input;
  const { prisma } = input.context;

  if (!name || !email || !password || !bio) {
    return {
      userErrors: [
        {
          message: DBErrorMessages.MISSING_SIGNUP_DATA,
        },
      ],
      user: null,
    };
  }

  if (password.length < 6) {
    return {
      userErrors: [
        {
          message: DBErrorMessages.SHORT_PASSWORD,
        },
      ],
      user: null,
    };
  }

  if (password !== passwordConfirm) {
    return {
      userErrors: [
        {
          message: DBErrorMessages.PASSWORDS_DO_NOT_MATCH,
        },
      ],
      user: null,
    };
  }

  if (!validate(email)) {
    return {
      userErrors: [
        {
          message: DBErrorMessages.INVALID_EMAIL_ADDRESS,
        },
      ],
      user: null,
    };
  }

  const isEmailInUse = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (isEmailInUse) {
    return {
      userErrors: [
        {
          message: DBErrorMessages.EMAIL_ADDRESS_ALREADY_IN_USE,
        },
      ],
      user: null,
    };
  }

  const hashedPassword = await bcrypt.hash(password, config.bcryptSalt);

  try {
    const user = (await prisma.user.create({
      data: {
        id: v4(),
        name,
        email,
        password: hashedPassword,
      },
    })) as unknown as User;

    return {
      userErrors: [],
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        posts: [],
        profile: null,
      },
    };
  } catch (error: any) {
    return {
      userErrors: [
        {
          message: DBErrorMessages.SERVER_ERROR,
        },
        {
          message: error.message,
        },
      ],
      user: null,
    };
  }
};
