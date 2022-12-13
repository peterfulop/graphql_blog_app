import { ApolloContext } from '../../apollo';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import { canUserMutatePostService } from '../../service/authorization/can-user-mutate-post.service';
import {
  MutationPostPublishArgs,
  PostPayload,
} from '../../types/graphql-generated/graphql';

export type PublishPostInput = {
  args: MutationPostPublishArgs;
  context: ApolloContext;
};

export const publishPostUseCase = async (
  input: PublishPostInput
): Promise<PostPayload> => {
  const { published, postId } = input.args.input;
  const { prisma, user } = input.context;

  const postPayload: PostPayload = {
    userErrors: [],
    post: null,
  };

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

  try {
    const post = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        published: published || false,
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
