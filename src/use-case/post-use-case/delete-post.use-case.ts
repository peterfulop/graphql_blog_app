import { ApolloContext } from '../../apollo';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import { canUserMutatePostService } from '../../service/authorization/can-user-mutate-post.service';
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

  const postPayload: PostPayload = {
    userErrors: [],
    post: null,
  };

  const postToDelete = await prisma.post.findUnique({ where: { id } });
  if (!postToDelete) {
    return {
      ...postPayload,
      userErrors: [{ message: DBErrorMessages.MISSING_POST }],
    };
  }

  const validate = await canUserMutatePostService({
    context: input.context,
    postId: postToDelete.id,
  });

  if (!validate.access) {
    return {
      ...postPayload,
      userErrors: validate.userErrors,
    };
  }

  try {
    await prisma.post.delete({ where: { id } });
  } catch (error) {
    return {
      ...postPayload,
      userErrors: [{ message: DBErrorMessages.SERVER_ERROR }],
    };
  }
  return {
    ...postPayload,
    post: postToDelete,
  } as unknown as PostPayload;
};
