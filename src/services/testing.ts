import { blogsRepository } from "../repositories/blogs";
import { postsRepository } from "../repositories/posts";
import { productsRepository } from "../repositories/products";

export const testingService = {
  clearDb(): void {
    productsRepository.clearProducts();
    blogsRepository.clearBlogs();
    postsRepository.clearPosts();
  },
};