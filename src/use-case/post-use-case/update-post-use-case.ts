import { ApolloContext } from '../../apollo';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import { MutationPostUpdateArgs } from '../../types/graphql-generated/graphql';
import { reduceObjectNulls } from '../../utils/reduce-object';

export type UpdatePostInput = {
  args: MutationPostUpdateArgs;
  context: ApolloContext;
};

export const UpdatePostUseCase = async (input: UpdatePostInput) => {
  const { title, content, postId } = input.args.input;
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

  const reducedInputs = reduceObjectNulls({ title, content });
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
  };
};
