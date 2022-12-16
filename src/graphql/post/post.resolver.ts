import { ApolloContext } from '../../apollo';
import {
  MutationPostCreateArgs,
  MutationPostDeleteArgs,
  MutationPostPublishArgs,
  MutationPostUpdateArgs,
  Post,
  PostPayload,
  QueryGetPostArgs,
  ResolversParentTypes,
  User,
} from '../../types/graphql-generated/graphql';
import { createPostUseCase } from '../../use-case/post-use-case/create-post.use-case';
import { deletePostUseCase } from '../../use-case/post-use-case/delete-post.use-case';
import { getPostUseCase } from '../../use-case/post-use-case/get-post.use-case';
import { getPostsUseCase } from '../../use-case/post-use-case/get-posts.use-case';
import { publishPostUseCase } from '../../use-case/post-use-case/publish-post.use-case';
import { updatePostUseCase } from '../../use-case/post-use-case/update-post.use-case';
import { getUserByUserIdJoinPostUseCase } from '../../use-case/user-use-case/get-user-by-user-id-join-post.use-case';

export const postGQLResolvers = {
  Query: {
    getPost: async (
      _parent: any,
      args: QueryGetPostArgs,
      context: ApolloContext
    ): Promise<Post> => {
      return await getPostUseCase({ args, context });
    },
    posts: async (
      _parent: any,
      args: QueryGetPostArgs,
      context: ApolloContext
    ): Promise<Post[]> => {
      return await getPostsUseCase({ args, context });
    },
  },
  Mutations: {
    postCreate: async (
      _parent: any,
      args: MutationPostCreateArgs,
      context: ApolloContext
    ): Promise<PostPayload> => {
      return await createPostUseCase({ args, context });
    },
    postUpdate: async (
      _parent: any,
      args: MutationPostUpdateArgs,
      context: ApolloContext
    ): Promise<PostPayload> => {
      return await updatePostUseCase({ args, context });
    },
    postDelete: async (
      _parent: any,
      args: MutationPostDeleteArgs,
      context: ApolloContext
    ): Promise<PostPayload> => {
      return await deletePostUseCase({ args, context });
    },
    postPublish: async (
      _parent: any,
      args: MutationPostPublishArgs,
      context: ApolloContext
    ): Promise<PostPayload> => {
      return await publishPostUseCase({ args, context });
    },
  },
  Post: {
    user: async (
      parent: ResolversParentTypes['Post'],
      _args: any,
      context: ApolloContext
    ): Promise<User> => {
      return await getUserByUserIdJoinPostUseCase({ parent, context });
    },
  },
};
