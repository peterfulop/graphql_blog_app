import { ApolloContext } from '../../apollo';
import {
  MutationPostCreateArgs,
  MutationPostDeleteArgs,
  MutationPostUpdateArgs,
  Post,
  PostPayload,
  QueryGetPostArgs,
} from '../../types/graphql-generated/graphql';
import { createPostUseCase } from '../../use-case/post-use-case/create-post-use-case';
import { DeletePostUseCase } from '../../use-case/post-use-case/delete-post-use-case';
import { getPostUseCase } from '../../use-case/post-use-case/get-post-use-case';
import { getPostsUseCase } from '../../use-case/post-use-case/get-posts-use-case';
import { UpdatePostUseCase } from '../../use-case/post-use-case/update-post-use-case';

export const postGQLResolvers = {
  Query: {
    getPost: async (
      _source: any,
      args: QueryGetPostArgs,
      context: ApolloContext
    ): Promise<Post> => {
      return (await getPostUseCase({
        args,
        context,
      })) as unknown as Post;
    },
    posts: async (
      _source: any,
      args: QueryGetPostArgs,
      context: ApolloContext
    ): Promise<Post[]> => {
      return (await getPostsUseCase({
        args,
        context,
      })) as unknown as Post[];
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
    postUpdate: async (
      __: any,
      args: MutationPostUpdateArgs,
      context: ApolloContext
    ): Promise<PostPayload> => {
      return (await UpdatePostUseCase({
        args,
        context,
      })) as unknown as PostPayload;
    },
    postDelete: async (
      __: any,
      args: MutationPostDeleteArgs,
      context: ApolloContext
    ): Promise<PostPayload> => {
      return (await DeletePostUseCase({
        args,
        context,
      })) as unknown as PostPayload;
    },
  },
};
