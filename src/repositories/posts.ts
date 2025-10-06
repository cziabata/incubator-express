import { CreatePostDto, Post, UpdatePostDto } from "../types/posts";

let posts: Post[] = [
  { id: "1", title: "Post 1", shortDescription: "Short description 1", content: "Content 1", blogId: "1" },
  { id: "2", title: "Post 2", shortDescription: "Short description 2", content: "Content 2", blogId: "2" },
  { id: "3", title: "Post 3", shortDescription: "Short description 3", content: "Content 3", blogId: "3" },
];

export const postsRepository = {
  getPosts(): Post[] {
    return posts;
  },

  getPostById(id: string): Post | null {
    return posts.find((post) => post.id === id) ?? null;
  },

  createPost(newPost: CreatePostDto): Post {
    const preparedNewPost: Post = { ...newPost, id: String(posts.length + 1) };
    posts.push(preparedNewPost);
    return preparedNewPost;
  },

  updatePost(id: string, post: UpdatePostDto): Post | null {
    const targetPost = posts.find((post) => post.id === id) ?? null;
    if (targetPost) {
      const updatedPost = { ...targetPost, ...post };
      posts = posts.map((post) => post.id === id ? updatedPost : post);
      return updatedPost;
    }
    return null;
  },

  deletePost(id: string): Post | null {
    const targetPost = posts.find((post) => post.id === id) ?? null;
    if (targetPost) {
      posts = posts.filter((post) => post.id !== id);
      return targetPost;
    }
    return null;
  },

  clearPosts(): void {
    posts = [];
  },
};


