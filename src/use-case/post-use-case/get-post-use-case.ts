import { ApolloContext } from '../../apollo';
import { QueryGetPostArgs } from '../../types/graphql-generated/graphql';

export type GetPostInput = {
  args: QueryGetPostArgs;
  context: ApolloContext;
};

export const getPostUseCase = async (input: GetPostInput) => {
  const { id } = input.args;
  return await input.context.prisma.post.findUnique({
    where: {
      id,
    },
  });
};
