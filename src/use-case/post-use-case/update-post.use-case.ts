import { ApolloContext } from '../../apollo';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import { canUserMutatePostService } from '../../service/authorization/can-user-mutate-post.service';
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
  const { prisma, user } = input.context;

  const postPayload: PostPayload = {
    userErrors: [],
    post: null,
  };

  if (!title || !content) {
    return {
      ...postPayload,
      userErrors: [{ message: DBErrorMessages.ONE_FIELD_TO_UPDATE }],
    };
  }

  const postToUpdate = await prisma.post.findUnique({ where: { id: postId } });
  if (!postId || !postToUpdate) {
    return {
      ...postPayload,
      userErrors: [{ message: DBErrorMessages.MISSING_POST }],
    };
  }

  const validate = await canUserMutatePostService({
    prisma,
    userId: user?.userId,
    postId: postToUpdate.id,
  });

  if (!validate.access) {
    return {
      ...postPayload,
      userErrors: validate.userErrors,
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
      post,
    } as unknown as PostPayload;
  } catch (error) {
    return {
      userErrors: [{ message: DBErrorMessages.SERVER_ERROR }],
      post: null,
    };
  }
};
