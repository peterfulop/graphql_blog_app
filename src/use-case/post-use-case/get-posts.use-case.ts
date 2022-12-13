import { ApolloContext } from '../../apollo';
import { Post, QueryGetPostArgs } from '../../types/graphql-generated/graphql';

export type GetPostsInput = {
  args: QueryGetPostArgs;
  context: ApolloContext;
};

export const getPostsUseCase = async (
  input: GetPostsInput
): Promise<Post[]> => {
  const { prisma } = input.context;
  return (await prisma.post.findMany({
    where: {
      published: true,
    },
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
  })) as unknown as Post[];
};
