import { ApolloContext } from '../../apollo';
import { Post, QueryGetPostArgs } from '../../types/graphql-generated/graphql';

export type GetPostInput = {
  args: QueryGetPostArgs;
  context: ApolloContext;
};

export const getPostUseCase = async (input: GetPostInput): Promise<Post> => {
  const { prisma } = input.context;
  const { id } = input.args;
  return (await prisma.post.findUnique({
    where: {
      id,
    },
  })) as unknown as Post;
};
