import { ApolloContext } from '../../apollo';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import {
  MutationPostDeleteArgs,
  PostPayload,
} from '../../types/graphql-generated/graphql';

export type DeletePostInput = {
  args: MutationPostDeleteArgs;
  context: ApolloContext;
};

export const DeletePostUseCase = async (
  input: DeletePostInput
): Promise<PostPayload> => {
  const { id } = input.args;
  const { prisma } = input.context;

  const postToDelete = await prisma.post.findUnique({ where: { id } });
  if (!postToDelete) {
    return {
      userErrors: [{ message: DBErrorMessages.MISSING_POST }],
      post: null,
    };
  }

  try {
    await prisma.post.delete({ where: { id } });
  } catch (error) {
    return {
      userErrors: [{ message: DBErrorMessages.SERVER_ERROR }],
      post: null,
    };
  }

  return {
    userErrors: [],
    post: postToDelete,
  } as unknown as PostPayload;
};
