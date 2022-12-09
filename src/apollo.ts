import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import type Prisma from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import { resolvers, typeDefs } from './graphql';

const prisma = new PrismaClient();

export interface ApolloContext {
  prisma: Prisma.PrismaClient<
    Prisma.Prisma.PrismaClientOptions,
    never,
    | Prisma.Prisma.RejectOnNotFound
    | Prisma.Prisma.RejectPerOperation
    | undefined
  >;
  user: {
    userId: string;
  };
}

export const createApolloServer = async () => {
  const server = new ApolloServer<ApolloContext>({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    context: async () => ({
      prisma,
      user: {
        userId: 'a9c7545e-99ee-4b36-9f75-027a908cdf3e',
      },
    }),
  });

  return { url };
};
