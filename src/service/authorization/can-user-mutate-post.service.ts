import { ApolloContext } from '../../apollo';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import { UserError } from '../../types/graphql-generated/graphql';

export type CanUserMutatePostServiceInput = {
  context: ApolloContext;
  postId: string;
};

export type AuthPayload = {
  access: boolean;
  userErrors: UserError[];
};

export const canUserMutatePostService = async (
  input: CanUserMutatePostServiceInput
): Promise<AuthPayload> => {
  const { postId } = input;
  const { prisma } = input.context;
  const userId = input.context.user?.userId;

  const authPayload: AuthPayload = {
    access: false,
    userErrors: [],
  };

  if (!userId) {
    return {
      ...authPayload,
      userErrors: [{ message: DBErrorMessages.USER_UNAUTHORIZED }],
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
