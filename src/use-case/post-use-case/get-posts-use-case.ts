import { ApolloContext } from '../../apollo';
import { QueryGetPostArgs } from '../../types/graphql-generated/graphql';

export type GetPostsInput = {
  args: QueryGetPostArgs;
  context: ApolloContext;
};

export const getPostsUseCase = async (input: GetPostsInput) => {
  const { prisma } = input.context;
  return await prisma.post.findMany({
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
  });
};
