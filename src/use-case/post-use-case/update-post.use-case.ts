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

  const postPayload: PostPayload = {
    userErrors: [],
    post: null,
  };

  if (!title && !content) {
    return {
      ...postPayload,
      userErrors: [{ message: DBErrorMessages.ONE_FIELD_TO_UPDATE }],
    };
  }

  const postToUpdate = await prisma.post.findUnique({ where: { id: postId } });
  if (!postToUpdate) {
    return {
      ...postPayload,
      userErrors: [{ message: DBErrorMessages.MISSING_POST }],
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
      ...postPayload,
      ...post,
    };
  } catch (error) {
    return {
      userErrors: [{ message: DBErrorMessages.SERVER_ERROR }],
      post: null,
    };
  }
};
