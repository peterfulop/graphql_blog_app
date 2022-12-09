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
}

export const createApolloServer = async () => {
  const server = new ApolloServer<ApolloContext>({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    context: async () => ({
      prisma,
    }),
  });

  return { url };
};
