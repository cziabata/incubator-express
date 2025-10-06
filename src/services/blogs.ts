import { blogsRepository } from "../repositories/blogs";
import { Blog, CreateBlogDto, UpdateBlogDto } from "../types/blogs";

export const blogsService = {
  getBlogs(): Blog[] {
    return blogsRepository.getBlogs();
  },

  getBlogById(id: string): Blog | null {
    return blogsRepository.getBlogById(id);
  },

  createBlog(blog: CreateBlogDto): Blog {
    return blogsRepository.createBlog(blog);
  },

  updateBlog(id: string, blog: UpdateBlogDto): Blog | null {
    return blogsRepository.updateBlog(id, blog);
  },

  deleteBlog(id: string): Blog | null {
    return blogsRepository.deleteBlog(id);
  },
  
};
