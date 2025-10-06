import { blogsRepository } from "../repositories/blogs";
import { postsRepository } from "../repositories/posts";
import { CreatePostDto, Post, PostViewModel, UpdatePostDto } from "../types/posts";

export const postsService = {
  getPosts(): PostViewModel[] {
    const posts = postsRepository.getPosts();
    return posts.map((post) => this.mapPostToViewModel(post));
  },

  getPostById(id: string): PostViewModel | null {
    const post = postsRepository.getPostById(id);
    if (!post) {
      return null;
    }
    return this.mapPostToViewModel(post);
  },

  createPost(post: CreatePostDto): PostViewModel | null {
    const newPost = postsRepository.createPost(post);
    return this.mapPostToViewModel(newPost);
  },
  
  updatePost(id: string, post: UpdatePostDto): PostViewModel | null {
    const updatedPost = postsRepository.updatePost(id, post);
    if (!updatedPost) {
      return null;
    }
    return this.mapPostToViewModel(updatedPost);
  },

  deletePost(id: string): Post | null {
    return postsRepository.deletePost(id);
  },

  mapPostToViewModel(post: Post): PostViewModel {

    const blog = blogsRepository.getBlogById(post.blogId);

    return {
      id: post.id,
      title: post.title,
      shortDescription: post.shortDescription,
      content: post.content,
      blogId: post.blogId,
      blogName: blog?.name ?? "Unknown",
    };
  },

};