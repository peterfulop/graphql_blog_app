import { ApolloContext } from '../../apollo';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import { MutationPostCreateArgs } from '../../types/graphql-generated/graphql';

export type CreatePostInput = {
  args: MutationPostCreateArgs;
  context: ApolloContext;
};

export const createPostUseCase = async (input: CreatePostInput) => {
  const { title, content, published } = input.args.input;
  const { userId } = input.context.user;
  const { prisma } = input.context;

  if (!title || !content) {
    return {
      userErrors: [
        {
          message: DBErrorMessages.MISSING_TITLE_AND_CONTENT,
        },
      ],
      post: null,
    };
  }

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        userId,
        published: published || false,
      },
    });
    return {
      userErrors: [],
      post,
    };
  } catch (error) {
    return {
      userErrors: [
        {
          message: DBErrorMessages.SERVER_ERROR,
        },
      ],
      post: null,
    };
  }
};
