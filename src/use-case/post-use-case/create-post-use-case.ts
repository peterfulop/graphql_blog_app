import { ApolloContext } from '../../apollo';
import { MutationPostCreateArgs } from '../../types/graphql-generated/graphql';

export type CreatePostInput = {
  args: MutationPostCreateArgs;
  context: ApolloContext;
};

export const createPostUseCase = async (input: CreatePostInput) => {
  const { title, content } = input.args.input;
  if (!title || !content) {
    return {
      userErrors: [
        {
          message: 'You must provide a title and a content to create a post!',
        },
      ],
      post: null,
    };
  }
  const post = await input.context.prisma.post.create({
    data: {
      title,
      content,
      userId: 'a9c7545e-99ee-4b36-9f75-027a908cdf3e',
    },
  });

  return {
    userErrors: [],
    post,
  };
};
