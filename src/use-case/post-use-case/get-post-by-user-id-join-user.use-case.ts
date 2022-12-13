import { ApolloContext } from '../../apollo';
import {
  Post,
  ResolversParentTypes,
} from '../../types/graphql-generated/graphql';

export type getPostByUserIdJoinUserUseCaseInput = {
  parent: ResolversParentTypes['Post'];
  context: ApolloContext;
};

export const getPostByUserIdJoinUserUseCase = async (
  input: getPostByUserIdJoinUserUseCaseInput
): Promise<Post> => {
  const { parent } = input;
  const { prisma, user } = input.context;

  const isOwnProfile = parent.id === user?.userId;
  if (isOwnProfile) {
    return (await prisma.post.findMany({
      where: {
        userId: parent.id,
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    })) as unknown as Post;
  }

  return (await prisma.post.findMany({
    where: {
      userId: parent.id,
      published: true,
    },
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
  })) as unknown as Post;
};
