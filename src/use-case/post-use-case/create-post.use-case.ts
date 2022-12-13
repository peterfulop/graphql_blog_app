import { ApolloContext } from '../../apollo';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import {
  MutationPostCreateArgs,
  PostPayload,
} from '../../types/graphql-generated/graphql';

export type CreatePostInput = {
  args: MutationPostCreateArgs;
  context: ApolloContext;
};

export const createPostUseCase = async (
  input: CreatePostInput
): Promise<PostPayload> => {
  const { title, content, published } = input.args.input;
  const userId = input.context.user?.userId;
  const { prisma } = input.context;

  const postPayload: PostPayload = {
    userErrors: [],
    post: null,
  };

  if (!userId) {
    return {
      ...postPayload,
      userErrors: [{ message: DBErrorMessages.UNAUTHENTICATED }],
    };
  }

  const userExists = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!userExists) {
    return {
      ...postPayload,
      userErrors: [{ message: DBErrorMessages.UNAUTHENTICATED }],
    };
  }

  if (!title || !content) {
    return {
      ...postPayload,
      userErrors: [{ message: DBErrorMessages.MISSING_TITLE_AND_CONTENT }],
    };
  }

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        userId: userId,
        published: published || false,
      },
    });
    return {
      ...postPayload,
      post,
    } as unknown as PostPayload;
  } catch (error) {
    return {
      ...postPayload,
      userErrors: [{ message: DBErrorMessages.SERVER_ERROR }],
    };
  }
};
