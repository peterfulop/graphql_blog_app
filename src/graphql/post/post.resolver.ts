import { ApolloContext } from '../../apollo';
import {
  MutationPostCreateArgs,
  Post,
  PostPayload,
  QueryGetPostArgs,
} from '../../types/graphql-generated/graphql';
import { createPostUseCase } from '../../use-case/post-use-case/create-post-use-case';
import { getPostUseCase } from '../../use-case/post-use-case/get-post-use-case';

export const postGQLResolvers = {
  Query: {
    getPost: async (
      _source: any,
      args: QueryGetPostArgs,
      context: ApolloContext
    ): Promise<Post> => {
      return (await getPostUseCase({ args, context })) as unknown as Post;
    },
  },
  Mutations: {
    postCreate: async (
      __: any,
      args: MutationPostCreateArgs,
      context: ApolloContext
    ): Promise<PostPayload> => {
      return (await createPostUseCase({
        args,
        context,
      })) as unknown as PostPayload;
    },
  },
};
