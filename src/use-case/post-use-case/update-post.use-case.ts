import { ApolloContext } from '../../apollo';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import {
  MutationPostUpdateArgs,
  PostPayload,
} from '../../types/graphql-generated/graphql';
import { reduceObjectNulls } from '../../utils/reduce-object';

export type UpdatePostInput = {
  args: MutationPostUpdateArgs;
  context: ApolloContext;
};

export const UpdatePostUseCase = async (
  input: UpdatePostInput
): Promise<PostPayload> => {
  const { title, content, published, postId } = input.args.input;
  const { prisma } = input.context;

  if (!title && !content) {
    return {
      userErrors: [{ message: DBErrorMessages.ONE_FIELD_TO_UPDATE }],
      post: null,
    };
  }

  const postToUpdate = await prisma.post.findUnique({ where: { id: postId } });
  if (!postToUpdate) {
    return {
      userErrors: [{ message: DBErrorMessages.MISSING_POST }],
      post: null,
    };
  }

  const reducedInputs = reduceObjectNulls({ title, content, published });

  try {
    const post = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        ...reducedInputs,
        updatedAt: new Date(Date.now()),
      },
    });
    return {
      userErrors: [],
      post,
    } as unknown as PostPayload;
  } catch (error) {
    return {
      userErrors: [{ message: DBErrorMessages.SERVER_ERROR }],
      post: null,
    };
  }
};
