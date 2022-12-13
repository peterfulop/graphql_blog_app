import { ApolloContext } from '../../apollo';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import { UserError } from '../../types/graphql-generated/graphql';

export type CanUserMutatePostServiceInput = {
  userId?: string;
  postId: string;
  prisma: ApolloContext['prisma'];
};

export type AuthPayload = {
  access: boolean;
  userErrors: UserError[];
};

export const canUserMutatePostService = async (
  input: CanUserMutatePostServiceInput
): Promise<AuthPayload> => {
  const { userId, postId } = input;
  const { prisma } = input;

  const authPayload: AuthPayload = {
    access: false,
    userErrors: [],
  };

  if (!userId) {
    return {
      ...authPayload,
      userErrors: [{ message: DBErrorMessages.AUTHORIZATION_FAILED }],
    };
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return {
      ...authPayload,
      userErrors: [{ message: DBErrorMessages.USER_UNAUTHORIZED }],
    };
  }

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (post?.userId !== userId) {
    return {
      ...authPayload,
      userErrors: [{ message: DBErrorMessages.USER_UNAUTHORIZED }],
    };
  }

  return {
    ...authPayload,
    access: true,
  };
};
