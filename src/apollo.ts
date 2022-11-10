import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServer } from 'apollo-server-express';
import { GraphQLSchema } from 'graphql';
import { typeDefs } from './graphql';

export interface ApolloInstance {
  server: ApolloServer;
  schema: GraphQLSchema;
}

export type UserToken = {
  name: string;
  email: string;
};

export type ApolloContext = {
  user: UserToken | null;
};

const schema = makeExecutableSchema({
  typeDefs: [...typeDefs],
  resolvers: [],
});

export const createApolloServer = (): ApolloInstance => {
  return {
    server: new ApolloServer({
      context: async (): Promise<ApolloContext> => {
        const user = {
          name: 'test-user',
          email: 'test-user@email.com',
        };
        return {
          user,
        };
      },
      schema,
      dataSources: () => {
        return {};
      },
    }),
    schema,
  };
};
